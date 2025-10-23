"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CourseSection from "../../../components/CourseSection";
import styles from "../../../styles/Course.module.scss";
import {
  setCourses,
  addCourse,
  updateCourse,
  deleteCourse as deleteCourseAction,
  setError,
} from "../../../redux/slices/CourseSlices";
import { apiUrl } from "../../../lib/api";

export default function CoursesPage() {
  const dispatch = useDispatch();
  const { courses, error } = useSelector((state) => state.courses);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      if (!token) return;
      setLoading(true);
      try {
        const res = await fetch(apiUrl("/api/courses"), {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch courses");
        dispatch(setCourses(data));
      } catch (err) {
        dispatch(setError(err.message));
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [token, dispatch]);

  
  const handleSaveCourse = async (courseData) => {
    try {
      const isEditing = !!courseData._id;
      const endpoint = isEditing
        ? `/api/courses/${courseData._id}`
        : "/api/courses";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(apiUrl(endpoint), {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(courseData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save course");

      
      if (isEditing) {
        dispatch(updateCourse(data));
      } else {
        dispatch(addCourse(data));
      }

      return data;
    } catch (err) {
      dispatch(setError(err.message));
      return null;
    }
  };

  const handleDeleteCourse = async (id) => {
    try {
      const res = await fetch(apiUrl(`/api/courses/${id}`), {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete course");

      dispatch(deleteCourseAction(id));
    } catch (err) {
      dispatch(setError(err.message));
    }
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








