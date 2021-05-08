import axios from 'axios';

const AXIOS = axios.create({
    baseURL: `http://localhost:5000/api`,
    withCredentials: true,
});

//user apis
export const userCheckingAPI = () => AXIOS.get(`/user/userCheck`);
export const userLoginAPI = (userReq) => AXIOS.post(`/user/login`, userReq);
export const userLogoutAPI = () => AXIOS.get(`/user/logout`);
