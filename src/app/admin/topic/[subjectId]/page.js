"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import styles from "../../../../styles/Topic.module.scss"; 
import { apiUrl } from "../../../../lib/api";


export default function TopicsPage() {
  const { subjectId } = useParams();
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await fetch(apiUrl(`/api/topics/${subjectId}`));
        if (!res.ok) throw new Error("Failed to fetch topics");
        const data = await res.json();
        setTopics(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (subjectId) fetchTopics();
  }, [subjectId]);

  if (loading) return <p className={styles.loading}>Loading topics...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.topicsContainer}>
      <h1 className={styles.topicsTitle}>
        Topics for Subject: {topics[0]?.subject?.name || subjectId}
      </h1>

      {topics.length > 0 ? (
        <ul className={styles.topicsList}>
          {topics.map((t) => (
            <li key={t._id} className={styles.topicItem}>
              <h3>
                <Link href={`/admin/topics/${t._id}`} className={styles.topicLink}>
                  {t.topic}
                </Link>
              </h3>
              <p className={styles.topicDescription}>{t.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noTopics}>No topics found for this subject.</p>
      )}
    </div>
  );
}
