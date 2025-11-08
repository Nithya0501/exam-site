"use client";

import { useEffect, useState } from "react";
import { useParams} from "next/navigation";
import { apiUrl } from "../../../../lib/api";
import QuestionSection from "../../../../components/QuestionSection";
import styles from "../../../../styles/QuestionSection.module.scss";

export default function TopicDetailPage() {
  const { topicId } = useParams();
  const [topic, setTopic] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!topicId) return;

    const fetchTopicAndQuestions = async () => {
      setLoading(true);
      setError(null);

      try {
        const topicRes = await fetch(apiUrl(`/api/topics/topic/${topicId}`));
        if (!topicRes.ok) throw new Error("Topic not found");
        const topicData = await topicRes.json();
        setTopic(topicData);

        const questionRes = await fetch(apiUrl(`/api/questions/topic/${topicId}`));
        const questionData = await questionRes.json();
        setQuestions(Array.isArray(questionData) ? questionData : []);
      } catch (err) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchTopicAndQuestions();
  }, [topicId]);

  if (loading) return <p>Loading topic and questions...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!topic) return <p>Topic not found</p>;

  return (
    <div className={styles.container}>
      <h1>{topic.topic}</h1>
      <h2>Questions & Try-It-Yourself</h2>

      <QuestionSection initialQuestions={questions} />
    </div>
  );
}



