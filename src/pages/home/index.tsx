import React, { useState, useEffect } from "react";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { Header } from "../../components/header";
import { Select } from "../../components/select";
import { FormModal } from "../../components/modal";
import { ToDoList } from "../../components/toDoList";
import { useDataReducer, Data, DataAction } from "../../hooks/useDataReducer";
import { useSortTasks } from "../../hooks/useSortTasks";
import { TaskType } from "../../interfaces/Task";
import { GenreType } from "../../interfaces/Genre";
import { taskRequest } from "../../requests/taskRequest";
import { genreRequest } from "../../requests/genreRequest";
import "./style.css";

type dataContextType = {
 data: Data;
 dispatch: ({ type, payload }: DataAction) => void;
};
export const DataContext = React.createContext<dataContextType>(
 {} as dataContextType
);

export const Home = () => {
 const taskStatusElements: string[] = [
   "ToDo",
   "Pending",
   "Doing(ToDay)",
   "WIP",
   "Check",
   "Done",
 ];

 const [openGenreModal, setOpenGenreModal] = useState<boolean>(false); //ジャンルのモーダルの表示
 const [selectedGenre, setSelectedGenre] = useState<number>(0); //0は未選択の状態
 const [data, dispatch] = useDataReducer();
 const [sortedTasks, fetchSortedTasks] = useSortTasks();

 useEffect(() => {
   const fetchData = async () => {
     try {
       const tasks: TaskType[] = await taskRequest("fetchTasks");
       const genres: GenreType[] = await genreRequest("fetchGenres");
       dispatch({ type: "success", payload: { task: tasks, genre: genres } });
     } catch (err) {
       dispatch({ type: "failure", payload: { error: err.message } });
     }
   };
   fetchData();
 }, []);

 useEffect(() => {
   fetchSortedTasks(data.taskData, selectedGenre);
 }, [data.taskData]);

 // モーダルの開閉処理
 const handleOpen = () => {
   setOpenGenreModal(true);
 };
 const handleClose = () => {
   setOpenGenreModal(false);
 };

 // ジャンル選択の処理
 const handleSelectGenre = (event: any) => {
   const id = event.target.value;
   setSelectedGenre(id);
   fetchSortedTasks(data.taskData, id);
 };

 return (
   <DataContext.Provider value={{ data, dispatch }}>
     <div className="main">
       {/* ヘッダー */}
       <Header />

       {/* タスクのジャンル */}
       <div className="genre flex horizontal_center vertical_center">
         <Select
           genres={data.genreData}
           selectList={handleSelectGenre}
           initialValue={selectedGenre}
         />
         <AddCircleOutlineIcon
           className="add_circle_outline_icon"
           fontSize="default"
           onClick={handleOpen}
         />
         <FormModal
           handleClose={handleClose}
           open={openGenreModal}
           body="genreBody"
         />
       </div>

       {/* タスクの一覧 */}

       <div className="contents flex">
         {taskStatusElements.map((element) => {
           const tasks = sortedTasks.filter((sortedTask: TaskType) => {
             return sortedTask.status === taskStatusElements.indexOf(element);
           });
           return (
             <ToDoList
               key={element}
               title={element}
               tasks={tasks}
               genres={data.genreData}
             />
           );
         })}
       </div>
     </div>
   </DataContext.Provider>
 );
};