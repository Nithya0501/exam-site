"use client";
import { useState } from "react";
import StudentsTable from "../../../components/StudentsTable";
import styles from "../../../styles/Students.module.scss";

export default function StudentsPage() {
  const [students, setStudents] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", phone: "1234567890" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "9876543210" },
    { id: 3, name: "Michael Johnson", email: "michael@example.com", phone: "4567891230" },
  ]);

  const handleEdit = (student) => {
    alert(`Edit ${student.name}`);
    // Implement modal or navigate to edit page
  };

  const handleDelete = (student) => {
    if (confirm(`Are you sure you want to delete ${student.name}?`)) {
      setStudents(students.filter((s) => s.id !== student.id));
    }
  };

  return (
    <div className={styles.studentsPage}>
      <h1>Students</h1>
      <StudentsTable students={students} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}
