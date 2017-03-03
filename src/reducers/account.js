import * as types from '../constants/account';

const initialstate = {
  loading: false,
  isAuthenticated: false,
  info: {},
  errorMessage: null,
  statusCode: ''
}

const account = (state = initialstate, action) => {
switch (action.type) {
  case types.ACCOUNT_SIGNIN_REQUESTED:
    return {
      ...state,
      loading: true,
      errorMessage: null
    };
  case types.ACCOUNT_SIGNIN_SUCCESSED:
    console.log(action.payload)
    return {
      ...state,
      loading: false,
      info: action.payload,
      isAuthenticated: true,
      errorMessage: null,
      statusCode: 200
    };
  case types.ACCOUNT_SIGNIN_FAILED:
    return {
      ...state,
      loading: false,
      isAuthenticated: false,
      statusCode: action.payload.response.status
    };
  case types.ACCOUNT_SIGNUP_REQUESTED:
    return {
      ...state,
      loading: true,
      errorMessage: null
    };
  case types.ACCOUNT_SIGNUP_SUCCESSED:
    return {
      ...state,
      info: action.payload,
      isAuthenticated: true
  };
  case types.ACCOUNT_SIGNUP_FAILED:
    return {
      ...state,
      loading: false,
      isAuthenticated: false,
      statusCode: action.payload.response.status
    };
  case types.ACCOUNT_FETCH_REQUESTED:
    return {
      ...state,
      loading: true,
      errorMessage: null,
      isAuthenticated: true
    };
  case types.ACCOUNT_FETCH_SUCCESSED:
    return {
      ...state,
      info: action.payload,
      isAuthenticated: true
    };
  case types.ACCOUNT_FETCH_FAILED:
    return {
      ...state,
      errorMessage: action.payload.response.data.error,
      statusCode: action.payload.response.status,
      isAuthenticated: false
    };
  case types.ACCOUNT_SIGNOUT_REQUESTED:
      return {
        ...state
      };
  case types.ACCOUNT_SIGNOUT_SUCCESSED:
  return {
    ...state,
    isAuthenticated: false,
    info: '',
    errorMessage: null,
    statusCode: 200
  };
  case types.ACCOUNT_SIGNOUT_FAILED:
    return {
      ...state
    }
  default:
    return initialstate;
}

}

export default account;
