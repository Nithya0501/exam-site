"use client";
import React, { useEffect, useState } from "react";
import styles from "../styles/SubjectSection.module.scss";

const levels = ["Beginner", "Intermediate", "Advanced"];

const SubjectForm = ({ onSave, editSubject, onCancel }) => {
    const [form, setForm] = useState({
        name: "",
        author: "",
        students: "",
        duration: "",
        level: "Beginner",
        image: "",
    });

    useEffect(() => {
        if (editSubject) setForm(editSubject);
    }, [editSubject]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(form);
        onCancel();
        setForm({
            name: "",
            author: "",
            students: "",
            duration: "",
            level: "Beginner",
            image: "",
        });
    };
    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
            <input name="author" placeholder="Author" value={form.author} onChange={handleChange} required />
            <input name="students" placeholder="Students" type="number" value={form.students} onChange={handleChange} />
            <input name="duration" placeholder="Duration (weeks)" type="number" value={form.duration} onChange={handleChange} />
            <select name="level" value={form.level} onChange={handleChange}>
                {levels.map((lvl) => (<option key={lvl}>{lvl}</option>))}
            </select>
            <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />
            <div className={styles.formbuttons}>
                <button type="submit" className={styles.submitBtn}>{editSubject ? "Update" : "Submit"} </button>
                <button type="button" className={styles.cancelBtn} onClick={() => onCancel()}>Cancel</button>
            </div>
        </form>
    );
};

export default SubjectForm;
