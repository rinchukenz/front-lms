import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api/interview",
});

export const startInterview = async (topic) =>
  await API.post("/start", { topic });

export const sendAnswer = async (payload) =>
  await API.post("/answer", payload);
