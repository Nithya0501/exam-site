"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiUrl } from "../lib/api";
import styles from "../styles/QuestionSection.module.scss";
import { AiFillEdit, AiFillDelete, AiFillHome } from "react-icons/ai";

export default function QuestionSection({ initialQuestions = [], topicId, subjectId }) {
  const router = useRouter();
  const [questions, setQuestions] = useState(initialQuestions);

  const [newQ, setNewQ] = useState({
    question: "",
    answer: "",
    defaultCode: ""
  });

  const [editId, setEditId] = useState(null);
  const [editQ, setEditQ] = useState({
    question: "",
    answer: "",
    defaultCode: ""
  });

  const [showForm, setShowForm] = useState(false);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setQuestions(initialQuestions);
  }, [initialQuestions]);

  const handleHomeClick = () => {
    if (subjectId) router.push(`/admin/topic/${subjectId}`);
    else router.push("/admin/topics");
  };

  const handleAddQuestion = async () => {
    if (!newQ.question.trim()) return;

    setAdding(true);

    try {
      const res = await fetch(apiUrl("/api/questions"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: topicId,
          question: newQ.question,
          answer: newQ.answer,
          defaultCode: newQ.defaultCode
        }),
      });

      if (!res.ok) throw new Error("Error adding question");

      const created = await res.json();
      setQuestions((prev) => [created, ...prev]);

      setNewQ({ question: "", answer: "", defaultCode: "" });
      setShowForm(false);
    } catch {
      setError("Failed to add question");
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(apiUrl(`/api/questions/${id}`), { method: "DELETE" });
      if (!res.ok) throw new Error("Error deleting");

      setQuestions((prev) => prev.filter((q) => q._id !== id));
    } catch {
      setError("Failed to delete question");
    }
  };

  const handleEdit = (q) => {
    setEditId(q._id);
    setEditQ({
      question: q.question,
      answer: q.answer || "",
      defaultCode: q.defaultCode || ""
    });
  };

  
  const handleSaveEdit = async (id) => {
    try {
      const res = await fetch(apiUrl(`/api/questions/${id}`), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editQ),
      });

      if (!res.ok) throw new Error("Error saving");

      const updated = await res.json();

      setQuestions((prev) =>
        prev.map((q) => (q._id === id ? updated : q))
      );

      setEditId(null);
    } catch {
      setError("Failed to update question");
    }
  };

  return (
    <div className={styles.questionSection}>
      <div className={styles.btn}>
        <button className={styles.homeButton} onClick={handleHomeClick}>
          <AiFillHome />
        </button>

        {!showForm && (
          <button className={styles.addQuestionButton} onClick={() => setShowForm(true)}>
            + Add Question
          </button>
        )}
      </div>

      {showForm && (
        <div className={styles.formBox}>
          <div className={styles.questionForm}>

            <input
              type="text"
              className={styles.input}
              placeholder="Enter Question"
              value={newQ.question}
              onChange={(e) => setNewQ({ ...newQ, question: e.target.value })}
            />

            <textarea
              className={styles.textarea}
              placeholder="Enter Answer"
              value={newQ.answer}
              onChange={(e) => setNewQ({ ...newQ, answer: e.target.value })}
            />

            <textarea
              className={styles.textarea}
              placeholder="Enter Default Code"
              value={newQ.defaultCode}
              onChange={(e) => setNewQ({ ...newQ, defaultCode: e.target.value })}
            />

            <div className={styles.questionSubmit}>
              <button className={styles.saveBtn} disabled={adding} onClick={handleAddQuestion}>
                {adding ? "Adding..." : "Submit"}
              </button>
              <button className={styles.cancelButton} onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}

      {error && <p className={styles.error}>{error}</p>}

      {questions.length === 0 ? (
        <p>No questions found.</p>
      ) : (
        <ul className={styles.questionsList}>
          {questions.map((q, i) => (
            <li key={q._id} className={styles.questionItem}>

              <div>
                <b>{i + 1}. {q.question}</b>
                <p><b>Answer:</b> {q.answer}</p>
                <pre><b>Code:</b> {q.defaultCode}</pre>
              </div>

              <span className={styles.actionIcons}>
                <AiFillEdit className={styles.editBtn} onClick={() => handleEdit(q)} />
                <AiFillDelete className={styles.deleteBtn} onClick={() => handleDelete(q._id)} />
              </span>

              {editId === q._id && (
                <div className={styles.editBox}>
                  <div className={styles.questionForm}>

                    <input
                      type="text"
                      className={styles.input}
                      value={editQ.question}
                      onChange={(e) => setEditQ({ ...editQ, question: e.target.value })}
                    />

                    <textarea
                      className={styles.textarea}
                      value={editQ.answer}
                      onChange={(e) => setEditQ({ ...editQ, answer: e.target.value })}
                    />

                    <textarea
                      className={styles.textarea}
                      value={editQ.defaultCode}
                      onChange={(e) => setEditQ({ ...editQ, defaultCode: e.target.value })}
                    />

                    <div className={styles.questionSubmit}>
                      <button className={styles.saveBtn} onClick={() => handleSaveEdit(q._id)}>
                        Update
                      </button>

                      <button className={styles.cancelButton} onClick={() => setEditId(null)}>
                        Cancel
                      </button>
                    </div>

                  </div>
                </div>
              )}

            </li>
          ))}
        </ul>
      )}

    </div>
  );
}


