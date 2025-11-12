"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiUrl } from "../lib/api";
import styles from "../styles/QuestionSection.module.scss";
import { AiFillEdit, AiFillDelete, AiFillHome } from "react-icons/ai";

export default function QuestionSection({ initialQuestions = [], topicId, subjectId }) {
  const router = useRouter();
  const [questions, setQuestions] = useState(initialQuestions);
  const [newQuestion, setNewQuestion] = useState("");
  const [editingQuestionId, setEditingQuestionId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setQuestions(initialQuestions);
  }, [initialQuestions]);

  
  const handleHomeClick = () => {
    if (subjectId) {
      router.push(`/admin/topic/${subjectId}`); 
    } else {
      router.push("/admin/topics"); 
    }
  };


  const handleAddQuestion = async () => {
    if (!newQuestion.trim()) return;

    setAdding(true);
    setError(null);

    try {
      const res = await fetch(apiUrl("/api/questions"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: topicId, question: newQuestion }),
      });

      if (!res.ok) throw new Error("Failed to add question");
      const createdQuestion = await res.json();
      setQuestions((prev) => [createdQuestion, ...prev]);
      setNewQuestion("");
      setShowForm(false);
    } catch (err) {
      console.error(err);
      setError("Failed to add question");
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(apiUrl(`/api/questions/${id}`), { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete question");
      setQuestions((prev) => prev.filter((q) => q._id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete question");
    }
  };

  const handleEdit = (q) => {
    setEditingQuestionId(q._id);
    setEditingText(q.question);
  };

  const handleSaveEdit = async (id) => {
    if (!editingText.trim()) return;

    try {
      const res = await fetch(apiUrl(`/api/questions/${id}`), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: editingText }),
      });
      if (!res.ok) throw new Error("Failed to update question");

      const updated = await res.json();
      setQuestions((prev) => prev.map((q) => (q._id === id ? updated : q)));
      setEditingQuestionId(null);
      setEditingText("");
    } catch (err) {
      console.error(err);
      setError("Failed to update question");
    }
  };

  const handleCancelEdit = () => {
    setEditingQuestionId(null);
    setEditingText("");
  };

  const handleCancel = () => {
    setNewQuestion("");
    setError(null);
    setShowForm(false);
  };

  return (
    <div className={styles.questionSection}>
      <div className={styles.btn}>
   
        <button type="button" className={styles.homeButton} onClick={handleHomeClick}>
          <AiFillHome/>
  
        </button>

        {!showForm && (
          <button onClick={() => setShowForm(true)} className={styles.addQuestionButton}>
            + Add Question
          </button>
        )}
      </div>

      {showForm && (
        <div className={styles.addQuestionContainer}>
          <input
            type="text"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Enter new question"
            className={styles.addQuestionInput}
          />
          <button onClick={handleAddQuestion} disabled={adding} className={styles.addQuestion}>
            {adding ? "Adding..." : "Add"}
          </button>
          <button onClick={handleCancel} disabled={adding} className={styles.cancelButton}>
            Cancel
          </button>
        </div>
      )}

      {error && <p className={styles.error}>{error}</p>}

      {!questions || questions.length === 0 ? (
        <p>No questions found.</p>
      ) : (
        <ul className={styles.questionsList}>
          {questions.map((q, index) => (
            <li key={q._id} className={styles.questionItem}>
              <span>
                {index + 1}.{" "}
                {editingQuestionId === q._id ? (
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className={styles.editInput}
                  />
                ) : (
                  q.question
                )}
              </span>
              <span className={styles.actionIcons}>
                {editingQuestionId === q._id ? (
                  <>
                    <button onClick={() => handleSaveEdit(q._id)} className={styles.saveButton}>
                      Save
                    </button>
                    <button onClick={handleCancelEdit} className={styles.cancelButton}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <AiFillEdit className={styles.editBtn} onClick={() => handleEdit(q)} />
                    <AiFillDelete className={styles.deleteBtn} onClick={() => handleDelete(q._id)} />
                  </>
                )}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


