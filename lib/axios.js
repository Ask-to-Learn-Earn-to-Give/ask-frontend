import Axios from "axios";
const axios = Axios.create({
  baseURL: process.env.API_URL,
  responseType: "json",

  headers: {
    "Content-Type": "application/json",
  },
});

export default axios;
