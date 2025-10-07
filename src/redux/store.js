import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "../redux/slices/StudentSlices";

export const store = configureStore({
  reducer: {
    students: studentReducer,
  },
});
