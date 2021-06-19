import {
  FACILITY_HISTORY_LOADING,
  FACILITY_HISTORY_GET_ALL,
  FACILITY_HISTORY_GET_ALL_FILTER
} from '../constants';

const initialState = {
  isLoading: false,
  facilityHistories: [],
  totalPages: null,
  createSuccess: false,
  updateSuccess: false,
  deleteSuccess: false
};

export default function facilityHistoryReducers(state = initialState, action) {
  switch (action.type) {
    case FACILITY_HISTORY_GET_ALL:
      return {
        ...state,
        facilityHistories: action.payload.data.data
      };
    case FACILITY_HISTORY_GET_ALL_FILTER:
      return {
        ...state,
        facilityHistories: action.payload.data.data,
        totalPages: action.payload.data.totalPages
      };
    case FACILITY_HISTORY_LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}
