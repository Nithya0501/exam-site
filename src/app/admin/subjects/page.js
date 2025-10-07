"use client";

import { useState, useEffect } from "react";
import SubjectsSection from "../../../components/SubjectSection";
import { apiUrl } from "../../../lib/api";

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState([]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (token) fetchSubjects();
  }, [token]);

  const fetchSubjects = async () => {
    try {
      const res = await fetch(apiUrl("/api/subjects"), {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setSubjects(Array.isArray(data) ? data : data.subjects || []);
    } catch (err) {
      console.error("Failed to fetch subjects:", err);
      setSubjects([]);
    }
  };

  const handleSave = async (subject, editingSubject) => {
    if (!token) return alert("Authentication token missing.");
    try {
      const method = editingSubject ? "PUT" : "POST";
      const endpoint = editingSubject
        ? `/api/subjects/${subject.id}`
        : "/api/subjects";

      const res = await fetch(apiUrl(endpoint), {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(subject),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save subject");
      fetchSubjects();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!token) return alert("Authentication token missing.");
    if (!confirm("Are you sure you want to delete this subject?")) return;
    try {
      const res = await fetch(apiUrl(`/api/subjects/${id}`), {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete subject");
      fetchSubjects();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <SubjectsSection
      subjects={subjects}
      onSave={handleSave}
      onDelete={handleDelete}
    />
  );
}


