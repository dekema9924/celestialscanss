import axios from "axios";
import { apiurl } from "../config/urls";


const axiosInstance = axios.create({
    baseURL: apiurl,
    withCredentials: true
})



export default axiosInstance