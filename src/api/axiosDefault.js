import axios from "axios";

axios.defaults.baseURL = "https://pawfect-pics-87d81c100ee5.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;