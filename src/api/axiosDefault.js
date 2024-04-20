import axios from "axios";

axios.defaults.baseURL = "https://petsclub-api-892562cd1064.herokuapp.com";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;