import { v1 } from "uuid";
import { TasksStateType } from "../App";
import { AddTodolistACType, RemoveTodolistACType } from "./todolists-reducer";

export type RemoveTaskACType = ReturnType<typeof removeTaskAC>;
export type AddTaskACType = ReturnType<typeof addTaskAC>;
export type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>;
export type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>;

export type ActionsType =
  | RemoveTaskACType
  | AddTaskACType
  | ChangeTaskStatusACType
  | ChangeTaskTitleACType
  | AddTodolistACType
  | RemoveTodolistACType;

const initialState: TasksStateType = {};

export const tasksReducer = (
  state: TasksStateType = initialState,
  action: ActionsType
): TasksStateType => {
  switch (action.type) {
    case "REMOVE-TASK": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter(
          (task) => task.id !== action.payload.taskId
        ),
      };
    }
    case "ADD-TASK": {
      // const currentTasks = state[action.payload.todolistId];
      // const updatedTasks = [
      //   {
      //     id: v1(),
      //     title: action.payload.title,
      //     isDone: false,
      //   },
      //   ...currentTasks,
      // ];
      // return {
      //   ...state,
      //   [action.payload.todolistId]: updatedTasks,
      // };

      return {
        ...state,
        [action.payload.todolistId]: [
          { id: v1(), title: action.payload.title, isDone: false },
          ...state[action.payload.todolistId],
        ],
      };
    }
    case "CHANGE-TASK-STATUS": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map(
          (task) =>
            task.id === action.payload.taskId
              ? { ...task, isDone: action.payload.isDone }
              : task
        ),
      };
    }
    case "CHANGE-TASK-TITLE": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map(
          (task) =>
            task.id === action.payload.taskId
              ? { ...task, title: action.payload.title }
              : task
        ),
      };
    }
    case "ADD-TODOLIST": {
      return { ...state, [action.payload.todolistId]: [] };
    }
    case "REMOVE-TODOLIST": {
      //Первый вариант:
      // let copyState = { ...state };
      // delete copyState[action.payload.id];
      // return copyState;

      //Второй вариант: деструктуризация объекта с использованием синтаксиса объекта в выражении присваивания, где ключ объекта формируется динамически с использованием значения из action.payload.id
      const { [action.payload.id]: deletedTodolist, ...rest } = state;
      return rest;
    }
    default:
      return state;
  }
};

export const removeTaskAC = (taskId: string, todolistId: string) => {
  return {
    type: "REMOVE-TASK",
    payload: {
      taskId,
      todolistId,
    },
  } as const;
};

export const addTaskAC = (title: string, todolistId: string) => {
  return {
    type: "ADD-TASK",
    payload: {
      title,
      todolistId,
    },
  } as const;
};

export const changeTaskStatusAC = (
  taskId: string,
  isDone: boolean,
  todolistId: string
) => {
  return {
    type: "CHANGE-TASK-STATUS",
    payload: {
      taskId,
      isDone,
      todolistId,
    },
  } as const;
};

export const changeTaskTitleAC = (
  taskId: string,
  title: string,
  todolistId: string
) => {
  return {
    type: "CHANGE-TASK-TITLE",
    payload: {
      taskId,
      title,
      todolistId,
    },
  } as const;
};
