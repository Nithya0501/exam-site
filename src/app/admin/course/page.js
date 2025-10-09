"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CourseSection from "../../../components/CourseSection";
import styles from "../../../styles/Course.module.scss";
import {
  fetchCourses,
  saveCourse,
  deleteCourse,
} from "../../../redux/slices/CourseSlices";

export default function CoursesPage() {
  const dispatch = useDispatch();
  const { items: courses, loading, error } = useSelector(
    (state) => state.courses
  );
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (token) dispatch(fetchCourses(token));
  }, [token, dispatch]);

  const handleSaveCourse = (course) => {
    dispatch(saveCourse({ token, course }));
  };

  const handleDeleteCourse = (id) => {
    dispatch(deleteCourse({ token, id }));
  };

  return (
    <div className={styles.coursePage}>
      {loading && <p>Loading courses...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <CourseSection
        initialCourses={courses}
        onSaveCourse={handleSaveCourse}
        onDeleteCourse={handleDeleteCourse}
      />
    </div>
  );
}





