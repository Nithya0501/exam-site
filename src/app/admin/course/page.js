"use client";

import { useState, useEffect } from "react";
import CourseModal from "../../../components/CourseModal";
import CourseTable from "../../../components/CourseTable";
import styles from "../../../styles/Course.module.scss";
import { FaSearch } from "react-icons/fa";
import { apiUrl } from "../../../lib/api";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (token) {
      fetchCourses();
    }
  }, [token]);

  const fetchCourses = async () => {
    try {
      const res = await fetch(apiUrl("/api/courses"));
      const data = await res.json();
      setCourses(data);
    } catch (err) {
      console.error("Failed to fetch courses:", err);
    }
  };

  const handleSaveCourse = async (course) => {
    if (!token) {
      alert("Authentication token is missing.");
      return;
    }

    try {
      let res, data;

      if (editingCourse) {
        res = await fetch(apiUrl(`/api/courses/${course.id}`), {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name: course.name, description: course.description }),
        });
      } else {
        res = await fetch(apiUrl("/api/courses"), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name: course.name, description: course.description }),
        });
      }

      data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save course");

      setIsModalOpen(false);
      setEditingCourse(null);
      fetchCourses();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!token) {
      alert("Authentication token is missing.");
      return;
    }

    if (!confirm("Are you sure you want to delete this course?")) return;
    try {
      const res = await fetch(apiUrl(`/api/courses/${id}`), {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete course");
      fetchCourses();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className={styles.coursePage}>
      <h1>Courses</h1>

      <div className={styles.controls}>
        <div className={styles.filterWrapper}>
          <FaSearch className={styles.filterIcon} />
          <input
            type="text"
            placeholder="Filter courses..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <button onClick={() => setIsModalOpen(true)}>Create Course</button>
      </div>

      <CourseModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCourse(null);
        }}
        onSave={handleSaveCourse}
        course={editingCourse}
      />

      <CourseTable
        courses={courses.filter(
          (c) =>
            c.name.toLowerCase().includes(filter.toLowerCase()) ||
            c.description.toLowerCase().includes(filter.toLowerCase())
        )}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}


