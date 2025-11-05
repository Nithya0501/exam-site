"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiUrl } from "../../../../lib/api";
export default function TopicDetailPage() {
  const { topicId } = useParams();
  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const res = await fetch(apiUrl(`/api/topics/topic/${topicId}`));
        const data = await res.json();
        setTopic(data);
      } catch (error) {
        console.error("Error fetching topic detail:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTopic();
  }, [topicId]);

  if (loading) return <p>Loading...</p>;
  if (!topic) return <p>Topic not found</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{topic.topic}</h1>
      <p>{topic.description}</p>
    </div>
  );
}
