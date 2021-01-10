import userActionTypes from './userActionTypes';

const INITIAL_STATE = {
  loading: false,
  error: null,
  success: false,
  userInfo: null
};

// Maybe can be scalable for saving user's credentials
export const currentUserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userActionTypes.USER_CLEAR_ERROR:
      return {
        ...state,
        error: null,
        loading: false,
        success: false
      };
    case userActionTypes.USER_LOGIN_REQUEST:
    case userActionTypes.USER_REGISTER_REQUEST:
    case userActionTypes.USER_DETAILS_REQUEST:
    case userActionTypes.USER_UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        success: false
      };
    case userActionTypes.USER_LOGIN_SUCCESS:
    case userActionTypes.USER_REGISTER_SUCCESS:
    case userActionTypes.USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        userInfo: action.payload
      };
    case userActionTypes.USER_UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
        userInfo: action.payload
      };
    case userActionTypes.USER_LOGIN_FAIL:
    case userActionTypes.USER_REGISTER_FAIL:
    case userActionTypes.USER_DETAILS_FAIL:
    case userActionTypes.USER_UPDATE_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case userActionTypes.USER_LOGOUT:
      return {
        ...state,
        error: null,
        success: false,
        userInfo: null
      };
    default:
      return state;
  }
};
