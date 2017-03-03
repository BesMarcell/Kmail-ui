import axios from 'axios';
import config from './../config';

const fullUrl = `${config.api.host}${config.api.prefix}`;

function signin(payload) {
  const url = `${fullUrl}/auth/signin`;
  return axios.post(url, {
    email: payload.email,
    password: payload.password
  },{
    withCredentials: true
  })
}

function signup(payload) {
  const url = `${fullUrl}/auth/signup`;
  return axios.post(url, payload, {
    withCredentials: true
  });
}

function signout() {
  const url = `${fullUrl}/auth/logout`;
  return axios.get(url, {withCredentials: true})
}

function fetch() {
  const url = `${fullUrl}/auth`;
  return axios.get(url, {withCredentials: true})
}

const account = {
  signin,
  signup,
  signout,
  fetch
};

export default account;
