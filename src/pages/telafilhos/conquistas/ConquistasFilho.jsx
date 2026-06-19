import styles from "./ConquistasFilho.module.css";
import api from "../../../services/api";
import LoadingScreen from "../../components/LoadingScreen"
import MenuInferior from "../../components/MenuInferior/MenuInferior";
import "../../../global.css"
import { useState, useEffect } from "react";
import { FaGrinStars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { TbCoinTakaFilled } from "react-icons/tb";
import { GiStarFormation } from "react-icons/gi";
import { HiEmojiSad } from "react-icons/hi";
import { HiEmojiHappy } from "react-icons/hi";
import { FaFire } from "react-icons/fa";
import { GrTrophy } from "react-icons/gr";
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

  const purchaseReward = async (id, custoPontos) => {
    try {
      const recompensa = await api.put("/recompensas", {
        id_recompensa: id,
        status_recompensa: "ADQUIRIDA"
      })

      setUsuario(prevUsuario => ({
        ...prevUsuario,
        
        saldo: prevUsuario.saldo_pontos - custoPontos,
        recompensas: prevUsuario.recompensas.map(recompensa =>
          recompensa.id_recompensa === id
            ? { ...recompensa, status_recompensa: "ADQUIRIDA" }
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
              <div className={styles.coin}><TbCoinTakaFilled /></div>
              <span className={styles.pointsValue}>
                <Counter target={usuario.saldo} duration={1000}></Counter>
              </span>
            </div>

          </section>

          <section className={styles.offensiveCard}>
            <div className={styles.leftContent}>
              <span className={styles.label}>
                <span className={styles.gradientText}>Dias de Ofensiva:</span>
              </span>
              <div className={styles.recordBadge}>
                <span role="img" aria-label="Troféu"><GrTrophy /> Maior Ofensiva:</span>
                <p>{usuario.maior_ofensiva} dia(s)</p>
              </div>
            </div>

            <div className={styles.rightContent}>
              <span className={styles.fireEmoji} role="img" aria-label="Fogo"><FaFire /></span>
              <span className={styles.number}>{usuario.ofensiva_atual}</span>
            </div>
          </section>

          <section className={styles.progressCard}>
            <div className={styles.trophyIcon}>
              <FaGrinStars />
            </div>

            <div className={styles.progressTop}>
              {usuario.nivel.nivel < 10 ? (
                <h2>Nv. {usuario.nivel.nivel} - <span className={styles.levelTitle}>{usuario.nivel.titulo_nivel}</span></h2>
              ) : (<h2 className={styles.maxLevel}>Nv. {usuario.nivel.nivel} - <span className={styles.levelTitle}>{usuario.nivel.titulo_nivel}</span></h2>)}

              {usuario.nivel.nivel < 10 ? (<span><Counter target={porcentagemProgresso} duration={1000} />%</span>) : (<span><Counter target={100} duration={1000} />%</span>)}
            </div>

            <div className={styles.progressBar}>
              {usuario.nivel.nivel < 10 ? (<div className={styles.progressFill} style={{ width: `${porcentagemProgresso}%` }}></div>) : (<div className={styles.progressFill} style={{ width: `100%` }}></div>)}

            </div>

            {usuario.nivel.nivel < 10 ? (
              <p>{usuario.tarefas_concluidas}/{usuario.nivel.tarefas_requeridas + 1} Tarefas concluídas para subir de nível</p>
            ) : (<p>Nível máximo alcançado!</p>)}

            {usuario.nivel.nivel < 10 ? (
              <h4>"{usuario.nivel.descricao_nivel}"</h4>
            ) : (<h4 className={styles.descMax}>"{usuario.nivel.descricao_nivel}"</h4>)}
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
                      <GiStarFormation />
                    </div>
                    <div>
                      <h3>
                        {recompensa.nome_recompensa}
                      </h3>
                      <div className={styles.rewardPoints}>
                        <Counter target={recompensa.valor_recompensa} duration={500}></Counter> <TbCoinTakaFilled />
                      </div>
                    </div>
                  </div>

                  {usuario.saldo >= recompensa.valor_recompensa ? (
                    <div className={styles.rewardRight}>
                      <span className={styles.happy}>
                        <HiEmojiHappy />
                      </span>
                      <button className={styles.rewardBtn} onClick={() => purchaseReward(recompensa.id_recompensa, recompensa.valor_recompensa)}>
                        Resgatar
                      </button>
                    </div>) : (
                    <div className={styles.rewardRight}>
                      <span className={styles.sad}>
                        <HiEmojiSad />
                      </span>
                      <span className={styles.insufficient}>
                        Pontos insuficientes
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