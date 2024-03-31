import React, { useEffect } from "react";
import styles from "./LeaderboardPage.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { getLeaders } from "../../api";

export function LeaderboardPage() {
  const [leaders, setLeaders] = useState(null);
  const [loading, setLoading] = useState("Данные загружаются");
  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const data = await getLeaders();
        let leader = data.leaders;
        leader = leader.sort((a, b) => a.time - b.time);
        leader = leader.slice(0, 10);
        setLeaders(leader);
      } catch (error) {
        setLoading("Не получилась найти лидеров, попробуйте позже");
      }
    };

    fetchLeaders();
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.title}>Лидерборд</h1>
        <Link to="/" className={styles.link}>
          <p className={styles.link_text}>Начать игру</p>
        </Link>
      </div>
      <ul className={styles.leaderboard}>
        <li className={styles.leaderboardTitle}>
          <div className={styles.leaderPosition}>Позиция</div>
          <div className={styles.leaderBlock}>
            <div>Пользователь</div>
            <div>Время</div>
          </div>
        </li>
        {!leaders ? (
          <div className={styles.loader}>{loading}</div>
        ) : (
          leaders.map((leader, index) => (
            <li className={styles.leaders} key={leader.id}>
              <div className={styles.leaderPosition}>#{index + 1}</div>
              <div className={styles.leaderBlock}>
                <div className={styles.leaderBlock_name}>{leader.name}</div>
                {}
                <div>{leader.time}</div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
