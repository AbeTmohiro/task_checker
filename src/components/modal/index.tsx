import React from "react";
import Modal from "react-modal";
import { TaskBody } from "./taskBody";
import { GenreBody } from "./genreBody";

interface Props {
 handleClose: () => void;
 open: boolean;
 body: string; //モーダルの中身を区別する値
}
const customStyles = {
 overlay: {
   backgroundColor: "rgb(80, 80, 80)",
 },
 content: {
   top: "10%",
   left: "60%",
   right: "50%",
   height: "75vh",
   width: "20vw",
   marginLeft: "-30vw",
   padding: "2vw 10vw",
 },
};

const renderBody = (body: string, handleClose: () => void) => {
 switch (body) {
   case "taskBody":
     return <TaskBody />;
   case "genreBody":
     return <GenreBody />;
   default:
     return <div />;
 }
};

export const FormModal = (props: Props) => {
 Modal.setAppElement("#root");
 return (
   <Modal
     isOpen={props.open}
     onRequestClose={props.handleClose}
     style={customStyles}
   >
     {renderBody(props.body, props.handleClose)}
   </Modal>
 );
};