import { useRef } from "react";
import { Droppable } from "react-beautiful-dnd"
import styled from "styled-components";
import DraggableCard from "./DraggableCard"
import { useForm } from 'react-hook-form';
import { ITodo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";

const Wrapper = styled.div`
    padding-top: 10px;
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
    background-color: ${props => props.isDraggingOver
        ? '#dfe6e9'
        : props.isDraggingFromThisWith
            ? '#b2bec3'
            : 'transparent'};
    flex-grow: 1;
    transition: background-color .3s ease-in-out;
    padding: 20px;
`;

const Form = styled.form`
    width: 100%;
    input {
        width: 100%;
    }
`;

interface IAreaProps {
    isDraggingFromThisWith: boolean;
    isDraggingOver: boolean;
}

interface IBoardProps {
    toDos: ITodo[],
    boardId: string,
}

interface IForm {
    toDo: string;
}

const Board = ({ toDos, boardId }: IBoardProps) => {
    const setToDos = useSetRecoilState(toDoState);
    const { register, setValue, handleSubmit } = useForm<IForm>();
    const onValid = ({ toDo }: IForm) => {
        console.log(toDo);
        const newTodo = {
            id: Date.now(),
            text: toDo,
        }
        setToDos(allBoards => {
            return {
                ...allBoards,
                [boardId]: [...allBoards[boardId], newTodo]
            }
        })
        setValue('toDo', '');
    }
    return (
        <Wrapper>
            <Title>{boardId}</Title>
            <Form onSubmit={handleSubmit(onValid)}>
                <input
                    type='txt'
                    placeholder={`Add task on ${boardId}`}
                    {...register('toDo', { required: true })}
                />
            </Form>
            <Droppable droppableId={boardId}>
                {(provided, snapshot) =>
                    <Area
                        isDraggingOver={snapshot.isDraggingOver}
                        isDraggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {toDos.map((toDo, i) =>
                            <DraggableCard
                                key={toDo.id}
                                toDoText={toDo.text}
                                toDoId={toDo.id}
                                i={i}
                            />
                        )}
                        {provided.placeholder}
                    </Area>
                }
            </Droppable>
        </Wrapper>
    )
}

export default Board;