import { useReducer } from "react";
import { TaskType } from "../interfaces/Task";
import { GenreType } from "../interfaces/Genre";

export type Data = {
  taskData: TaskType[];
  genreData: GenreType[];
  isLoading: boolean;
  error?: string;
};

export type DataAction = {
  type: "request" | "success" | "failure";
  payload: { task?: TaskType[]; genre?: GenreType[]; error?: string };
};

export const useDataReducer = (): [
  Data,
  ({ type, payload }: DataAction) => void
] => {
  const date: Date = new Date();

  const initialData: Data = {
    taskData: [
      {
        id: 0,
        name: "",
        explanation: "",
        deadline_date: date.getDay(),
        status: 0,
        genre_id: 0,
      },
    ],
    genreData: [{ id: 0, name: "" }],
    isLoading: false,
    error: "",
  };

  const reducer = (data: Data, action: DataAction) => {
    switch (action.type) {
      case "request":
        return {
          ...data,
          isLoading: true,
        };
      case "success":
        return {
          ...data,
          taskData: action.payload.task || data.taskData,
          genreData: action.payload.genre || data.genreData,
          isLoading: true,
        };
      case "failure":
        return {
          ...data,
          isLoading: true,
          error: action.payload.error,
        };
    }
  };

  const [data, dispatch] = useReducer(reducer, initialData);
  return [data, dispatch];
};