import axios from 'axios';

const AXIOS = axios.create({
    baseURL: `http://localhost:5000/api`,
    withCredentials: true,
});

// User API
export const userCheckingAPI = () => AXIOS.get(`/user/userCheck`);
export const userLoginAPI = (userReq) => AXIOS.post(`/user/login`, userReq);
export const userLogoutAPI = () => AXIOS.get(`/user/logout`);

export const createUserAPI = (newUser) =>
    AXIOS.post(`/user/create`, newUser);
export const deleteUsersAPI = (userReq) =>
    AXIOS.delete(`/user/delete`, { data: userReq });
export const updateUserAPI = (newUpdateUser) =>
    AXIOS.patch(`/user/update`, newUpdateUser);
export const getUsersAPI = (
    search,
    take,
    page,
) =>
    AXIOS.get(`/user/filter?search=${search}&take=${take}&page=${page}`);


// Link API
export const confirmUser = (id, password) =>
    AXIOS.patch(`/link/confirm/${id}`, { password: password });
export const getLinks = () =>
    AXIOS.get('/link');


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
