import * as ACTIONS from "./actionTypes";
import { toast } from "react-toastify";
const axios = require("axios");

export const localSignup = (
  credentials,
  redirectOnSuccess
) => async dispatch => {
  try {
    console.log("User action=localsignup");
    const response = await axios.post(
      "http://localhost:8080/api/users/signup",
      credentials,
      { withCredentials: true }
    );
    console.log("Done with response");
    console.log(response);
    if (response.status === 200) {
      console.log("Here is the 200 status");
      successLogin(dispatch, response, redirectOnSuccess);
    } else {
      failedLogin(dispatch, response);
    }
  } catch (err) {
    errorLogin(dispatch);
  }
};

export const localLogin = (
  credentials,
  redirectOnSuccess
) => async dispatch => {
  try {
    console.log("User action=locallogin");
    const response = await axios.post(
      "http://localhost:8080/api/users/login",
      credentials,
      { withCredentials: true }
    );
    console.log("Done with response");
    console.log(response);
    if (response.status === 200) {
      console.log("Here is the 200 status");
      toast.success("Successfully logged in");
      successLogin(dispatch, response, redirectOnSuccess);
    } else {
      failedLogin(dispatch, response);
    }
  } catch (err) {
    errorLogin(dispatch);
  }
};

export function successLogin(dispatch, response, redirectOnSuccess) {
 
  dispatch({
    type: ACTIONS.LOGIN_SUCCESS,
    payload: response
  });
  // redirectOnSuccess();
}

export function failedLogin(dispatch, response) {
  dispatch({
    type: ACTIONS.LOGIN_FAILURE,
    payload: response
  });
  toast.error(response);
}

export function errorLogin(dispatch) {
  dispatch({
    type: ACTIONS.LOGIN_ERROR
  });
  toast.error("Request response failed");
}
