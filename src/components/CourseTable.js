"use client";

import styles from "../styles/CourseTable.module.scss";
import { FaTrash, FaEdit } from "react-icons/fa";

export default function CourseTable({ courses, filter, onDelete, onEdit }) {
  const filteredCourses = (courses || []).filter((c) =>
    c.name?.toLowerCase().includes((filter || "").toLowerCase())
  );

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
        {filteredCourses.length > 0 ? (
          filteredCourses.map((c, index) => (
            <tr key={c.id || index}>
              <td>{c.name}</td>
              <td>{c.description}</td>
              <td className={styles.actionCell}>
                <button
                  className={styles.editBtn}
                  onClick={() => onEdit?.(c)}
                  title="Edit Course"
                >
                  <FaEdit size={18} />
                </button>
                <button
                  className={styles.deleteBtn}
                  onClick={() => onDelete(c.id)}
                  title="Delete Course"
                >
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


