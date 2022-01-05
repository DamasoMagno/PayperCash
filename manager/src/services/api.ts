import axios from "axios";
const token = JSON.parse( localStorage.getItem("@token") as string);

export const api = axios.create({
  baseURL: "http://localhost:3333",
  headers: { token: token }
});
