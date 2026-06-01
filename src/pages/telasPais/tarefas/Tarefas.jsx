import styles from './Tarefas.module.css';
import "../../../global.css"
import api from "../../services/api"
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import LoadingScreen from '../../components/LoadingScreen';
import Counter from '../../components/Counter';

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
        setLoading(false);
      } catch (error) {
        console.error("Erro em coletar usuário: ", error);
         setLoading(true);
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

  const formatarData = (dataString) => {
    const data = new Date(dataString);

    return data.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
  };

  if (loading) {
    return <LoadingScreen />
  }

  const deletarTask = async (id) => {
    try {
      const response = await api.delete(`/tarefas/${id}`);

      setUsuario(prev => ({
        ...prev,
        filhos: prev.filhos.map(filho => ({
          ...filho,
          tarefas: filho.tarefas.filter(task => task.id_tarefa !== id)
        }))
      }));
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
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
            <span className={styles.infoNumber}><Counter target={usuario?.filhos?.length} duration={500} /></span>
            <span className={styles.infoText}>Filhos</span>
          </div>

          <div className={styles.infoCard}>
            <span className={styles.infoNumber}><Counter target={contagemTarefas} duration={500} /></span>
            <span className={styles.infoText}>Tarefas</span>
          </div>

          <div className={styles.infoCard}>
            <span className={styles.infoNumber}><Counter target={contagemTarefasConcluidas} duration={500} /></span>
            <span className={styles.infoText}>Concluídas</span>
          </div>
        </div>
      </section>

      <section className={styles.tasksSection}>
        <h2 className={styles.tasksTitle}>Tarefas ativas</h2>

        <div className={styles.taskList}>
          {usuario?.filhos?.map((filho) => (
            filho.tarefas?.filter((task) => task.status_tarefa === "A_FAZER")
              .map((task) => (
                <div key={task.id_tarefa} className={styles.taskCard}>
                  <div className={styles.taskLeft}>
                    <span className={styles.taskEmoji}>🎯</span>

                    <div>
                      <h3 className={styles.taskName}>{task.nome_tarefa}</h3>

                      <p className={styles.taskMeta}>
                        {filho.nome} - ⏳ {formatarData(task.expiracao_tarefa)}...
                      </p>
                    </div>
                  </div>

                  <div className={styles.taskRight}>
                    <div className={styles.points}>
                      <span><Counter target={task.valor_tarefa} duration={1000} /></span>
                      🪙
                    </div>

                    <button className={styles.deleteBtn} onClick={() => deletarTask(task.id_tarefa)}>
                      <TrashIcon />
                    </button>
                  </div>
                </div>
              ))
          ))}
        </div>

        <button className={styles.addButton} onClick={() => {navigate("/adicionartarefa")}}>
          + Adicionar Tarefa
        </button>

        <button className={styles.analysisButton} onClick={() => {navigate("/analisepai")}}>
          <span>Tarefas em Análise</span>
          <span className={styles.badgeBlue}>
            <Counter target={usuario?.filhos?.reduce((acumulador, filho) => {
              const tarefasEmAnalise = filho.tarefas?.filter(
                (task) => task.status_tarefa === "ANALISE"
              ) || [];

              return acumulador + tarefasEmAnalise.length
            }, 0)} duration={500}/>
          </span>
        </button>

        <button className={styles.expiredButton} onClick={() => navigate("/tarefaexpirada")}>
          <span>Tarefas expiradas</span>
          <span className={styles.badgeRed}>
            <Counter target={usuario?.filhos?.reduce((acumulador, filho) => {
              const tarefasExpiradas = filho.tarefas?.filter(
                (task) => task.status_tarefa === "EXPIRADA"
              ) || [];

              return acumulador + tarefasExpiradas.length
            }, 0)} duration={500}/>
          </span>
        </button>
      </section>

      <nav className="bottomNav">
        <button className="navBtn active">
          <span className="navIcon">☑️</span>
          <span className="navText">Tarefas</span>
        </button>

        <button className="navBtn" onClick={() => { navigate("/conquistaspai") }}>
          <span className="navIcon">🌟</span>
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