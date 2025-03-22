import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import studentReducer from "./auth/studentSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  student: studentReducer,
  // Add other reducers here as you implement them
});

export default rootReducer;
