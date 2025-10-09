"use client";

import { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaSearch } from "react-icons/fa";
import styles from "../styles/Course.module.scss";

export default function CourseSection({
  initialCourses = [],
  onSaveCourse,
  onDeleteCourse,
}) {
  const [courses, setCourses] = useState(initialCourses);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [filter, setFilter] = useState("");

 
  useEffect(() => {
    setCourses(initialCourses);
  }, [initialCourses]);

  const openModal = (course = null) => {
    setSelectedCourse(course);
    setName(course?.name || "");
    setDescription(course?.description || "");
    setIsModalOpen(true);
  };


  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
    setName("");
    setDescription("");
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description) return alert("Both fields are required!");

    const updatedCourse = {
      id: selectedCourse?.id || selectedCourse?._id,
      name,
      description,
    };


    if (selectedCourse) {
      setCourses((prev) =>
        prev.map((c) =>
          c._id === updatedCourse.id || c.id === updatedCourse.id
            ? updatedCourse
            : c
        )
      );
    } else {
      setCourses((prev) => [
        ...prev,
        { ...updatedCourse, _id: Date.now().toString() },
      ]);
    }

    onSaveCourse?.(updatedCourse);
    closeModal();
  };


  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      setCourses((prev) =>
        prev.filter((c) => c._id !== id && c.id !== id)
      );
      onDeleteCourse?.(id);
    }
  };

 
  const filteredCourses = courses.filter(
    (c) =>
      c.name?.toLowerCase().includes(filter.toLowerCase()) ||
      c.description?.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={styles.courseModule}>
      <h1>Courses</h1>

      <div className={styles.filterSection}>
        <div className={styles.filterWrapper}>
          <FaSearch className={styles.filterIcon} />
          <input
            type="text"
            placeholder="Search courses..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>

        <button className={styles.createBtn} onClick={() => openModal()}>
          Add Course
        </button>
      </div>

     
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>{selectedCourse ? "Edit Course" : "Create Course"}</h2>

            <input
              type="text"
              placeholder="Course Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <textarea
              placeholder="Course Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className={styles.modalActions}>
              <button onClick={handleSubmit}>
                {selectedCourse ? "Update" : "Submit"}
              </button>
              <button onClick={closeModal} className={styles.cancelBtn}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <table className={styles.coursesTable}>
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Course Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredCourses.length > 0 ? (
            filteredCourses.map((c) => (
              <tr key={c._id || c.id}>
                <td>{c.name}</td>
                <td>{c.description}</td>
                <td className={styles.actionCell}>
                  <button
                    className={styles.editBtn}
                    onClick={() => openModal(c)}
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDelete(c._id || c.id)}
                  >
                    <FaTrash size={18} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} style={{ textAlign: "center", padding: "10px" }}>
                No courses found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}


