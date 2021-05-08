import axios from 'axios';

const AXIOS = axios.create({
    baseURL: `http://localhost:5000/api`,
    withCredentials: true,
});

//user apis
export const userCheckingAPI = () => AXIOS.get(`/user/userCheck`);
export const userLoginAPI = (userReq) => AXIOS.post(`/user/login`, userReq);
export const createUser = (newUser) => AXIOS.post(`/user/create`, newUser)
export const fetchUsers = () => AXIOS.get('/user')
export const deleteUser = (id) => AXIOS.delete(`/user/users/${id}`)
export const searchUsersAPI = (searchString) => AXIOS.post('/user/search', { searchString: searchString })

//Link API
export const confirmUser = (id, password) => AXIOS.patch(`/link/confirm/${id}`, { password: password })