import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import studentReducer from "./auth/studentSlice";
import collegeAdminReducer from "./auth/collegeAdminSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  student: studentReducer,
  collegeAdmin: collegeAdminReducer,
  // Add other reducers here as you implement them
});

export default rootReducer;
