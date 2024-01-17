import { FilterValuesType, TodolistType } from "../App";
import { v1 } from "uuid";

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>;
export type AddTodolistACType = ReturnType<typeof addTodolistAC>;
export type ChangeTodolistTitleACType = ReturnType<
  typeof changeTodolistTitleAC
>;
export type ChangeFilterACType = ReturnType<typeof changeFilterAC>;

export type TodolistsReducerType =
  | RemoveTodolistACType
  | AddTodolistACType
  | ChangeTodolistTitleACType
  | ChangeFilterACType;

const initialState: Array<TodolistType> = [];

export const todolistsReducer = (
  state: Array<TodolistType> = initialState,
  action: TodolistsReducerType
): TodolistType[] => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      //   // засунем в стейт список тудулистов, id которых не равны тому, который нужно выкинуть
      //   setTodolists(todolists.filter((tl) => tl.id != id));
      //   // удалим таски для этого тудулиста из второго стейта, где мы храним отдельно таски
      //   delete tasks[id]; // удаляем св-во из объекта... значением которого являлся массив тасок
      //   // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
      //   setTasks({ ...tasks });
      return state.filter((el) => el.id !== action.payload.id);
    }
    case "ADD-TODOLIST": {
      let newTodolist: TodolistType = {
        id: action.payload.todolistId,
        title: action.payload.title,
        filter: "all",
      };

      return [...state, newTodolist];
    }
    case "CHANGE-TODOLIST-TITLE": {
      // // найдём нужный todolist
      // const todolist = todolists.find(tl => tl.id === id);
      // if (todolist) {
      //     // если нашёлся - изменим ему заголовок
      //     todolist.title = title;
      //     setTodolists([...todolists]);
      // }
      return state.map((el) =>
        el.id === action.payload.id
          ? { ...el, title: action.payload.title }
          : el
      );
    }
    case "CHANGE-TODOLIST-FILTER": {
      // let todolist = todolists.find(tl => tl.id === todolistId);
      // if (todolist) {
      //     todolist.filter = value;
      //     setTodolists([...todolists])
      // }
      return state.map((el) =>
        el.id === action.payload.id
          ? { ...el, filter: action.payload.filter }
          : el
      );
    }
    default:
      return state;
  }
};

export const removeTodolistAC = (id: string) => {
  return {
    type: "REMOVE-TODOLIST",
    payload: {
      id,
    },
  } as const;
};

export const addTodolistAC = (title: string) => {
  return {
    type: "ADD-TODOLIST",
    payload: {
      title,
      todolistId: v1(),
    },
  } as const;
};

export const changeTodolistTitleAC = (id: string, title: string) => {
  return {
    type: "CHANGE-TODOLIST-TITLE",
    payload: {
      id,
      title,
    },
  } as const;
};

export const changeFilterAC = (id: string, filter: FilterValuesType) => {
  return {
    type: "CHANGE-TODOLIST-FILTER",
    payload: {
      id,
      filter,
    },
  } as const;
};
