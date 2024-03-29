import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { toDoState } from './atoms';
import Board from './components/Board';

const Wrapper = styled.div`
    display: flex;
    max-width: 680px;
    width: 100%;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const Boards = styled.div`
    display: grid;
    width: 100%;
    gap: 10px;
    grid-template-columns: repeat(3, 1fr);
    // grid-template-columns: repeat(1, 1fr);
`;

function App() {
    const [toDos, setToDos] = useRecoilState(toDoState);
    const onDragEnd = (info: DropResult) => {
        const { destination, source, draggableId } = info;
        if (!destination) return;
        if (destination?.droppableId === source.droppableId) {
            // same board movement
            setToDos(allBoards => {
                const boardCopy = [...allBoards[source.droppableId]];
                const taskObj = boardCopy[source.index];
                console.log(boardCopy);
                boardCopy.splice(source.index, 1);
                boardCopy.splice(destination.index, 0, taskObj);
                return {
                    ...allBoards,
                    [source.droppableId]: boardCopy,
                };
            })
        }
        if (destination.droppableId !== source.droppableId) {
            // cross board movement
            setToDos(allBoards => {
                const sourceBoard = [...allBoards[source.droppableId]];
                const taskObj = sourceBoard[source.index];
                const destinationBoard = [...allBoards[destination.droppableId]];
                sourceBoard.splice(source.index, 1);
                destinationBoard.splice(destination.index, 0, taskObj);
                return {
                    ...allBoards,
                    [source.droppableId]: sourceBoard,
                    [destination.droppableId]: destinationBoard,
                };
            })
        }

        // short version
        /* setToDos(oldTodos => {
            const copyTodo = JSON.parse(JSON.stringify(oldTodos));
            copyTodo[source.droppableId].splice(source.index, 1);
            copyTodo[destination.droppableId].splice(destination.index, 0, draggableId);
            return copyTodo;
        }) */
    }
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Wrapper>
                <Boards>
                    {Object.keys(toDos).map(boardId => (
                        <Board
                            key={boardId}
                            boardId={boardId}
                            toDos={toDos[boardId]}
                        />
                    ))}
                </Boards>
            </Wrapper>
        </ DragDropContext>
    );
}

export default App;
