import { takeLatest } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import * as types from '../constants/account';
import { Api } from '../api';

function * signup(action) {
  try {
    console.log(action.payload);
    const response = yield call(Api.account.signup, action.payload);
    console.log(response)
    yield put({ type: types.ACCOUNT_SIGNUP_SUCCESSED, payload: response.data });
  } catch (err) {
    yield put({ type: types.ACCOUNT_SIGNUP_FAILED, response: err.response });
  }
}

function* signin(action) {
try {
  const response = yield call(Api.account.signin, action.payload);
  yield put({ type: types.ACCOUNT_SIGNIN_SUCCESSED, payload: response.data});
} catch (err) {
  yield put({ type: types.ACCOUNT_SIGNIN_FAILED, response: err.response });
}
}

function* signout(){
  try {
    yield call(Api.account.signout);
    yield put({ type: types.ACCOUNT_SIGNOUT_SUCCESSED });
  } catch (err) {
    yield put({ type: types.ACCOUNT_SIGNOUT_FAILED });
  }
}

function * fetchAccount() {
  try {
    const response = yield call(Api.account.fetch);
    yield put({ type: types.ACCOUNT_FETCH_SUCCESSED, payload: response.data});
  } catch (err) {
    yield put({ type: types.ACCOUNT_FETCH_FAILED, response: err.response });
  }
}

export function * signupSaga() {
  yield takeLatest(types.ACCOUNT_SIGNUP_REQUESTED, signup);
}

export function* signinSaga() {
  yield takeLatest(types.ACCOUNT_SIGNIN_REQUESTED, signin)
}

export function* signoutSaga() {
  yield takeLatest(types.ACCOUNT_SIGNOUT_REQUESTED, signout)
}

export function* fetchAccountSaga() {
  yield takeLatest(types.ACCOUNT_FETCH_REQUESTED, fetchAccount)
}
