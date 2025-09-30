'use client';
import React, { useState, useEffect } from 'react';
import StudentsTable from "../../../components/StudentsTable";

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/students/student");
        if (!response.ok) throw new Error("Failed to fetch students");
        const data = await response.json();


        const dataWithIds = data.map((s, index) => ({ ...s, id: s.id || index + 1 }));

        setStudents(dataWithIds);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);


  const handleUpdate = (id, updatedData) => {
    setStudents(prev =>
      prev.map(s => (s.id === id ? { ...s, ...updatedData } : s))
    );
  };


  const handleDelete = (id) => {
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  if (loading) return <p>Loading students...</p>;

  return (
    <div>
      <h1>Students List</h1>
      <StudentsTable
        students={students}
        onUpdate={handleUpdate}  
        onDelete={handleDelete}  
      />
    </div>
  );
}

