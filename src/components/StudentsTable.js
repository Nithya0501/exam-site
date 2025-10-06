"use client";

import React, { useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaSave,
  FaTimes,
  FaFilter,
  FaSearch,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";
import styles from "../styles/StudentsTable.module.scss";

export default function StudentsTable({ students, onUpdate, onDelete }) {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: "", email: "", phone: "" });
  const [sortAsc, setSortAsc] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const studentsPerPage = 5;
  const pageNumberLimit = 5; 

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

  const totalPages = Math.ceil(sorted.length / studentsPerPage);
  const indexOfLast = currentPage * studentsPerPage;
  const indexOfFirst = indexOfLast - studentsPerPage;
  const currentStudents = sorted.slice(indexOfFirst, indexOfLast);

  const goPrev = () => currentPage > 1 && setCurrentPage((prev) => prev - 1);
  const goNext = () => currentPage < totalPages && setCurrentPage((prev) => prev + 1);


  const getPageNumbers = () => {
    const pages = [];
    let start = Math.max(1, currentPage - Math.floor(pageNumberLimit / 2));
    let end = Math.min(totalPages, start + pageNumberLimit - 1);

    if (end - start + 1 < pageNumberLimit) {
      start = Math.max(1, end - pageNumberLimit + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className={styles.tableContainer}>
  
      <div className={styles.topControls}>
        <div className={styles.rightControls}>
          <div className={styles.searchBox}>
            <FaSearch className={styles.searchIcon} />
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <button type="button" className={styles.filterButton} onClick={toggleSort}>
            <FaFilter />
          </button>
        </div>
      </div>

  
      <table className={styles.studentsTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentStudents.map((student) => (
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
                    <button type="button" className={styles.saveBtn} onClick={() => saveEdit(student.id)}>
                      <FaSave />
                    </button>
                    <button type="button" className={styles.cancelBtn} onClick={cancelEdit}>
                      <FaTimes />
                    </button>
                  </>
                ) : (
                  <>
                    <button type="button" className={styles.editBtn} onClick={() => startEdit(student)}>
                      <FaEdit />
                    </button>
                    <button type="button" className={styles.deleteBtn} onClick={() => onDelete(student.id)}>
                      <FaTrash />
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
          {currentStudents.length === 0 && (
            <tr>
              <td colSpan={4} style={{ textAlign: "center", padding: "1rem" }}>
                No students found
              </td>
            </tr>
          )}
        </tbody>
      </table>

     
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button type="button" onClick={goPrev} disabled={currentPage === 1}>
            <FaAngleLeft />
          </button>

          {getPageNumbers().map((num) => (
            <button
              key={num}
              type="button"
              className={currentPage === num ? styles.activePage : ""}
              onClick={() => setCurrentPage(num)}
            >
              {num}
            </button>
          ))}

          {totalPages > getPageNumbers().slice(-1)[0] && <span>...</span>}

          <button type="button" onClick={goNext} disabled={currentPage === totalPages}>
            <FaAngleRight />
          </button>
        </div>
      )}
    </div>
  );
}
