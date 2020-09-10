import axiosBase from "axios";
import { TaskType } from "../interfaces/Task";

type action =
 | "fetchTasks"
 | "createTasks"
 | "updateTasks"
 | "deleteTasks"
 | "updateStatus";
type parameter = { id?: number; data?: TaskType; status?: number };

const api = axiosBase.create({
 baseURL: "http://localhost:3000/tasks",
 responseType: "json",
});

export const taskRequest: any = async (
 action: action,
 parameter: parameter
) => {
 switch (action) {
   case "fetchTasks":
     const tasks = await api.get("/");
     return tasks.data;
   case "createTasks":
     const createTasks = await api.post(`/`, parameter.data);
     return createTasks.data;
   case "updateTasks":
     const updateTasks = await api.put(`/${parameter.id}`, parameter.data);
     return updateTasks.data;
   case "deleteTasks":
     const deleteTasks = await api.delete(`/${parameter.id}`);
     return deleteTasks.data;
   case "updateStatus":
     const updateStatus = await api.post(`/${parameter.id}/status`, {
       status: parameter.status,
     });
     return updateStatus.data;
   default:
     return null;
 }
};