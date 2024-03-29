import { atom } from 'recoil';

// 이 state는 string으로써의 property와 string array로 이루어져 있다.
interface IToDoState {
    [key: string]: ITodo[];
}

export interface ITodo {
    id: number;
    text: string;
}

export const toDoState = atom<IToDoState>({
    key: 'toDo',
    default: {
        'To Do': [],
        Doing: [],
        Done: [],
    },
})
