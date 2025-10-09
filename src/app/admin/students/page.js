"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import StudentsTable from "../../../components/StudentsTable";
import { apiUrl } from "../../../lib/api";
import {
  setStudents,
  updateStudent,
  deleteStudent,
  setSearchTerm,
  toggleSort,
  setCurrentPage,
} from "../../../redux/slices/StudentSlices";

export default function StudentsPage() {
  const dispatch = useDispatch();
  const {
    students,
    loading,
    searchTerm,
    sortAsc,
    currentPage,
    studentsPerPage,
  } = useSelector((state) => state.students);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch(apiUrl("/api/students/student"));
        if (!res.ok) throw new Error("Failed to fetch students");
        const data = await res.json();

        const dataWithIds = data.map((s, index) => ({
          ...s,
          id: s.id || index + 1,
        }));

        dispatch(setStudents(dataWithIds));
      } catch (err) {
        console.error("Error fetching students:", err);
      }
    };

    fetchStudents();
  }, [dispatch]);


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

  const goPrev = () =>
    currentPage > 1 && dispatch(setCurrentPage(currentPage - 1));
  const goNext = () =>
    currentPage < totalPages && dispatch(setCurrentPage(currentPage + 1));

  const getPageNumbers = () => {
    const pages = [];
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + 4);
    if (end - start + 1 < 5) start = Math.max(1, end - 4);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  if (loading) return <p>Loading students...</p>;

  return (
    <StudentsTable
      students={currentStudents}
      onUpdate={(id, data) => dispatch(updateStudent({ id, data }))}
      onDelete={(id) => dispatch(deleteStudent(id))}
      searchTerm={searchTerm}
      setSearchTerm={(term) => dispatch(setSearchTerm(term))}
      toggleSort={() => dispatch(toggleSort())}
      currentPage={currentPage}
      totalPages={totalPages}
      goPrev={goPrev}
      goNext={goNext}
      getPageNumbers={getPageNumbers}
      setCurrentPage={(num) => dispatch(setCurrentPage(num))}
    />
  );
}


