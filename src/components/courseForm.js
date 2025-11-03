"use client";
import React, { useState, useEffect } from "react";
import styles from "../styles/Course.module.scss";
const levels = ["Beginner", "Intermediate", "Advanced"];

const CourseForm = ({ onSave, editingCourse, onCancel }) => {
  const [form, setForm] = useState({
    title: "",
    author: "",
    students: "",
    duration: "",
    level: "Beginner",
    image: "",
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);


  useEffect(() => {
    if (editingCourse) {
      setForm({
        title: editingCourse.title || "",
        author: editingCourse.author || "",
        students: editingCourse.students || "",
        duration: editingCourse.duration || "",
        level: editingCourse.level || "Beginner",
        image: editingCourse.image || "",
      });
      if (editingCourse.image) setPreview(editingCourse.image);
    } else {

      setForm({
        title: "",
        author: "",
        students: "",
        duration: "",
        level: "Beginner",
        image: "",
      });
      setPreview(null);
    }
  }, [editingCourse]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave({ ...form, image: file || form.image });
    onCancel();
    setForm({
      title: "",
      author: "",
      students: "",
      duration: "",
      level: "Beginner",
      image: "",
    });
    setFile(null);
    setPreview(null);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
      <input name="author" placeholder="Author" value={form.author} onChange={handleChange} required />
      <input name="students" placeholder="Students" type="number" value={form.students} onChange={handleChange} />
      <input name="duration" placeholder="Duration (weeks)" type="number" value={form.duration} onChange={handleChange} />
      <select name="level" value={form.level} onChange={handleChange}>
        {levels.map((lvl) => <option key={lvl}>{lvl}</option>)}
      </select>
      <input type="file" accept="image/*" onChange={handleFileChange} className={styles.imageChoose} />
      {preview && (
        <img src={preview} alt="Preview" className={styles.imagePreview} />
      )}
      <div className={styles.formbuttons}>
        <button type="submit" className={styles.submitBtn}>{editingCourse ? "Update" : "Submit"}</button>
        <button type="button" className={styles.cancelBtn} onClick={() => onCancel()}>Cancel</button>
      </div>
    </form>
  );
};
export default CourseForm;
