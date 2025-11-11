"use client";

import { useState, useEffect } from "react";

export default function QuestionSection({ initialQuestions = [] }) {
  const [questions, setQuestions] = useState(initialQuestions);

  useEffect(() => {

    setQuestions(initialQuestions);
  }, [initialQuestions]);
  if (!questions || questions.length === 0) {
    return <p>No questions found.</p>;
  }

  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {questions.map((q, index) => (
        <li
          key={q._id}
          style={{
            background: "#fff",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            padding: "16px",
            marginBottom: "16px",
            fontSize: "16px",
            fontWeight: 500,
            color: "#333",
          }}
        >
          {index + 1}. {q.question}
        </li>
      ))}
    </ul>
  );
}

