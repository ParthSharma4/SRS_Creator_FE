import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // BACKEND
});

export const createProject = (description) =>
  API.post("/projects", { description });
export const getProject = (projectId) => API.get(`/projects/${projectId}`);

export default API;
