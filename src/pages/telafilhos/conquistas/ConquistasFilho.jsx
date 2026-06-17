import styles from "./ConquistasFilho.module.css";
import api from "../../../services/api";
import LoadingScreen from "../../components/LoadingScreen"
import MenuInferior from "../../components/MenuInferior/MenuInferior";
import "../../../global.css"
import { useState, useEffect } from "react";
import { FaGrinStars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Counter from "../../components/Counter";

export default function ConquistasFilho() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

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
    }

    fetchUsuario();
  }, []);

  const tarefasConcluidas = usuario?.tarefas_concluidas || 0;
  const tarefasRequeridas = usuario?.nivel?.tarefas_requeridas || 0;

  const prioridadeStatus = {
    "NAO_ADQUIRIDA": 1,
    "ADQUIRIDA": 2
  }

  const purchaseReward = async (id) => {
    try {
      const recompensa = await api.put("/recompensas", {
        "id_recompensa": id,
        "status_recompensa": "ADQUIRIDA"
      })

      setUsuario(prevUsuario => ({
        ...prevUsuario,

        recompensas: prevUsuario.recompensas.map(recompensa =>
          recompensa.id_recompensa === id
            ? { ...recompensa, status_tarefa: "ADQUIRIDA" }
            : recompensa
        )
      }));

      console.log("Conquista Adquirida!")
    } catch {
      console.error("ERRO: Aquisição de conquista falhou")
    }
  }

  const porcentagemProgresso = Math.round((tarefasConcluidas / (tarefasRequeridas + 1)) * 100);

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <div className={styles.screen}>

      <header className={styles.header}>
        <div className={styles.headerRow}>
          <h1 className={styles.logo}>TASKCOIN</h1>
          <span className={styles.greeting}>Olá, <strong>{usuario.nome}</strong>!</span>
        </div>
      </header>


      <div className={styles.containerWrapper}>
        <div className={styles.leftSide}>
          <section className={styles.pointsCard}>

            <span className={styles.pointsTitle}>
              Pontos Acumulados:
            </span>

            <div className={styles.pointsRight}>
              <div className={styles.coin}>🪙</div>
              <span className={styles.pointsValue}>
                <Counter target={usuario.saldo} duration={1000}></Counter>
              </span>
            </div>

          </section>

          <section className={styles.progressCard}>
            <div className={styles.trophyIcon}>
              <FaGrinStars />
            </div>

            <div className={styles.progressTop}>
              {usuario.nivel && (
                <h2>Nv. {usuario.nivel.nivel} - <span className={styles.levelTitle}>{usuario.nivel.titulo_nivel}</span></h2>
              )}
              <span>
                <Counter target={porcentagemProgresso} duration={1000}></Counter>%
              </span>
            </div>

            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${porcentagemProgresso}%` }}></div>
            </div>

            <p>{tarefasConcluidas}/{tarefasRequeridas + 1} Tarefas concluídas para subir de nível</p>

            {usuario.nivel && (
              <h4>"{usuario.nivel.descricao_nivel}"</h4>
            )}
          </section>
        </div>

        <div className={styles.rightSide}>
          <section className={styles.section}>

            <h2 className={styles.sectionTitle}>
              Adquira sua conquista
            </h2>

            {usuario && usuario.recompensas.slice().sort((a, b) => {
              return prioridadeStatus[a.status_recompensa] - prioridadeStatus[b.status_recompensa];
            }).map((recompensa) => (
              recompensa.status_recompensa == "NAO_ADQUIRIDA" ? (
                <div key={recompensa.id_recompensa} className={styles.rewardCard}>
                  <div className={styles.rewardLeft}>
                    <div className={styles.medal}>
                      🌟
                    </div>
                    <div>
                      <h3>
                        {recompensa.nome_recompensa}
                      </h3>
                      <div className={styles.rewardPoints}>
                        <Counter target={recompensa.valor_recompensa} duration={500}></Counter> 🪙
                      </div>
                    </div>
                  </div>

                  {usuario.saldo >= recompensa.valor_recompensa ? (
                    <div className={styles.rewardRight}>
                      <span className={styles.happy}>
                        😊
                      </span>
                      <button className={styles.rewardBtn} onClick={() => purchaseReward(recompensa.id_recompensa)}>
                        Resgatar
                      </button>
                    </div>) : (
                    <div className={styles.rewardRight}>
                      <span className={styles.sad}>
                        ☹️
                      </span>
                      <span className={styles.insufficient}>
                        Pontos insuficiente
                      </span>
                    </div>)}

                </div>) : (
                <div key={recompensa.id_recompensa} className={styles.rewardMain}>
                  <div>
                    <h3>
                      {recompensa.nome_recompensa}
                    </h3>
                  </div>

                  <div className={styles.rewardMainRight}>
                    <div className={styles.checkBox}>✓</div>
                    <span>Adquirido</span>
                  </div>

                </div>)))}
          </section>
        </div>
      </div>

      {/* NAVBAR */}
      <MenuInferior abaAtiva="conquistas" usuario={"filho"} />
    </div>
  );
}