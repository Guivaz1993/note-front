import axios from "axios";

export default axios.create({
  baseURL: "https://orange-note.herokuapp.com",
  // baseURL: "http://localhost:8000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
