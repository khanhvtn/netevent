import axios from 'axios';

const AXIOS = axios.create({
    baseURL: `http://localhost:5000/api`,
    withCredentials: true,
});

//user apis
export const userCheckingAPI = () => AXIOS.get(`/user/userCheck`);
export const userLoginAPI = (userReq) => AXIOS.post(`/user/login`, userReq);
export const createUser = (newUser) => AXIOS.post(`/user/create`, newUser)


//Link API
export const confirmUser = (id, password) => AXIOS.patch(`/link/confirm/${id}`, password)