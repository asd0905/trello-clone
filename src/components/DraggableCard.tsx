import React from "react";
import { Draggable } from "react-beautiful-dnd"
import styled from "styled-components";
import { ITodo } from "../atoms";

const Card = styled.div<{ isDragging: boolean }>`
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 5px;
    background-color: ${(props) =>
        props.isDragging ? '#74b9ff' : props.theme.cardColor};
    box-shadow: ${props =>
        props.isDragging ? '0 2px 5px rgba(0, 0, 0, .2)' : 'non'}
`;

interface IDraggableCardProps {
    toDoId: number;
    toDoText: string;
    i: number;
}

const DraggableCard = ({ toDoText, toDoId, i }: IDraggableCardProps) => {
    // console.log(`${toDo} has been rendered`);
    return <Draggable draggableId={toDoId + ''} index={i}>
        {(provided, snapshot) =>
            <Card
                isDragging={snapshot.isDragging}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
            >
                {toDoText}
            </Card>
        }
    </Draggable>
}

export default React.memo(DraggableCard);