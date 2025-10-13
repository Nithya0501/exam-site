import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "../redux/slices/StudentSlices";
import coursesReducer from "../redux/slices/CourseSlices";
import subjectsReducer from "../redux/slices/SubjectSlices";
 
export const store = configureStore({
  reducer: {
    students: studentReducer,
    courses: coursesReducer,
    subjects: subjectsReducer
  },
});