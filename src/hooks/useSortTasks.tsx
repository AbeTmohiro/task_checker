import { useState } from "react";
import { TaskType } from "../interfaces/Task";

export const useSortTasks = (): [
 TaskType[],
 (tasks: TaskType[], selectGenreId: number) => void
] => {
 const date: Date = new Date();

 const initialTasks = [
   {
     id: 0,
     name: "",
     explanation: "",
     deadline_date: date.getDay(),
     status: 0,
     genre_id: 0,
   },
 ];

 const [sortedTasks, setSortedTasks] = useState<TaskType[]>(initialTasks);

 const fetchSortedTasks = (tasks: TaskType[], selectGenreId: number) => {
   setSortedTasks(() => {
     const id: number = Number(selectGenreId);
     if (id === 0) {
       return tasks;
     }
     return tasks.filter((task: TaskType) => {
       return id === task.genre_id;
     });
   });
 };

 return [sortedTasks, fetchSortedTasks];
};