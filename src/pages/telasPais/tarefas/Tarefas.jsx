import styles from './Tarefas.module.css';
import { useState } from 'react';

const CoinIcon = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="7" fill="#F5B400" />
    <text
      x="8"
      y="11.5"
      textAnchor="middle"
      fill="white"
      fontSize="8"
      fontWeight="bold"
      fontFamily="sans-serif"
    >
      P
    </text>
  </svg>
);

const TrashIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <path
      d="M4 7H20"
      stroke="#444"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M9 7V5C9 4.4 9.4 4 10 4H14C14.6 4 15 4.4 15 5V7"
      stroke="#444"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M18 7L17.3 18C17.2 19.1 16.3 20 15.2 20H8.8C7.7 20 6.8 19.1 6.7 18L6 7"
      stroke="#444"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const tasks = [
  {
    id: 1,
    title: 'Estudar Matemática',
    user: 'Marcos',
    date: '05/05/2026',
    points: 20,
  },
  {
    id: 2,
    title: 'Estudar pra prova da FIAP',
    user: 'Gustavo',
    date: '08/05/2026',
    points: 50,
  },
];

export default function TasksScreen() {
  return (
    <div className={styles.screen}>
      <header className={styles.header}>
        <span className={styles.pageTitle}>Tela de Tarefas - Pai</span>

        <div className={styles.headerRow}>
          <h1 className={styles.logo}>TASKCOIN</h1>
          <span className={styles.greeting}>Olá Jefferson!</span>
        </div>
      </header>

      <section className={styles.summary}>
        <h2 className={styles.summaryTitle}>Resumo dos Filhos</h2>

        <div className={styles.cards}>
          <div className={styles.infoCard}>
            <span className={styles.infoNumber}>3</span>
            <span className={styles.infoText}>Filhos</span>
          </div>

          <div className={styles.infoCard}>
            <span className={styles.infoNumber}>12</span>
            <span className={styles.infoText}>Tarefas</span>
          </div>

          <div className={styles.infoCard}>
            <span className={styles.infoNumber}>6</span>
            <span className={styles.infoText}>Concluídas</span>
          </div>
        </div>
      </section>

      <section className={styles.tasksSection}>
        <h2 className={styles.tasksTitle}>Tarefas ativas</h2>

        <div className={styles.taskList}>
          {tasks.map(task => (
            <div key={task.id} className={styles.taskCard}>
              <div className={styles.taskLeft}>
                <span className={styles.taskEmoji}>📚</span>

                <div>
                  <h3 className={styles.taskName}>{task.title}</h3>

                  <p className={styles.taskMeta}>
                    {task.user} - {task.date}
                  </p>
                </div>
              </div>

              <div className={styles.taskRight}>
                <div className={styles.points}>
                  <span>{task.points}</span>
                  <CoinIcon />
                </div>

                <button className={styles.deleteBtn}>
                  <TrashIcon />
                </button>
              </div>
            </div>
          ))}
        </div>

        <button className={styles.addButton}>
          + Adicionar Tarefa
        </button>

        <button className={styles.analysisButton}>
          <span>☰ Tarefas em Análise</span>
          <span className={styles.badgeBlue}>2</span>
        </button>

        <button className={styles.expiredButton}>
          <span>❗Tarefas expiradas</span>
          <span className={styles.badgeRed}>2</span>
        </button>
      </section>

      <nav className={styles.bottomNav}>
        <button className={`${styles.navBtn} ${styles.active}`}>
          <span className={styles.navIcon}>☑️</span>
          <span>Tarefas</span>
        </button>

        <button className={styles.navBtn}>
          <span className={styles.navIcon}>😊</span>
          <span>Conquistas</span>
        </button>

        <button className={styles.navBtn}>
          <span className={styles.navIcon}>👤</span>
          <span>Perfil</span>
        </button>
      </nav>
    </div>
  );
}