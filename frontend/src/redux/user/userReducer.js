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

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case userActionTypes.USER_LIST_REQUEST:
      return { loading: true };
    case userActionTypes.USER_LIST_SUCCESS:
      return {
        loading: false,
        users: action.payload.users,
        pages: action.payload.pages,
        page: action.payload.page
      };
    case userActionTypes.USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    case userActionTypes.USER_LIST_RESET:
      return { users: [] };
    default:
      return state;
  }
};

export const userListModifyReducer = (state = {}, action) => {
  switch (action.type) {
    // TODO: when admin deletes a user, it shouldn't request users list twice
    // since during sending request, it sets success back to null.
    case userActionTypes.USER_UPDATE_RESET:
    case userActionTypes.USER_DELETE_RESET:
      return {};
    case userActionTypes.USER_UPDATE_REQUEST:
    case userActionTypes.USER_DELETE_REQUEST:
      return { loading: true };
    case userActionTypes.USER_UPDATE_SUCCESS:
    case userActionTypes.USER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case userActionTypes.USER_UPDATE_FAIL:
    case userActionTypes.USER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// For admin updates user details
// TODO: may be combine with currentUser detail reducer.
export const userInfoReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case userActionTypes.USER_INFO_REQUEST:
      return { ...state, loading: true };
    case userActionTypes.USER_INFO_SUCCESS:
      return { loading: false, user: action.payload };
    case userActionTypes.USER_INFO_FAIL:
      return { ...state, loading: false, error: action.payload };
    case userActionTypes.USER_INFO_RESET:
      return { user: {} };
    default:
      return state;
  }
};
