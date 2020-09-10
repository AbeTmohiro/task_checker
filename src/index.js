import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./utilities.css";
import {Home} from "./pages/home";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
 <React.StrictMode>
   <Home />
 </React.StrictMode>,
 document.getElementById("root")
);

serviceWorker.unregister();