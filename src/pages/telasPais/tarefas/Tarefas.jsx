import styles from './Tarefas.module.css';
import "../../../global.css"
import api from "../../services/api"
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import LoadingScreen from '../../components/LoadingScreen';

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

export default function TasksScreen() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await api.get("/responsaveis/detalhe-responsavel");
        setUsuario(response.data);
      } catch (error) {
        console.error("Erro em coletar usuário: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuario();
  }, []);

  let contagemTarefas = usuario?.filhos?.reduce((acumulador, filho) => {
    return acumulador + filho?.tarefas?.length
  }, 0)

  let contagemTarefasConcluidas = usuario?.filhos?.reduce((acumulador, filho) => {
    return acumulador + filho?.tarefas_concluidas
  }, 0)

if (loading) {
  return <LoadingScreen />
}

return (
  <div className={styles.screen}>
    <header className={styles.header}>
      <div className={styles.headerRow}>
        <h1 className={styles.logo}>TASKCOIN</h1>
        <span className={styles.greeting}>Olá, {usuario.nome}!</span>
      </div>
    </header>

    <section className={styles.summary}>
      <h2 className={styles.summaryTitle}>Resumo dos Filhos</h2>

      <div className={styles.cards}>
        <div className={styles.infoCard}>
          <span className={styles.infoNumber}>{usuario?.filhos?.length}</span>
          <span className={styles.infoText}>Filhos</span>
        </div>

        <div className={styles.infoCard}>
          <span className={styles.infoNumber}>{contagemTarefas}</span>
          <span className={styles.infoText}>Tarefas</span>
        </div>

        <div className={styles.infoCard}>
          <span className={styles.infoNumber}>{contagemTarefasConcluidas}</span>
          <span className={styles.infoText}>Concluídas</span>
        </div>
      </div>
    </section>

    <section className={styles.tasksSection}>
      <h2 className={styles.tasksTitle}>Tarefas ativas</h2>

      <div className={styles.taskList}>
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

    <nav className="bottomNav">
      <button className="navBtn active">
        <span className="navIcon">☑️</span>
        <span className="navText">Tarefas</span>
      </button>

      <button className="navBtn" onClick={() => { navigate("/conquistaspai") }}>
        <span className="navIcon">😊</span>
        <span className="navText">Conquistas</span>
      </button>

      <button className="navBtn" onClick={() => { navigate("/perfilpai") }}>
        <span className="navIcon">👤</span>
        <span className="navText">Perfil</span>
      </button>
    </nav>

  </div>
);
}