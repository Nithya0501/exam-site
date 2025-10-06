"use client";

import styles from "../styles/CourseTable.module.scss";
import { FaTrash, FaEdit } from "react-icons/fa";

export default function CourseTable({ courses, onEdit, onDelete }) {
  return (
    <table className={styles.coursesTable}>
      <thead>
        <tr>
          <th>Course Name</th>
          <th>Course Description</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {courses.length > 0 ? (
          courses.map((c) => (
            <tr key={c._id || c.id}>
              <td>{c.name}</td>
              <td>{c.description}</td>
              <td className={styles.actionCell}>
                <button className={styles.editBtn} onClick={() => onEdit(c)}>
                  <FaEdit size={18} />
                </button>
                <button className={styles.deleteBtn} onClick={() => onDelete(c._id || c.id)}>
                  <FaTrash size={18} />
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={3} style={{ textAlign: "center", padding: "10px" }}>
              No courses found. Add one above.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}


