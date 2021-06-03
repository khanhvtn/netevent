import axios from 'axios';
const baseURL =
    process.env.NODE_ENV === 'production'
        ? `/api`
        : `http://localhost:5000/api`;

const AXIOS = axios.create({
    baseURL,
    withCredentials: true,
});

// User API
export const userCheckingAPI = () => AXIOS.get(`/user/userCheck`);
export const userLoginAPI = (userReq) => AXIOS.post(`/user/login`, userReq);
export const userLogoutAPI = () => AXIOS.get(`/user/logout`);
export const fetchCurrentUser = (userReq) =>
    AXIOS.post(`/user/fetchCurrent`, userReq);
export const createUserAPI = (newUser) => AXIOS.post(`/user/create`, newUser);
export const deleteUsersAPI = (userReq) =>
    AXIOS.delete(`/user/delete`, { data: userReq });
export const updateUserAPI = (newUpdateUser) =>
    AXIOS.patch(`/user/update`, newUpdateUser);
export const getAllUsersAPI = () => AXIOS.get(`/user/all`);
export const getUsersAPI = (
    search,
    take,
    page,
    role,
    createdFrom,
    createdTo,
    updatedFrom,
    updatedTo
) =>
    AXIOS.get(
        `/user/filter?search=${search}&take=${take}&page=${page}&role=${role}&createdFrom=${createdFrom}&createdTo=${createdTo}&updatedFrom=${updatedFrom}&updatedTo=${updatedTo}`
    );

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
        `/facility/filter?search=${search ? search : ''}&take=${
            take ? take : ''
        }&page=${page ? page : ''}&status=${status ? status : ''}&createdFrom=${
            createdFrom ? createdFrom : ''
        }&createdTo=${createdTo ? createdTo : ''}&updatedFrom=${
            updatedFrom ? updatedFrom : ''
        }&updatedTo=${updatedTo ? updatedTo : ''}`
    );
export const createFacilityAPI = (userReq) =>
    AXIOS.post(`/facility/create`, userReq);
export const updateFacilityAPI = (userReq) =>
    AXIOS.patch(`/facility/update`, userReq);
export const deleteFacilitiesAPI = (userReq) =>
    AXIOS.delete(`/facility/delete`, { data: userReq });
export const getAllFacilitiesAPI = () => AXIOS.get(`/facility/all`);

//Event Type APIs
export const getEventTypesAPI = (
    search,
    take,
    page,
    createdFrom,
    createdTo,
    updatedFrom,
    updatedTo
) =>
    AXIOS.get(
        `/eventType/filter?search=${search ? search : ''}&take=${
            take ? take : ''
        }&page=${page ? page : ''}&createdFrom=${
            createdFrom ? createdFrom : ''
        }&createdTo=${createdTo ? createdTo : ''}&updatedFrom=${
            updatedFrom ? updatedFrom : ''
        }&updatedTo=${updatedTo ? updatedTo : ''}`
    );
export const createEventTypeAPI = (userReq) =>
    AXIOS.post(`/eventType/create`, userReq);
export const updateEventTypeAPI = (userReq) =>
    AXIOS.patch(`/eventType/update`, userReq);
export const deleteEventTypesAPI = (userReq) =>
    AXIOS.delete(`/eventType/delete`, { data: userReq });
export const getAllEventTypesAPI = () => AXIOS.get(`/eventType/all`);

// Event APIs
export const getEventsAPI = (search, take, page) => 
    AXIOS.get(`/event/filter?search=${search ? search : ''}&take=${take ? take : ''}&page=${page ? page : ''}`);

export const createEventAPI = (userReq) => AXIOS.post(`/event/create`, userReq);
export const updateEventAPI = (userReq) => AXIOS.patch(`/event/update`, userReq);
export const deleteEventAPI = (userReq) => AXIOS.delete(`/event/delete`, userReq);

// Facility History APIs
export const getFacilityHistoriesAPI = (userQueries) => {
    const takeQuery = `take=${userQueries?.take ? userQueries?.take : ''}`;
    const pageQuery = `page=${userQueries?.page ? userQueries?.page : ''}`;
    const createdFromQuery = `createdFrom=${
        userQueries?.createdFrom ? userQueries?.createdFrom : ''
    }`;
    const createdToQuery = `createdTo=${
        userQueries?.createdTo ? userQueries?.createdTo : ''
    }`;
    const updatedFromQuery = `updatedFrom=${
        userQueries?.updatedFrom ? userQueries?.updatedFrom : ''
    }`;
    const updatedToQuery = `updatedTo=${
        userQueries?.updatedTo ? userQueries?.updatedTo : ''
    }`;
    const borrowFromQuery = `borrowFrom=${
        userQueries?.borrowFrom ? userQueries?.borrowFrom : ''
    }`;
    const borrowToQuery = `borrowTo=${
        userQueries?.borrowTo ? userQueries?.borrowTo : ''
    }`;
    const returnFromQuery = `returnFrom=${
        userQueries?.returnFrom ? userQueries?.returnFrom : ''
    }`;
    const returnToQuery = `returnTo=${
        userQueries?.returnTo ? userQueries?.returnTo : ''
    }`;
    return AXIOS.get(
        `/facilityHistory/filter?${takeQuery}&${pageQuery}&${createdFromQuery}&${createdToQuery}&${updatedFromQuery}&${updatedToQuery}&${borrowFromQuery}&${borrowToQuery}&${returnFromQuery}&${returnToQuery}`
    );
};

export const getAllFacilityHistoriesAPI = () =>
    AXIOS.get(`/facilityHistory/all`);
