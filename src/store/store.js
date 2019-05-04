import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import userReducer from "../reducers/userReducer";
import {initialState} from "./initialState";

const rootReducer = combineReducers({
  users: userReducer
});

const middlewares = applyMiddleware(thunk);

// Just For Redux Dev Tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(middlewares)
);

export default store;
