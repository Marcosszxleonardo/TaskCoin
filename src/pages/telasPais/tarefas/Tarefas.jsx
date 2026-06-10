import styles from './Tarefas.module.css';
import "../../../global.css"
import api from "../../../services/api";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import LoadingScreen from '../../components/LoadingScreen';
import Counter from '../../components/Counter';
import MenuInferior from '../../components/MenuInferior/MenuInferior.jsx';
import { FiCheckSquare } from "react-icons/fi";
import { IoTrashOutline } from "react-icons/io5";
import { FaClock } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { LuFileSearch2 } from "react-icons/lu";
import { IoHappy } from "react-icons/io5";


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
          <span className={styles.greeting}>Olá, <strong>{usuario.nome}!</strong></span>
        </div>
      </header>

      <div className={styles.alinhamentoSections}>
        <section className={styles.summary}>
          <h2 className={styles.summaryTitle}>Panorama Geral</h2>

          <div className={styles.cards}>
            <div className={styles.infoCard}>
              <span className={styles.infoNumber}><Counter target={usuario?.filhos?.length} duration={500} /></span>
              <span className={styles.infoText}>Filho(s)</span>
            </div>

            <div className={styles.infoCard}>
              <span className={styles.infoNumber}><Counter target={contagemTarefas} duration={500} /></span>
              <span className={styles.infoText}>Tarefa(s)</span>
            </div>

            <div className={styles.infoCard}>
              <span className={styles.infoNumber}><Counter target={contagemTarefasConcluidas} duration={500} /></span>
              <span className={styles.infoText}>Concluída(s)</span>
            </div>
          </div>
        </section>

        <section className={styles.tasksSection}>
          <h2 className={styles.summaryTitle}>Filhos Cadastrados</h2>
          <div>
            {usuario?.filhos?.map((filho) => (
              <div key={filho.id} className={styles.cardFilho}>
                <div className={styles.infoPrincipal}>
                  <p className={styles.nomeFilho}><IoHappy /> {filho.nome}</p>
                  <p className={styles.statsConclusao}><Counter target={filho.tarefas_concluidas} duration={1000} /> tarefas concluídas</p>
                </div>

                <div className={styles.saldoCard}>
                  <Counter target={filho.saldo} duration={1000} /> 🪙
                </div>
              </div>
            ))}
          </div>
          <br />
          <h2 className={styles.tasksTitle}>Tarefas ativas</h2>

          <div className={styles.taskList}>
            {usuario?.filhos?.map((filho) => (
              filho.tarefas?.filter((task) => task.status_tarefa === "A_FAZER")
                .map((task) => (
                  <div key={task.id_tarefa} className={styles.taskCard}>
                    <div className={styles.taskLeft}>
                      <span className={styles.taskIcon}>
                        <FiCheckSquare />
                      </span>

                      <div>
                        <h3 className={styles.taskName}>{task.nome_tarefa}</h3>

                        <p className={styles.taskMeta}>
                          {filho.nome}<br /><span><FaClock /> {formatarData(task.expiracao_tarefa)}...</span>
                        </p>
                      </div>
                    </div>

                    <div className={styles.taskRight}>
                      <div className={styles.points}>
                        <span><Counter target={task.valor_tarefa} duration={1000} /></span>
                        🪙
                      </div>

                      <button className={styles.deleteBtn} onClick={() => deletarTask(task.id_tarefa)}>
                        <IoTrashOutline />
                      </button>
                    </div>
                  </div>
                ))
            ))}
          </div>

          <button className={styles.addButton} onClick={() => { navigate("/adicionartarefa") }}>
            + Adicionar Tarefa
          </button>

          <button className={styles.analysisButton} onClick={() => { navigate("/analisepai") }}>
            <LuFileSearch2 />
            <span>Em Análise</span>
            <span className={styles.badgeBlue}>
              <Counter target={usuario?.filhos?.reduce((acumulador, filho) => {
                const tarefasEmAnalise = filho.tarefas?.filter(
                  (task) => task.status_tarefa === "ANALISE"
                ) || [];

                return acumulador + tarefasEmAnalise.length
              }, 0)} duration={500} />
            </span>
          </button>

          <button className={styles.expiredButton} onClick={() => navigate("/tarefaexpirada")}>
            <IoIosCloseCircleOutline />
            <span>Expiradas</span>
            <span className={styles.badgeRed}>
              <Counter target={usuario?.filhos?.reduce((acumulador, filho) => {
                const tarefasExpiradas = filho.tarefas?.filter(
                  (task) => task.status_tarefa === "EXPIRADA"
                ) || [];

                return acumulador + tarefasExpiradas.length
              }, 0)} duration={500} />
            </span>
          </button>
        </section>
      </div>


      <MenuInferior abaAtiva="tarefas" usuario={"pai"} />

    </div>
  );
}