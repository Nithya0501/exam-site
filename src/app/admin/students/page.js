"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import StudentsTable from "../../../components/StudentsTable";
import {
  fetchStudents,
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
    error,
    searchTerm,
    sortAsc,
    currentPage,
    studentsPerPage,
  } = useSelector((state) => state.students);

  useEffect(() => {
    dispatch(fetchStudents());
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
    const pageNumberLimit = 5;
    let start = Math.max(1, currentPage - Math.floor(pageNumberLimit / 2));
    let end = Math.min(totalPages, start + pageNumberLimit - 1);

    if (end - start + 1 < pageNumberLimit) {
      start = Math.max(1, end - pageNumberLimit + 1);
    }

    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  if (loading) return <p>Loading students...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <StudentsTable
        students={currentStudents}
        onUpdate={(id, updatedData) =>
          dispatch(updateStudent({ id, updatedData }))
        }
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
    </div>
  );
}


