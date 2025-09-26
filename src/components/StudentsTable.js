"use client";
import { FaEdit, FaTrash } from "react-icons/fa";
import styles from "../styles/Students.module.scss";

export default function StudentsTable({ students, onEdit, onDelete }) {
  return (
    <table className={styles.studentsTable}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student.id}>
            <td>{student.name}</td>
            <td>{student.email}</td>
            <td>{student.phone}</td>
            <td>
              <button className="edit" onClick={() => onEdit(student)}>
                <FaEdit />
              </button>
              <button className="delete" onClick={() => onDelete(student)}>
                <FaTrash />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
