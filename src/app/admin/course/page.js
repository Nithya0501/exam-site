"use client";

import { useState } from "react";
import CourseModal from "../../../components/CourseModal";
import CourseTable from "../../../components/CourseTable";
import styles from "../../../styles/Course.module.scss";
import { FaSearch } from "react-icons/fa";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  const handleSaveCourse = (course) => {
    if (editingCourse) {
      setCourses((prev) =>
        prev.map((c) => (c.id === editingCourse.id ? { ...c, ...course } : c))
      );
      setEditingCourse(null);
    } else {
    
      setCourses([...courses, { id: Date.now(), ...course }]);
    }
    setIsModalOpen(false);
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this course?")) {
      setCourses(courses.filter((c) => c.id !== id));
      if (editingCourse?.id === id) setEditingCourse(null);
    }
  };

  return (
    <div className={styles.coursePage}>
      <h1>Course</h1>

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


