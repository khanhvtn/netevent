import axios from 'axios';

const AXIOS = axios.create({
    baseURL: `http://localhost:5000/api`,
    withCredentials: true,
});

// User API
export const userCheckingAPI = () => AXIOS.get(`/user/userCheck`);
export const userLoginAPI = (userReq) => AXIOS.post(`/user/login`, userReq);
export const createUser = (newUser) => AXIOS.post(`/user/create`, newUser);
export const fetchUsers = () => AXIOS.get('/user');
export const deleteUser = (id) => AXIOS.delete(`/user/users/${id}`);
export const searchUsersAPI = (searchString) =>
    AXIOS.post('/user/search', { searchString: searchString });
export const userLogoutAPI = () => AXIOS.get(`/user/logout`);
export const updateUserAPI = (id, newUpdateUser) =>
    AXIOS.patch(`/user/${id}`, newUpdateUser);

// Link API
export const confirmUser = (id, password) =>
    AXIOS.patch(`/link/confirm/${id}`, { password: password });
export const getLinks = () => AXIOS.get('/link');

//Facility APIs
export const getFacilitiesAPI = (
    search,
    take,
    page,
    status,
    createdFrom,
    createdTo,
    updatedFrom,
    updatedTo
) =>
    AXIOS.get(
        `/facility/filter?search=${search}&take=${take}&page=${page}&status=${status}&createdFrom=${createdFrom}&createdTo=${createdTo}&updatedFrom=${updatedFrom}&updatedTo=${updatedTo}`
    );
export const createFacilityAPI = (userReq) =>
    AXIOS.post(`/facility/create`, userReq);
export const updateFacilityAPI = (userReq) =>
    AXIOS.patch(`/facility/update`, userReq);
export const deleteFacilitiesAPI = (userReq) =>
    AXIOS.delete(`/facility/delete`, { data: userReq });
