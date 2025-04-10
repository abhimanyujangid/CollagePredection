import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import studentReducer from "./auth/studentSlice";
import collegeAdminReducer from "./auth/collegeAdminSlice";
import collegeReducer from "./auth/collegeSlice";
import collegeInfoReducer from "./auth/collegeInfo";

const rootReducer = combineReducers({
  auth: authReducer,
  student: studentReducer,
  collegeAdmin: collegeAdminReducer,
  college: collegeReducer,
  collegeInfo: collegeInfoReducer,
  // Add other reducers here as you implement them
});

export default rootReducer;
