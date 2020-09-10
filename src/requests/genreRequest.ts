import axiosBase from "axios";
import { GenreType } from "../interfaces/Genre";

type action = "fetchGenres" | "createGenres" | "deleteGenres";
type parameter = { id?: number; data?: GenreType };

const api = axiosBase.create({
 baseURL: "http://localhost:3000/genres",
 responseType: "json",
});

export const genreRequest: any = async (
 action: action,
 parameter: parameter
) => {
 switch (action) {
   case "fetchGenres":
     const genres = await api.get("/");
     return genres.data;
   case "createGenres":
     const createGenres = await api.post(`/`, parameter.data);
     return createGenres.data;
   case "deleteGenres":
     const updateGenres = await api.delete(`/${parameter.id}`);
     return updateGenres.data;
   default:
     return null;
 }
};