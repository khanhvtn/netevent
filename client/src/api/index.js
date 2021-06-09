import axios from 'axios';
const baseURL =
  process.env.NODE_ENV === 'production' ? `/api` : `http://localhost:5000/api`;

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
export const getFacilitiesAPI = (userQueries) => {
  const {
    search,
    take,
    page,
    isDeleted,
    createdFrom,
    createdTo,
    updatedFrom,
    updatedTo,
  } = userQueries;
  return AXIOS.get(
    `/facility/filter?search=${search ? search : ''}&take=${take ? take : ''
    }&page=${page ? page : ''}&isDeleted=${isDeleted ? isDeleted : ''
    }&createdFrom=${createdFrom ? createdFrom : ''}&createdTo=${createdTo ? createdTo : ''
    }&updatedFrom=${updatedFrom ? updatedFrom : ''}&updatedTo=${updatedTo ? updatedTo : ''
    }`
  );
};
export const createFacilityAPI = (userReq) =>
  AXIOS.post(`/facility/create`, userReq);
export const updateFacilityAPI = (userReq) =>
  AXIOS.patch(`/facility/update`, userReq);
export const deleteFacilitiesAPI = (userReq) =>
  AXIOS.delete(`/facility/delete`, { data: userReq });
export const getAllFacilitiesAPI = () => AXIOS.get(`/facility/all`);
export const recoverFacilitiesAPI = (userReq) =>
  AXIOS.patch(`/facility/recovery`, userReq);

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
    updatedTo,
  } = userQueries;
  return AXIOS.get(
    `/eventType/filter?search=${search ? search : ''}&take=${take ? take : ''
    }&page=${page ? page : ''}&isDeleted=${isDeleted ? isDeleted : ''
    }&createdFrom=${createdFrom ? createdFrom : ''}&createdTo=${createdTo ? createdTo : ''
    }&updatedFrom=${updatedFrom ? updatedFrom : ''}&updatedTo=${updatedTo ? updatedTo : ''
    }`
  );
};
export const createEventTypeAPI = (userReq) =>
  AXIOS.post(`/eventType/create`, userReq);
export const updateEventTypeAPI = (userReq) =>
  AXIOS.patch(`/eventType/update`, userReq);
export const deleteEventTypesAPI = (userReq) =>
  AXIOS.delete(`/eventType/delete`, { data: userReq });
export const getAllEventTypesAPI = () => AXIOS.get(`/eventType/all`);
export const recoverEventTypesAPI = (userReq) =>
  AXIOS.patch(`/eventType/recovery`, userReq);

// Event APIs
export const getEventsAPI = (search, take, page, type, budgetRange, participantRange) =>
  AXIOS.get(
    `/event/get?search=${search ? search : ''}&take=${take ? take : ''}&page=${page ? page : ''}&type=${type ? type : ''}&budgetRange=${budgetRange ? budgetRange : ''}&participantRange=${participantRange ? participantRange : ''}`
  );
export const getFacilityAndTaskByEventNameAPI = (eventName) =>
  AXIOS.get(`/event/detail?eventName=${eventName ? eventName : ''}`)
export const createEventAPI = (userReq) => AXIOS.post(`/event/create`, userReq);
export const sendNotificationAPI = (notificationReq) => AXIOS.post('/event/sendNotification', notificationReq)
export const updateEventAPI = (userReq) => AXIOS.patch(`/event/update`, userReq);
export const deleteEventAPI = (userReq) => AXIOS.delete(`/event/delete`, { data: userReq });
export const deleteEventManagementAPI = (userReq) => AXIOS.delete(`/event/deleteManagement`, { data: userReq });
// Same route
export const fetchEventsAPI = () => AXIOS.get('/event/all')
export const getAllEventAPI = () => AXIOS.get(`/event/all`);


// Facility History APIs
export const getFacilityHistoriesAPI = (userQueries) => {
  const takeQuery = `take=${userQueries?.take ? userQueries?.take : ''}`;
  const pageQuery = `page=${userQueries?.page ? userQueries?.page : ''}`;
  const createdFromQuery = `createdFrom=${userQueries?.createdFrom ? userQueries?.createdFrom : ''
    }`;
  const createdToQuery = `createdTo=${userQueries?.createdTo ? userQueries?.createdTo : ''
    }`;
  const updatedFromQuery = `updatedFrom=${userQueries?.updatedFrom ? userQueries?.updatedFrom : ''
    }`;
  const updatedToQuery = `updatedTo=${userQueries?.updatedTo ? userQueries?.updatedTo : ''
    }`;
  const borrowFromQuery = `borrowFrom=${userQueries?.borrowFrom ? userQueries?.borrowFrom : ''
    }`;
  const borrowToQuery = `borrowTo=${userQueries?.borrowTo ? userQueries?.borrowTo : ''
    }`;
  const returnFromQuery = `returnFrom=${userQueries?.returnFrom ? userQueries?.returnFrom : ''
    }`;
  const returnToQuery = `returnTo=${userQueries?.returnTo ? userQueries?.returnTo : ''
    }`;
  return AXIOS.get(
    `/facilityHistory/filter?${takeQuery}&${pageQuery}&${createdFromQuery}&${createdToQuery}&${updatedFromQuery}&${updatedToQuery}&${borrowFromQuery}&${borrowToQuery}&${returnFromQuery}&${returnToQuery}`
  );
};

export const getAllFacilityHistoriesAPI = () =>
  AXIOS.get(`/facilityHistory/all`);


// Participant API
export const registerParticipantAPI = (participantData) => AXIOS.post('/participant/registerEvent', participantData);
export const getParticipantsAPI = (search, take, page, eventId) => AXIOS.get(`/participant/filter?search=${search ? search : ''}&take=${take ? take : ''}&page=${page ? page : ''}&eventId=${eventId ? eventId : ''}`);
