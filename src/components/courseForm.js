"use client";
import React, { useState, useEffect } from "react";
import styles from "../styles/Course.module.scss";
const levels = ["Beginner", "Intermediate", "Advanced"];

const CourseForm = ({ onSave, editingCourse,onCancel }) => {
    const [form, setForm] = useState({
        title: "",
        author: "",
        students: "",
        duration: "",
        level: "Beginner",
        image: "",
    });

    useEffect(() => {
        if (editingCourse) setForm(editingCourse);
    }, [editingCourse]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(form);
        onCancel()
        setForm({ title: "", author: "", students: "", duration: "", level: "Beginner", image: "" });
        
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
            <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />
            <div className={styles.formbuttons}>
                <button type="submit" className={styles.submitBtn}>{editingCourse ? "Update" : "Submit"}</button>
                <button type="button" className={styles.cancelBtn} onClick={() => onCancel()}>Cancel</button>
            </div>
    </form>
    );
};
export default CourseForm;
