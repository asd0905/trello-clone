import React from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { toDoState } from './atoms';
import DraggableCard from './components/DraggableCard';

const Wrapper = styled.div`
    display: flex;
    max-width: 480px;
    width: 100%;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const Boards = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: repeat(1, 1fr);
    // grid-template-columns: repeat(3, 1fr);
`;

const Board = styled.div`
    padding: 20px 10px;
    border-radius: 5px;
    background-color: ${(props) => props.theme.boardColor};
    min-height: 200px;
`;

function App() {
    const [toDos, setToDos] = useRecoilState(toDoState);
    const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
        if (!destination) return;
        setToDos(oldToDos => {
            const toDosCopy = [...oldToDos];
            // 1) Delete item on source.index;
            toDosCopy.splice(source.index, 1);
            // 2) Put back the item on the destination.index
            toDosCopy.splice(destination?.index, 0, draggableId)
            return toDosCopy;

            // return [
            //     ...newList.slice(0, destination?.index),
            //     draggableId,
            //     ...newList.slice(destination?.index),
            // ];
        })
    }
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Wrapper>
                <Boards>
                    <Droppable droppableId="one">
                        {(provided) =>
                            <Board ref={provided.innerRef} {...provided.droppableProps}>
                                {toDos.map((toDo, i) =>
                                    <DraggableCard key={toDo} toDo={toDo} i={i} />
                                )}
                                {provided.placeholder}
                            </Board>
                        }
                    </Droppable>
                </Boards>
            </Wrapper>
        </ DragDropContext>
    );
}

export default App;
