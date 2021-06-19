import {
  ERROR,
  ERROR_CLEAR,
  USER_LOADING,
  USER_LOGIN,
  USER_LOGOUT,
  USER_PICK_ROLE,
  USER_CHECK,
  USER_CHECKING,
  USER_CONFIRM,
  USER_IS_CONFIRM,
  FETCH_ALL_USERS,
  FETCH_CURRENT_USER,
  GET_LINK_COMPLETE,
  USER_CREATE_SUCCESS,
  USER_UPDATE_SUCCESS,
  USER_DELETE_SUCCESS,
  GET_ALL_USERS
} from '../constants';

import * as api from '../api';

//setIsLoading func is to set loading status
const setUserIsLoading = (status, dispatch) => {
  dispatch({
    type: USER_LOADING,
    payload: status
  });
};

//setIsLoading func is to set loading status
const setUserIsChecking = (status, dispatch) => {
  dispatch({
    type: USER_CHECKING,
    payload: status
  });
};

export const userLogin = (userReq, history) => async (dispatch) => {
  setUserIsLoading(true, dispatch);
  try {
    //get user info
    const { data } = await api.userLoginAPI(userReq);
    dispatch({
      type: USER_LOGIN,
      payload: data.data
    });

    //redirect to pickrole page
    history.push('/pickrole');
  } catch (error) {
    if (error.response.data?.errors) {
      dispatch({
        type: ERROR,
        payload: error.response.data?.errors
      });
    }
    console.log(error);
  }
  setUserIsLoading(false, dispatch);
};

export const userLogout = (history) => async (dispatch) => {
  setUserIsLoading(true, dispatch);
  try {
    //get user info
    const { data } = await api.userLogoutAPI();
    dispatch({
      type: USER_LOGOUT,
      payload: data.data
    });

    //clear roleNum in localStorage
    localStorage.removeItem('roleNum');

    //redirect to pickrole page
    history.push('/login');
  } catch (error) {
    console.log(error);
  }
  setUserIsLoading(false, dispatch);
};

export const fetchCurrentUser = (currentUser, history) => async (dispatch) => {
  try {
    const { data } = await api.fetchCurrentUser({ email: currentUser });
    console.log(data);
    dispatch({
      type: FETCH_CURRENT_USER,
      payload: data.data
    });
    history.push('/pickrole');
  } catch (error) {
    console.log(error);
  }
};

export const userCheck = (history) => async (dispatch) => {
  setUserIsChecking(true, dispatch);
  const prevPath = history.location.state?.prevPath
    ? history.location.state?.prevPath
    : history.location.pathname;

  /*
        Check user token.
        Then, sen request to the server to check the token.
        If the token is valid, then update user data.
        If not set user null and redirect to login page
    */
  try {
    //get user info
    const { data } = await api.userCheckingAPI();
    dispatch({
      type: USER_CHECK,
      payload: data.data
    });

    //default state
    let defaultHistoryOptions = {
      pathname: prevPath
    };
    //set isRecoveryMode from local storage
    const stateHistory = JSON.parse(localStorage.getItem('stateHistory'));
    if (stateHistory) {
      defaultHistoryOptions = {
        ...defaultHistoryOptions,
        state: { isRecycleMode: stateHistory.isRecycleMode }
      };
    }
    //check valid Role and set numRole
    const userRole = data.data.role;
    const currentRoleBasedOnPath = prevPath.includes('dashboard/admin')
      ? '1'
      : prevPath.includes('dashboard/reviewer')
      ? '2'
      : prevPath.includes('dashboard/creator')
      ? '3'
      : prevPath.includes('dashboard/member')
      ? '4'
      : null;
    dispatch({
      type: USER_PICK_ROLE,
      payload: currentRoleBasedOnPath
    });
    /* 
        Prevent user already login but access to login by inputting link.
         */
    prevPath === '/' ||
    prevPath === '/login' ||
    !userRole.includes(currentRoleBasedOnPath)
      ? history.push('/pickrole')
      : history.push(defaultHistoryOptions);
  } catch (error) {
    dispatch({
      type: USER_CHECK,
      payload: null
    });
    history.push(prevPath);
  }
  setUserIsChecking(false, dispatch);
};

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export const userConfirm = (id, password, history) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOADING, payload: true });
    const { data } = await api.confirmUser(id, password);
    dispatch({ type: USER_CONFIRM, payload: data });
    dispatch({ type: USER_LOADING, payload: false });
    dispatch({ type: USER_IS_CONFIRM, payload: true });
    await sleep(5000);
    dispatch({ type: USER_IS_CONFIRM, payload: false });
    dispatch({ type: GET_LINK_COMPLETE, payload: false });

    history.push('/login');
  } catch (error) {
    console.log(error);
  }
};

export const getUsers =
  (search, take, page, role, createdFrom, createdTo, updatedFrom, updatedTo) =>
  async (dispatch) => {
    setUserIsLoading(true, dispatch);
    try {
      const data = await api.getUsersAPI(
        search,
        take,
        page,
        role,
        createdFrom,
        createdTo,
        updatedFrom,
        updatedTo
      );
      dispatch({ type: FETCH_ALL_USERS, payload: data });
    } catch (error) {
      console.log(error);
    }
    setUserIsLoading(false, dispatch);
  };
export const getAllUsers = () => async (dispatch) => {
  setUserIsLoading(true, dispatch);
  try {
    const data = await api.getAllUsersAPI();
    dispatch({ type: GET_ALL_USERS, payload: data });
  } catch (error) {
    console.log(error);
  }
  setUserIsLoading(false, dispatch);
};

export const createUser = (userData) => async (dispatch) => {
  setUserIsLoading(true, dispatch);
  try {
    await api.createUserAPI(userData);
    dispatch({ type: USER_CREATE_SUCCESS, payload: true });
    dispatch({
      type: ERROR_CLEAR,
      payload: null
    });
    setTimeout(() => {
      dispatch({
        type: USER_CREATE_SUCCESS,
        payload: false
      });
    }, 3000);
  } catch (error) {
    if (error.response.data?.errors) {
      dispatch({
        type: ERROR,
        payload: error.response.data?.errors
      });
    }
    console.log(error);
  }
  setUserIsLoading(false, dispatch);
};

export const updateUser =
  (updateUser, currentUser, history) => async (dispatch) => {
    setUserIsLoading(true, dispatch);
    try {
      await api.updateUserAPI(updateUser);
      dispatch({ type: USER_UPDATE_SUCCESS, payload: true });
      dispatch({
        type: ERROR_CLEAR,
        payload: null
      });
      setTimeout(() => {
        dispatch({ type: USER_UPDATE_SUCCESS, payload: false });
      }, 3000);

      if (updateUser.filter === currentUser) {
        dispatch(fetchCurrentUser(currentUser, history));
      }
    } catch (error) {
      if (error.response.data?.errors) {
        dispatch({
          type: ERROR,
          payload: error.response.data?.errors
        });
      }
      console.log(error);
    }
    setUserIsLoading(false, dispatch);
  };

export const deleteUsers =
  (userReq, currentUser, history) => async (dispatch) => {
    setUserIsLoading(true, dispatch);
    try {
      await api.deleteUsersAPI(userReq);
      dispatch({
        type: USER_DELETE_SUCCESS,
        payload: true
      });

      dispatch({
        type: ERROR_CLEAR,
        payload: null
      });

      setTimeout(() => {
        dispatch({
          type: USER_DELETE_SUCCESS,
          payload: false
        });
      }, 3000);

      if (Object.values(userReq)[0].includes(currentUser)) {
        dispatch(userLogout(history));
      }
    } catch (error) {
      console.log(error);
    }
  };
