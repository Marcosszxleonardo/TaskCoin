import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./tarefasfilho.module.css";
import "../../../global.css";
import api from "../../services/api";
import Counter from "../../components/Counter";
import { Navigate } from "react-router";

export default function TarefaFilho() {
  const [usuario, setUsuario] = useState("");
  const [tarefaExpandida, setTarefaExpandida] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const formatarData = (dataString) => {
    const data = new Date(dataString);

    return data.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
  };

  const prioridadeStatus = {
    "A_FAZER": 1,
    "ANALISE": 2,
    "CONCLUIDA": 3,
    "EXPIRADA": 4
  };

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await api.get("/filhos/detalhe-filho");
        setUsuario(response.data);
      } catch (error) {
        console.error("Erro em coletar usuário: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuario();
  }, []);

  const tarefasConcluidas = usuario?.tarefas_concluidas || 0;
  const tarefasRequeridas = usuario?.nivel?.tarefas_requeridas || 0;

  const porcentagemProgresso = Math.round((tarefasConcluidas / (tarefasRequeridas + 1)) * 100);

  const toggleTarefa = (id) => {
    setTarefaExpandida(tarefaExpandida === id ? null : id);
  };

  const completeTask = async (id) => {
    try {
      const task = await api.put("/tarefas", {
        id_tarefa: id,
        status_tarefa: "ANALISE"
      })

      setUsuario(prevUsuario => ({
        ...prevUsuario,

        tarefas: prevUsuario.tarefas.map(tarefa =>
          tarefa.id_tarefa === id
            ? { ...tarefa, status_tarefa: "ANALISE" }
            : tarefa
        )
      }));

      console.log("Status alterado!")
    } catch {
      console.error("ERRO: Atualização de status de tarefa falhou.")
    }
  }

  if (loading) {
    return (
      <div className="loadingScreen">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className={styles.screen}>

      <header className={styles.header}>
        <h1 className={styles.logo}>TASKCOIN</h1>
        <span className={styles.greeting}>Olá, {usuario.nome}!</span>
      </header>

      <section className={styles.pointsCard}>

        <span className={styles.pointsLabel}>
          Pontos:
        </span>

        <div className={styles.pointsInfo}>
          <span className={styles.coin}>🪙</span>
          <span className={styles.pointsNumber}>
            <Counter target={usuario.saldo} duration={1000} />
          </span>
        </div>

      </section>

      <section className={styles.levelCard}>

        <div className={styles.levelTop}>
          {usuario.nivel && (
            <h2>Nv. {usuario.nivel.nivel} - {usuario.nivel.titulo_nivel}</h2>
          )}

          <span><Counter target={porcentagemProgresso} duration={1000} />%</span>
        </div>

        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${porcentagemProgresso}%` }}></div>
        </div>

        {usuario.nivel && (
          <p>{usuario.tarefas_concluidas}/{usuario.nivel.tarefas_requeridas + 1} Tarefas concluídas para subir de nível</p>
        )}
      </section>

      <section className={styles.tasksSection}>
        <h2 className={styles.tasksTitle}>
          Tarefas do dia
        </h2>

        {usuario && usuario.tarefas.slice().sort((a, b) => {
          return prioridadeStatus[a.status_tarefa] - prioridadeStatus[b.status_tarefa];
        }).map((tarefa) => (

          <div key={tarefa.id_tarefa} className={`${styles.taskCard} ${tarefaExpandida === tarefa.id_tarefa ? styles.expanded : ''}`}>

            <div className={styles.taskHeader}>
              <div className={styles.taskContent}>
                <span className={styles.taskEmoji}>🎯</span>
                <div>
                  <h3 className={styles.taskName}>{tarefa.nome_tarefa}</h3>
                  <span className={styles.taskMeta}>⏳ {formatarData(tarefa.expiracao_tarefa)}...</span>
                </div>
              </div>

              <div className={styles.taskRight}>
                <span className={styles.taskPoints}><Counter target={tarefa.valor_tarefa} duration={1000} /> 🪙</span>
                <span className={styles.arrow}>
                  <button onClick={() => toggleTarefa(tarefa.id_tarefa)}>
                    {tarefaExpandida === tarefa.id_tarefa ? '▴' : '▾'}
                  </button>
                </span>
              </div>
            </div>

            <div className={styles.taskDetails}>
              <div className={styles.taskDescription}>
                <p>{tarefa.descricao_tarefa}</p>
              </div>
            </div>

            {tarefa.status_tarefa === "CONCLUIDA" ? (
              <button className={styles.completed} disabled>Concluído!</button>
            ) : tarefa.status_tarefa === "ANALISE" ? (
              <button className={styles.analysis}>Em análise...</button>
            ) : tarefa.status_tarefa === "EXPIRADA" ? (
              <button className={styles.expired} disabled>Expirada</button>
            ) : (
              <button className={styles.completeButton} onClick={() => completeTask(tarefa.id_tarefa)}>Marcar como concluída</button>
            )}
          </div>))}
      </section>

      <nav className="bottomNav">
        <button className="navBtn active">
          <span className="navIcon">☑️</span>
          <span className="navText">Tarefas</span>
        </button>

        <button className="navBtn" onClick={() => { navigate("/conquistasfilho") }}>
          <span className="navIcon">😊</span>
          <span className="navText">Conquistas</span>
        </button>

        <button className="navBtn">
          <span className="navIcon">👤</span>
          <span className="navText">Perfil</span>
        </button>
      </nav>

    </div>
  );
}