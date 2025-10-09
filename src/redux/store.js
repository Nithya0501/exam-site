import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "../redux/slices/StudentSlices";
import coursesReducer from "../redux/slices/CourseSlices";

export const store = configureStore({
  reducer: {
    students: studentReducer,
    courses: coursesReducer,
  },
});
