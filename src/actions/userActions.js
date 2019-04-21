import * as ACTIONS from "./actionTypes";
const axios = require("axios");

export const localSignup = (credentials) => async dispatch => {
  try {
    console.log("User action=localsignup");
    const response = await axios.post("http://localhost:8080/api/users/signup",credentials,{withCredentials:true});
    console.log("Done with response");
    console.log(response);
    if (response.status === 200) {
      console.log("Here is the 200 status");
      successLogin(dispatch, response);
    } else {
      failedLogin(dispatch);
    }
  } catch (err) {
    errorLogin(dispatch);
  }
};

export function successLogin(dispatch, response) {
  dispatch({
    type: ACTIONS.LOGIN_SUCCESS,
    payload: response
  });
}

export function failedLogin(dispatch) {
  dispatch({
    type: ACTIONS.LOGIN_FAILURE
  });
}

export function errorLogin(dispatch) {
  dispatch({
    type: ACTIONS.LOGIN_ERROR
  });
}
