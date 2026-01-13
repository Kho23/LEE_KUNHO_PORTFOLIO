import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/auth/authSlice"
export default configureStore({
  reducer: {
    auth:authReducer,
  },
});
