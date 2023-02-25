import { Droppable } from "react-beautiful-dnd"
import styled from "styled-components";
import DraggableCard from "./DraggableCard"

const Wrapper = styled.div`
    padding: 20px 10px;
    border-radius: 5px;
    background-color: ${(props) => props.theme.boardColor};
    min-height: 200px;
`;

interface IBoardProps {
    toDos: string[],
    boardId: string,
}

const Board = ({ toDos, boardId }: IBoardProps) => {
    return (
        <Droppable droppableId={boardId}>
            {(provided) =>
                <Wrapper ref={provided.innerRef} {...provided.droppableProps}>
                    {toDos.map((toDo, i) =>
                        <DraggableCard key={toDo} toDo={toDo} i={i} />
                    )}
                    {provided.placeholder}
                </Wrapper>
            }
        </Droppable>
    )
}

export default Board;