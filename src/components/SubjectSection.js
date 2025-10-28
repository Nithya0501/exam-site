"use client";

import { useState, useEffect } from "react";
import SubjectForm from "./SubjectForm";
import { FaTrash, FaEdit, FaSearch, FaUsers } from "react-icons/fa";
import styles from "../styles/SubjectSection.module.scss";

export default function SubjectSection({
  initialSubjects = [],
  onSaveSubject,
  onDeleteSubject,
}) {
  const [subjects, setSubjects] = useState(initialSubjects || []);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    setSubjects(initialSubjects || []);
  }, [initialSubjects]);

  const openModal = () => {
    setEditingSubject(null);
    setIsFormOpen(true);
  };

  const handleEdit = (subject) => {
    setEditingSubject(subject);
    setIsFormOpen(true);
  };

  const handleCancel = () => {
    setEditingSubject(null);
    setIsFormOpen(false);
  };

  const handleSave = async (subject) => {
    if (editingSubject) {
      const updated = await onSaveSubject(subject, editingSubject);
      setSubjects((prev) =>
        prev.map((s) => (s._id === updated._id || s.id === updated.id ? updated : s))
      );
    } else {
      const saved = await onSaveSubject(subject);
      setSubjects((prev) => [...prev, saved]);
    }

    setIsFormOpen(false);
    setEditingSubject(null);
  };

  const handleDelete = async (subject) => {
    const confirmed = window.confirm("Are you sure you want to delete this subject?");
    if (!confirmed) return;

    await onDeleteSubject(subject._id || subject.id);
    setSubjects((prev) => prev.filter((s) => s._id !== (subject._id || subject.id)));
  };

  const colorMap = {
    Beginner: "beginner",
    Intermediate: "intermediate",
    Advanced: "advanced",
  };

  const filteredSubjects = subjects
    .filter((s) => s && s.name)
    .filter((s) => s.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className={styles.subjectModule}>
      <div className={styles.subjectHeading}>
        <div>
          <h1>Subjects Management</h1>
          <p>View, add, and organize all available subjects.</p>
        </div>
        <div>
          <button className={styles.createBtn} onClick={openModal}>
            + Add Subject
          </button>
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterWrapper}>
          <FaSearch className={styles.filterIcon} />
          <input
            type="text"
            placeholder="Search subjects..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.cardsContainer}>
        {filteredSubjects.length > 0 ? (
          Array.from(
            new Map(filteredSubjects.map((s) => [s._id || s.id, s])).values()
          ).map((subject) => (
            <div key={subject._id || subject.id} className={styles.subjectCard}>
              {subject.image && <img src={subject.image} alt={subject.name} />}
              <h3>{subject.name}</h3>
              <p>{subject.author}</p>
              <div className={styles.subjectStudent}>
                <p>
                  <FaUsers /> {subject.students} Students
                </p>
                <p
                  className={`${styles.subjectLevel} ${styles[colorMap[subject.level]]}`}
                >
                  {subject.level}
                </p>
              </div>
              <div className={styles.subjectUpdate}>
                <div>
                  <p>{subject.duration} weeks</p>
                </div>
                <div className={styles.cardActions}>
                  <button onClick={() => handleEdit(subject)}>
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(subject)}>
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No subjects found.</p>
        )}
      </div>

      {isFormOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard}>
            <SubjectForm
              onSave={handleSave}
              editSubject={editingSubject}
              onCancel={handleCancel}
            />
          </div>
        </div>
      )}
    </div>
  );
}



