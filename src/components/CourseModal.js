"use client";

import { useState, useEffect } from "react";
import styles from "../styles/CourseModal.module.scss";

export default function CourseModal({ isOpen, onClose, onSave, course }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (course) {
      setName(course.name || "");
      setDescription(course.description || "");
    } else {
      setName("");
      setDescription("");
    }
  }, [course]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description) return alert("Both fields are required!");
    onSave({ id: course?.id || course?._id, name, description });
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>{course ? "Edit Course" : "Create Course"}</h2>
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
          <button onClick={handleSubmit}>{course ? "Update" : "Submit"}</button>
          <button onClick={onClose} className={styles.cancelBtn}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
