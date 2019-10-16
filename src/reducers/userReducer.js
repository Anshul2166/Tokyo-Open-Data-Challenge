//reducer for all actions
import * as ACTIONS from "../actions/actionTypes";

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        users: action.payload
      };
    case ACTIONS.LOGIN_FAILURE:
      return {
        ...state,
        users: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
