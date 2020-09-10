import React, { useState } from "react";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { Header } from "../../components/header";
import { Select } from "../../components/select";
import { FormModal } from "../../components/modal";
import { useDataReducer, Data, DataAction } from "../../hooks/useDataReducer";
import { ToDoList } from "../../components/toDoList";
import "./style.css";

type dataContextType = {
  data: Data;
  dispatch: ({ type, payload }: DataAction) => void;
 };
 export const DataContext = React.createContext<dataContextType>(
  {} as dataContextType
 );

export const Home = () => {
 const [openGenreModal, setOpenGenreModal] = useState<boolean>(false); //ジャンルのモーダルの表示
//  ↓以下をコメントアウトすると表示
 const [data, dispatch] = useDataReducer();

 // モーダルの開閉処理

 const handleOpen = () => {
   setOpenGenreModal(true);
 };
 const handleClose = () => {
   setOpenGenreModal(false);
 };

 return (
   
   <div className="main">
     {/* ヘッダー */}
     <Header />

     {/* タスクのジャンル */}
     <div className="genre flex horizontal_center vertical_center">
       <Select />
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
       <ToDoList />
     </div>
   </div>
 );
};