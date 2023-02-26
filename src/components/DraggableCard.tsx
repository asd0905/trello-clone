import React from "react";
import { Draggable } from "react-beautiful-dnd"
import styled from "styled-components";

const Card = styled.div`
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 5px;
    background-color: ${(props) => props.theme.cardColor};
`;

interface IDraggableCardProps {
    toDo: string;
    i: number;
}

const DraggableCard = ({ toDo, i }: IDraggableCardProps) => {
    // console.log(`${toDo} has been rendered`);
    return <Draggable key={toDo} draggableId={toDo} index={i}>
        {(provided) =>
            <Card
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
            >
                {toDo}
            </Card>
        }
    </Draggable>
}

export default React.memo(DraggableCard);