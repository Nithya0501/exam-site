"use client";

import React, { useState } from "react";
import { FaEdit, FaTrash, FaSave, FaTimes, FaFilter } from "react-icons/fa";
import styles from "../styles/StudentsTable.module.scss";

export default function StudentsTable({ students, onUpdate, onDelete }) {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: "", email: "", phone: "" });
  const [sortAsc, setSortAsc] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); 

  const startEdit = (student) => {
    setEditingId(student.id);
    setEditData({
      name: student.name,
      email: student.email,
      phone: student.phone,
    });
  };

  const cancelEdit = () => setEditingId(null);

  const handleChange = (e) =>
    setEditData({ ...editData, [e.target.name]: e.target.value });

  const saveEdit = (id) => {
    onUpdate(id, editData);
    setEditingId(null);
  };

  const toggleSort = () => setSortAsc(!sortAsc);

 
  const filtered = students.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const sorted = [...filtered].sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) return sortAsc ? -1 : 1;
    if (a.name.toLowerCase() > b.name.toLowerCase()) return sortAsc ? 1 : -1;
    return 0;
  });

  return (
    <div className={styles.tableContainer}>
      <table className={styles.studentsTable}>
        <thead>
          <tr>
            <th className={styles.nameColumn}>
              <div className={styles.nameHeader}>
                <span>Name</span>
                <FaFilter
                  className={styles.filterIcon}
                  title="Sort A-Z / Z-A"
                  onClick={toggleSort}
                />
                
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Search name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              </div>
           
            </th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((student) => (
            <tr key={student.id}>
              <td>
                {editingId === student.id ? (
                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleChange}
                  />
                ) : (
                  student.name
                )}
              </td>
              <td>
                {editingId === student.id ? (
                  <input
                    type="email"
                    name="email"
                    value={editData.email}
                    onChange={handleChange}
                  />
                ) : (
                  student.email
                )}
              </td>
              <td>
                {editingId === student.id ? (
                  <input
                    type="text"
                    name="phone"
                    value={editData.phone}
                    onChange={handleChange}
                  />
                ) : (
                  student.phone
                )}
              </td>
              <td className={styles.actions}>
                {editingId === student.id ? (
                  <>
                    <button
                      className={styles.saveBtn}
                      onClick={() => saveEdit(student.id)}
                    >
                      <FaSave />
                    </button>
                    <button className={styles.cancelBtn} onClick={cancelEdit}>
                      <FaTimes />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className={styles.editBtn}
                      onClick={() => startEdit(student)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => onDelete(student.id)}
                    >
                      <FaTrash />
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
          {sorted.length === 0 && (
            <tr>
              <td colSpan={4} style={{ textAlign: "center", padding: "1rem" }}>
                No students found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
