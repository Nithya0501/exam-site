"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setSubjects,
  addSubject,
  updateSubject,
  deleteSubject,
  setError,
} from "../../../redux/slices/SubjectSlices";
import SubjectsSection from "../../../components/SubjectSection";
import { apiUrl } from "../../../lib/api";

export default function SubjectsPage() {
  const dispatch = useDispatch();
  const subjects = useSelector((state) => state.subjects.subjects);

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
      dispatch(setSubjects(Array.isArray(data) ? data : data.subjects || []));
    } catch (err) {
      dispatch(setError("Failed to fetch subjects"));
      dispatch(setSubjects([]));
    }
  };

  const handleSave = async (subject, editingSubject) => {
    if (!token) return alert("Authentication token missing.");
    try {
      const method = editingSubject ? "PUT" : "POST";
      const endpoint = editingSubject
        ? `/api/subjects/${subject.id || subject._id}`
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

      if (editingSubject) {
        dispatch(updateSubject(data));
      } else {
        dispatch(addSubject(data));
      }
    } catch (err) {
      dispatch(setError(err.message));
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
      dispatch(deleteSubject(id));
    } catch (err) {
      dispatch(setError(err.message));
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



