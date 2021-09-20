import { APIUrls } from '../helpers/url';
import {
  AUTHENTICATE_USER,
  CLEAR_AUTH_STATE,
  EDIT_USER_FAILED,
  EDIT_USER_SUCCESSFULL,
  LOGIN_FAILED,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOG_OUT,
  SIGNUP_FAILED,
  SIGNUP_START,
  SIGNUP_SUCCESS,
} from './actionTypes';
import { getauthTokenFromLocalStorage, getFormBody } from '../helpers/utils';

export function startLogin() {
  return {
    type: LOGIN_START,
  };
}

export function loginFailed(errorMessage) {
  return {
    type: LOGIN_FAILED,
    error: errorMessage,
  };
}

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user: user,
  };
}

export function login(email, password) {
  return (dispatch) => {
    dispatch(startLogin());
    const url = APIUrls.login();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: getFormBody({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data', data);
        if (data.success) {
          localStorage.setItem('token', data.data.token);
          // dispatch action to save user
          dispatch(loginSuccess(data.data.user));
          return;
        }
        dispatch(loginFailed(data.message));
      });
  };
}

export function startSignup() {
  return {
    type: SIGNUP_START,
  };
}

export function signupSuccess(user) {
  return {
    type: SIGNUP_SUCCESS,
    user: user,
  };
}

export function signupFailed(errorMessage) {
  return {
    type: SIGNUP_FAILED,
    error: errorMessage,
  };
}

export function signup(name, email, password, confirmPassword) {
  return (dispatch) => {
    const url = APIUrls.signup();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: {
        email,
        password,
        confirmPassword,
        name,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem('token', data.data.token);
          dispatch(signupSuccess(data.data.user));
          return;
        }
        dispatch(signupFailed(data.message));
      });
  };
}

export function authenticateUser(user) {
  return {
    type: AUTHENTICATE_USER,
    user,
  };
}

export function logOutUser() {
  return {
    type: LOG_OUT,
  };
}

export function clearAuthState() {
  return {
    type: CLEAR_AUTH_STATE,
  };
}

export function editUserSuccessfully(user) {
  return {
    type: EDIT_USER_SUCCESSFULL,
    user,
  };
}

export function editUserFailed(error) {
  return {
    type: EDIT_USER_FAILED,
    error,
  };
}

export function editUser(name, password, confirmPassword, userId) {
  return (dispatch) => {
    const url = APIUrls.editProfile();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getauthTokenFromLocalStorage()}`,
      },
      body: getFormBody({
        name,
        password,
        confirm_Password: confirmPassword,
        id: userId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data', data);
        if (data.success) {
          dispatch(editUserSuccessfully(data.data.user));
          if (data.data.token) {
            localStorage.setItem('token', data.data.token);
          }
          return;
        }

        dispatch(editUserFailed(data.message));
      });
  };
}
