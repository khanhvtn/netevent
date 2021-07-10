import axios from 'axios';
const baseURL =
    process.env.NODE_ENV === 'production'
        ? `/api`
        : `http://localhost:5000/api`;

const AXIOS = axios.create({
    baseURL,
    withCredentials: true
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
export const getFacilitiesAPI = (userQueries) => {
    const {
        search,
        take,
        page,
        isDeleted,
        createdFrom,
        createdTo,
        updatedFrom,
        updatedTo
    } = userQueries;
    return AXIOS.get(
        `/facility/filter?search=${search ? search : ''}&take=${
            take ? take : ''
        }&page=${page ? page : ''}&isDeleted=${
            isDeleted ? isDeleted : ''
        }&createdFrom=${createdFrom ? createdFrom : ''}&createdTo=${
            createdTo ? createdTo : ''
        }&updatedFrom=${updatedFrom ? updatedFrom : ''}&updatedTo=${
            updatedTo ? updatedTo : ''
        }`
    );
};
export const createFacilityAPI = (userReq) =>
    AXIOS.post(`/facility/create`, userReq);
export const updateFacilityAPI = (userReq) =>
    AXIOS.patch(`/facility/update`, userReq);
export const deleteFacilitiesAPI = (userReq) =>
    AXIOS.delete(`/facility/delete`, { data: userReq });
export const deletePermanentFacilitiesAPI = (userReq) =>
    AXIOS.delete(`/facility/deleteP`, { data: userReq });
export const getAllFacilitiesAPI = () => AXIOS.get(`/facility/all`);
export const recoverFacilitiesAPI = (userReq) =>
    AXIOS.patch(`/facility/recovery`, userReq);
export const getFacilityAPI = (facilityID) =>
    AXIOS.get(`/facility/${facilityID}`);
//Event Type APIs
export const getEventTypesAPI = (userQueries) => {
    const {
        search,
        take,
        page,
        isDeleted,
        createdFrom,
        createdTo,
        updatedFrom,
        updatedTo
    } = userQueries;
    return AXIOS.get(
        `/eventType/filter?search=${search ? search : ''}&take=${
            take ? take : ''
        }&page=${page ? page : ''}&isDeleted=${
            isDeleted ? isDeleted : ''
        }&createdFrom=${createdFrom ? createdFrom : ''}&createdTo=${
            createdTo ? createdTo : ''
        }&updatedFrom=${updatedFrom ? updatedFrom : ''}&updatedTo=${
            updatedTo ? updatedTo : ''
        }`
    );
};
export const createEventTypeAPI = (userReq) =>
    AXIOS.post(`/eventType/create`, userReq);
export const updateEventTypeAPI = (userReq) =>
    AXIOS.patch(`/eventType/update`, userReq);
export const deleteEventTypesAPI = (userReq) =>
    AXIOS.delete(`/eventType/delete`, { data: userReq });
export const deletePermanentEventTypesAPI = (userReq) =>
    AXIOS.delete(`/eventType/deleteP`, { data: userReq });
export const getAllEventTypesAPI = () => AXIOS.get(`/eventType/all`);
export const recoverEventTypesAPI = (userReq) =>
    AXIOS.patch(`/eventType/recovery`, userReq);

// Event APIs
export const getEventsAPI = (userQueries) => {
    const {
        search,
        take,
        page,
        type,
        budgetRange,
        participantRange,
        startFrom,
        startTo,
        endFrom,
        endTo,
        ownerId,
        isDeleted,
        status
    } = userQueries;
    const searchQuery = `search=${search ? search : ''}`;
    const ownerIdQuery = `ownerId=${ownerId ? ownerId : ''}`;
    const isDeletedQuery = `isDeleted=${isDeleted ? isDeleted : ''}`;
    const takeQuery = `take=${take ? take : ''}`;
    const pageQuery = `page=${page ? page : ''}`;
    const typeQuery = `type=${type ? type : ''}`;
    const budgetQuery = `budgetRange=${budgetRange ? budgetRange : ''}`;
    const participantQuery = `participantRange=${
        participantRange ? participantRange : ''
    }`;
    const startFromQuery = `startFrom=${startFrom ? startFrom : ''}`;
    const startToQuery = `startTo=${startTo ? startTo : ''}`;
    const endFromQuery = `endFrom=${endFrom ? endFrom : ''}`;
    const endToQuery = `endTo=${endTo ? endTo : ''}`;
    const statusQuery = `status=${status ? status : ''}`;

    return AXIOS.get(
        `/event/filter?${searchQuery}&${takeQuery}&${pageQuery}&${typeQuery}&${budgetQuery}&${participantQuery}&${ownerIdQuery}&${isDeletedQuery}&${startFromQuery}&${startToQuery}&${endFromQuery}&${endToQuery}&${statusQuery}`
    );
};
export const getFacilityAndTaskByEventCodeAPI = (code) =>
    AXIOS.get(`/event/detail?code=${code ? code : ''}`);
export const getRegistrationPageDetailAPI = (code) =>
    AXIOS.get(`/event/registrationPageDetail?code=${code ? code : ''}`);
export const createEventAPI = (userReq) => AXIOS.post(`/event/create`, userReq);
export const sendNotificationAPI = (notificationReq) =>
    AXIOS.post('/event/sendNotification', notificationReq);
export const updateEventAPI = (userReq) =>
    AXIOS.patch(`/event/update`, userReq);
export const updateEventStatusAPI = (userReq) =>
    AXIOS.patch('/event/update/status', userReq);
export const deleteEventAPI = (userReq) =>
    AXIOS.delete(`/event/delete`, { data: userReq });
export const deleteEventPermanentAPI = (userReq) =>
    AXIOS.delete(`/event/deleteP`, { data: userReq });
export const recoveryEventAPI = (userReq) =>
    AXIOS.patch(`/event/recovery`, userReq);
// Same route
export const fetchEventsAPI = () => AXIOS.get('/event/all');
export const getAllEventAPI = () => AXIOS.get(`/event/all`);

//Get All Event Analysis
export const getEventsAnalysisAPI = (userQueries) => {
    const startFromQuery = `startFrom=${
        userQueries?.startFrom ? userQueries?.startFrom : ''
    }`;
    const startToQuery = `startTo=${
        userQueries?.startTo ? userQueries?.startTo : ''
    }`;
    const endFromQuery = `endFrom=${
        userQueries?.endFrom ? userQueries?.endFrom : ''
    }`;
    const endToQuery = `endTo=${userQueries?.endTo ? userQueries?.endTo : ''}`;

    return AXIOS.get(
        `/event/analysisAll?${startFromQuery}&${startToQuery}&${endFromQuery}&${endToQuery}`
    );
};

// Get Event Analysis by ID

export const getEventAnalysisByIDAPI = (eventId) =>
    AXIOS.get(`/event/analysis?eventId=${eventId ? eventId : ''}`);

// Facility History APIs
export const getFacilityHistoriesAPI = (userQueries) => {
    const idQuery = `id=${userQueries.id ? userQueries.id : ''}`;
    const searchQuery = `search=${
        userQueries.search ? userQueries.search : ''
    }`;
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
        `/facilityHistory/filter?${idQuery}&${searchQuery}&${takeQuery}&${pageQuery}&${createdFromQuery}&${createdToQuery}&${updatedFromQuery}&${updatedToQuery}&${borrowFromQuery}&${borrowToQuery}&${returnFromQuery}&${returnToQuery}`
    );
};

export const getAllFacilityHistoriesAPI = () =>
    AXIOS.get(`/facilityHistory/all`);

// Participant API
export const getAllParticipants = () => AXIOS.get('/participant');

export const registerParticipantAPI = (participantData) =>
    AXIOS.post('/participant/registerEvent', participantData);
export const getParticipantsAPI = (
    search,
    take,
    page,
    academic,
    isValid,
    isAttended,
    eventId,
    status
) =>
    AXIOS.get(
        `/participant/filter?search=${search ? search : ''}&take=${
            take ? take : ''
        }&page=${page ? page : ''}&academic=${
            academic ? academic : ''
        }&isValid=${isValid === '' ? '' : isValid}&isAttended=${
            isAttended === '' ? '' : isAttended
        }&eventId=${eventId ? eventId : ''}&status=${status ? status : ''}`
    );
export const setInvalidAndVerifyParticipantAPI = (userReq) =>
    AXIOS.patch('/participant/update/valid', userReq);
export const setAttendedParticipantAPI = (userReq) =>
    AXIOS.patch('/participant/update/attend', userReq);

// Notification History API
export const getNotificationHistoryByEventCodeAPI = (code) =>
    AXIOS.get(`/notificationHistory/all?code=${code ? code : ''}`);

// Task API
export const getTasksByEventAPI = (userQueries) => {
    const takeQuery = `take=${userQueries?.take ? userQueries?.take : ''}`;
    const pageQuery = `page=${userQueries?.page ? userQueries?.page : ''}`;
    const userIdQuery = `userId=${
        userQueries?.userId ? userQueries?.userId : ''
    }`;
    const statusQuery = `status=${
        userQueries?.status ? userQueries?.status : ''
    }`;

    return AXIOS.get(
        `/task/getTasksByEvent?${takeQuery}&${pageQuery}&${userIdQuery}&${statusQuery}`
    );
};
export const getTasksAPI = (userQueries) => {
    const {
        search,
        take,
        page,
        isDeleted,
        createdFrom,
        createdTo,
        updatedFrom,
        updatedTo,
        userId
    } = userQueries;
    return AXIOS.get(
        `/task/filter?search=${search ? search : ''}&take=${
            take ? take : ''
        }&page=${page ? page : ''}&isDeleted=${
            isDeleted ? isDeleted : ''
        }&userId=${userId ? userId : ''}&createdFrom=${
            createdFrom ? createdFrom : ''
        }&createdTo=${createdTo ? createdTo : ''}&updatedFrom=${
            updatedFrom ? updatedFrom : ''
        }&updatedTo=${updatedTo ? updatedTo : ''}`
    );
};
