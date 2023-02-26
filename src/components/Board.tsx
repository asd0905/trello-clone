import { Droppable } from "react-beautiful-dnd"
import styled from "styled-components";
import DraggableCard from "./DraggableCard"

const Wrapper = styled.div`
    padding: 20px 10px;
    border-radius: 5px;
    background-color: ${(props) => props.theme.boardColor};
    min-height: 200px;
    display: flex;
    flex-direction: column;
`;

const Title = styled.h1`
    text-align: center;
    font-weight: 600;
    margin-bottom: 10px;
    font-size: 18px;
`;

const Area = styled.div<IAreaProps>`
    background-color: ${props => props.isDraggingOver ? 'pink' : props.isDraggingFromThisWith ? 'red' : 'blue'};
    flex-grow: 1;
    transition: background-color .3s ease-in-out;
`;

interface IAreaProps {
    isDraggingFromThisWith: boolean;
    isDraggingOver: boolean;
}

interface IBoardProps {
    toDos: string[],
    boardId: string,
}

const Board = ({ toDos, boardId }: IBoardProps) => {
    return (
        <Wrapper>
            <Title>{boardId}</Title>
            <Droppable droppableId={boardId}>
                {(provided, snapshot) =>
                    <Area
                        isDraggingOver={snapshot.isDraggingOver}
                        isDraggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {toDos.map((toDo, i) =>
                            <DraggableCard key={toDo} toDo={toDo} i={i} />
                        )}
                        {provided.placeholder}
                    </Area>
                }
            </Droppable>
        </Wrapper>
    )
}

export default Board;