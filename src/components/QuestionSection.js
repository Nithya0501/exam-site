"use client";
import { useState, useEffect } from "react";
import styles from "../styles/QuestionSection.module.scss";

export default function QuestionSection({ initialQuestions = [] }) {
  const [questions, setQuestions] = useState(initialQuestions);
  const [showEditor, setShowEditor] = useState({});
  const [codes, setCodes] = useState({});
  const [outputs, setOutputs] = useState({});

  useEffect(() => {
    const initialCodes = {};
    const initialOutputs = {};
    const initialShow = {};

    questions.forEach((q) => {
      initialCodes[q._id] = q.defaultCode || "";
      initialOutputs[q._id] = "";
      initialShow[q._id] = false;
    });

    setCodes(initialCodes);
    setOutputs(initialOutputs);
    setShowEditor(initialShow);
  }, [questions]);

  const handleTryClick = (id) => setShowEditor((prev) => ({ ...prev, [id]: true }));
  const handleCodeChange = (id, value) => setCodes((prev) => ({ ...prev, [id]: value }));
  const handleRun = (id) => setOutputs((prev) => ({ ...prev, [id]: codes[id] }));
  if (questions.length === 0) return <p>No questions found.</p>;

  return (
    <ul className={styles.section}>
      {questions.map((q, index) => (
        <li key={q._id}>
          <h3>
            {index + 1}. {q.question}
          </h3>
          <p>{q.answer}</p>

          {!showEditor[q._id] ? (
            <button onClick={() => handleTryClick(q._id)}>Try It Yourself</button>
          ) : (
            <div className={styles.editor}>
              <textarea
                value={codes[q._id]}
                onChange={(e) => handleCodeChange(q._id, e.target.value)}
                placeholder="Type your code here..."
              />
              <div className={styles.buttons}>
                <button onClick={() => handleRun(q._id)}>Run</button>
              </div>
              <div className={styles.output} dangerouslySetInnerHTML={{ __html: outputs[q._id] }} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
