import { useState, useEffect } from "react";
import styles from "./tarefasfilho.module.css";
import "../../../global.css";
import api from "../../services/api";
import Counter from "../../components/Counter";

export default function TarefaFilho() {
  const [usuario, setUsuario] = useState("");
  const [tarefaExpandida, setTarefaExpandida] = useState(null);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await api.get("/filhos/detalhe-filho");
        setUsuario(response.data);
      } catch (error) {
        console.error("Erro em coletar usuário: ", error);
      }
    };

    fetchUsuario();
  }, []);


  const toggleTarefa = (id) => {
    setTarefaExpandida(tarefaExpandida === id ? null : id);
  };

  return (
    <div className={styles.screen}>

      <header className={styles.header}>
        <h1 className={styles.logo}>TASKCOIN</h1>
        <span className={styles.greeting}>Olá {usuario.nome}!</span>
      </header>

      <section className={styles.pointsCard}>

        <span className={styles.pointsLabel}>
          Pontos:
        </span>

        <div className={styles.pointsInfo}>
          <span className={styles.coin}>🪙</span>
          <span className={styles.pointsNumber}>
            <Counter target={usuario.saldo} duration={1000}/>
          </span>
        </div>

      </section>

      <section className={styles.levelCard}>

        <div className={styles.levelTop}>
          {usuario.nivel && (
            <h2>Nv. {usuario.nivel.nivel} - {usuario.nivel.titulo_nivel}</h2>
          )}

          <span><Counter target={65} duration={1000}/>%</span>
        </div>

        <div className={styles.progressBar}>
          <div className={styles.progressFill}></div>
        </div>

        <p>{usuario.tarefas_concluidas}/{usuario.tarefas_concluidas + 1} Tarefas concluídas para subir de nível</p>

      </section>

      <section className={styles.tasksSection}>
        <h2 className={styles.tasksTitle}>
          Tarefas do dia
        </h2>

        {usuario && usuario.tarefas.map((tarefa) => (
          <div key={tarefa.id_tarefa} className={`${styles.taskCard} ${tarefaExpandida === tarefa.id_tarefa ? styles.expanded : ''}`}>

            <div className={styles.taskHeader}>
              <div className={styles.taskContent}>
                <span className={styles.taskEmoji}>📚</span>
                <div>
                  <h3 className={styles.taskName}>{tarefa.nome_tarefa}</h3>
                  <span className={styles.taskMeta}>{tarefa.expiracao_tarefa}</span>
                </div>
              </div>

              <div className={styles.taskRight}>
                <span className={styles.taskPoints}><Counter target={tarefa.valor_tarefa} duration={1000}/> 🪙</span>
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

            {/* Seu botão de concluir ou texto de concluído (que você já tem a lógica) */}
              {tarefa.status_tarefa === "CONCLUIDA" ? (
                <button className={styles.completed} disabled>Concluído!</button>
              ) : (
                <button className={styles.completeButton}>Marcar como concluída</button>
              )}
          </div>))}
      </section>

      <nav className="bottomNav">
        <button className={`${styles.navBtn} ${styles.active}`}>
          <span className={styles.navIcon}>☑️</span>
          <span className={styles.navText}>Tarefas</span>
        </button>

        <button className={styles.navBtn}>
          <span className={styles.navIcon}>😊</span>
          <span className={styles.navText}>Conquistas</span>
        </button>

        <button className={styles.navBtn}>
          <span className={styles.navIcon}>👤</span>
          <span className={styles.navText}>Perfil</span>
        </button>
      </nav>

    </div>
  );
}