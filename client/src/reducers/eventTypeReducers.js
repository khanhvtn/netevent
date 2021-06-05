import {
  EVENT_TYPE_GET_ALL,
  EVENT_TYPE_LOADING,
  EVENT_TYPE_CREATE_SUCCESS,
  EVENT_TYPE_UPDATE_SUCCESS,
  EVENT_TYPE_DELETE_SUCCESS,
  EVENT_TYPE_GET_ALL_FILTER,
  EVENT_TYPE_RECOVERY_SUCCESS,
} from '../constants';

const initialState = {
  isLoading: false,
  eventTypes: [],
  totalPages: null,
  createSuccess: false,
  updateSuccess: false,
  deleteSuccess: false,
  recoverySuccess: false,
};

export default function facilityReducers(state = initialState, action) {
  switch (action.type) {
    case EVENT_TYPE_GET_ALL:
      return {
        ...state,
        eventTypes: action.payload.data.data,
      };
    case EVENT_TYPE_GET_ALL_FILTER:
      return {
        ...state,
        eventTypes: action.payload.data.data,
        totalPages: action.payload.data.totalPages,
      };
    case EVENT_TYPE_LOADING:
      return { ...state, isLoading: action.payload };
    case EVENT_TYPE_CREATE_SUCCESS:
      return { ...state, createSuccess: action.payload };
    case EVENT_TYPE_UPDATE_SUCCESS:
      return { ...state, updateSuccess: action.payload };
    case EVENT_TYPE_DELETE_SUCCESS:
      return { ...state, deleteSuccess: action.payload };
    case EVENT_TYPE_RECOVERY_SUCCESS:
      return { ...state, recoverySuccess: action.payload };
    default:
      return state;
  }
}
