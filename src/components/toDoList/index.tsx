import React, { useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { FormModal } from "../../components/modal";
import { Task } from "../task";
import "./style.css";

export const ToDoList = () => {
 const [modalState, setModalState] = useState<boolean>(true);
 const [open, setOpen] = useState(false);

 const handleOnClick = () => {
   modalState ? setModalState(false) : setModalState(true);
 };

 const handleOpen = () => {
   setOpen(true);
 };

 const handleClose = () => {
   setOpen(false);
 };
 return (
   <div className="task_list">
     <FormModal body="taskBody" handleClose={handleClose} open={open} />
     <div className="section">
       <MenuIcon className="section_ele" onClick={handleOnClick} />
       <span className="section_ele"></span>
       <AddCircleOutlineIcon
         className="add_circle_outline_icon"
         fontSize="small"
         onClick={handleOpen}
       />
     </div>
     <div className="task_field">
      <Task />
      <Task />
      <Task />
      <Task />
     </div>
   </div>
 );
};