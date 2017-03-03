import * as types from '../constants/account';
/*
export const signin = (accountInfo) => (
  (dispatch) => (
    dispatch ({
      type: types.ACCOUNT_SIGNIN_REQUESTED,
      payload: accountInfo
    })
  )
);
*/

export const signup = (accountInfo) => {
  console.log(accountInfo);
  return {
    type: types.ACCOUNT_SIGNUP_REQUESTED,
    payload: accountInfo
  }
}

export const signin = (accountInfo) => {
  return {
    type: types.ACCOUNT_SIGNIN_REQUESTED,
    payload: accountInfo
  }
};

export const signout = () => {
  return {
    type: types.ACCOUNT_SIGNOUT_REQUESTED
  }
}

export const fetch = () => {
  return {
    type: types.ACCOUNT_FETCH_REQUESTED
  }
}
