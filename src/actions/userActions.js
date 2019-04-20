import * as ACTIONS from "./actionTypes";
const axios = require("axios");

export async function facebookLogin() {
  try {
    const response = await axios.get("/api/users/auth/facebook");
    if (response.data.status === 200) {
      successLogin(response);
    } else {
      failedLogin();
    }
  } catch (err) {
    errorLogin();
  }
}

export function successLogin(response){
  return{
    type:ACTIONS.LOGIN_SUCCESS,
    payload:response
  }
}

export function failedLogin(){
  return{
    type:ACTIONS.LOGIN_FAILURE
  }
}

export function errorLogin(){
  return{
    type:ACTIONS.LOGIN_ERROR
  }
}
