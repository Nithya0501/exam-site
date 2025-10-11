"use client";

import { useState } from "react";
import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import styles from "../styles/SubjectSection.module.scss";

export default function SubjectsSection({ subjects, onSave, onDelete }) {
  const [filter, setFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "" });

  const filteredSubjects = subjects.filter(
    (s) =>
      s.name?.toLowerCase().includes(filter.toLowerCase()) ||
      s.description?.toLowerCase().includes(filter.toLowerCase())
  );

  const openModal = (subject = null) => {
    setEditingSubject(subject);
    setFormData({
      name: subject?.name || "",
      description: subject?.description || "",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.description) return alert("Both fields are required!");
    onSave({ id: editingSubject?._id || editingSubject?.id, ...formData }, editingSubject);
    setIsModalOpen(false);
    setEditingSubject(null);
    setFormData({ name: "", description: "" });
  };

  return (
    <div className={styles.subjectPage}>
      <h1>Subjects</h1>

      <div className={styles.controls}>
        <div className={styles.filterWrapper}>
          <FaSearch className={styles.filterIcon} />
          <input
            type="text"
            placeholder="Filter subjects..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <div>
          <button onClick={() => openModal()}>Create Subject</button>
        </div>
      </div>

      <table className={styles.subjectTable}>
        <thead>
          <tr>
            <th>Subject Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredSubjects.length > 0 ? (
            filteredSubjects.map((s,index) => (
                <tr key={`${s._id || s.id}-${index}`}>
                <td>{s.name}</td>
                <td>{s.description}</td>
                <td className={styles.actionCell}>
                  <button className={styles.editBtn} onClick={() => openModal(s)}><FaEdit /></button>
                  <button className={styles.deleteBtn} onClick={() => onDelete(s._id || s.id)}><FaTrash /></button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} style={{ textAlign: "center", padding: "12px" }}>
                No subjects found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContainer}>
            <h2>{editingSubject ? "Edit Subject" : "Create Subject"}</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.subjectModel}>
                <input type="text" placeholder="Subject Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />


                <input type="text" placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
              </div>
              <div className={styles.modalActions}>
                <button type="submit">{editingSubject ? "Update" : "Submit"}</button>
                <button type="button" className={styles.cancelBtn} onClick={() => setIsModalOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}