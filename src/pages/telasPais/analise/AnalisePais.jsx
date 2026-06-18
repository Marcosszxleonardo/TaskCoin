import styles from './AnalisePais.module.css';
import api from "../../../services/api";
import { useNavigate } from 'react-router';
import { useEffect, useState } from "react";
import { FiCheckSquare } from "react-icons/fi";
import MenuInferior from '../../components/MenuInferior/MenuInferior';
import LoadingScreen from '../../components/LoadingScreen';
import Counter from '../../components/Counter';
import Header from '../../components/Header/Header';

const TrashIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path
      d="M3 6H5H21"
      stroke="#444"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M8 6V4C8 3.4 8.4 3 9 3H15C15.6 3 16 3.4 16 4V6"
      stroke="#444"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M19 6V20C19 20.5 18.5 21 18 21H6C5.5 21 5 20.5 5 20V6"
      stroke="#444"
      strokeWidth="2"
    />
  </svg>
);

export default function AnalisePais() {
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

  const confirmarTarefa = async (id) => {
    try {
      const response = await api.put("/tarefas", {
        id_tarefa: id,
        status_tarefa: "CONCLUIDA"
      });

      setUsuario(prevUsuario => ({
        ...prevUsuario,

        filhos: prevUsuario.filhos?.map(filho => ({
          ...filho,
          tarefas: filho.tarefas?.filter(tarefa => tarefa.id_tarefa !== id)
        }))
      }));
    } catch (error) {
      alert("Erro ao confirmar conclusão da tarefa")
      console.error("ERRO AO CONFIRMAR TAREFA: " + error)
    }
  }

  const retornarTarefa = async (id) => {
    try {
      const response = await api.put("/tarefas", {
        id_tarefa: id,
        status_tarefa: "A_FAZER"
      })

      setUsuario(prevUsuario => ({
        ...prevUsuario,

        filhos: prevUsuario.filhos?.map(filho => ({
          ...filho,
          tarefas: filho.tarefas?.filter(tarefa => tarefa.id_tarefa !== id)
        }))
      }));
    } catch (error) {
      alert("Erro ao rejeitar conclusão da tarefa")
      console.error("ERRO AO REJEITAR TAREFA: " + error)
    }
  };

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <div className={styles.pageBg}>

      {/* HEADER */}
      <Header mostrarVoltar/>
      <div className={styles.section}>

        <div className={styles.tituloArea}>
          <div className={styles.tituloTOP}>
            <h1>
              Tarefas em <span>Análise</span>
            </h1>
          </div>
          <p className={styles.subtitulo}>
            Confirme e analise as tarefas marcadas como concluídas pelos seus filhos
          </p>
        </div>


        {/* CARDS */}
        <div className={styles.cardsArea}>
          {usuario?.filhos?.map((filho) => (
            filho.tarefas.filter((task) => task.status_tarefa === "ANALISE").map((task) => (
              <div className={styles.cardTarefa} key={task.id_tarefa}>

                <div className={styles.cardTop}>

                  <div className={styles.infoTarefa}>

                    <span className={styles.emoji}>
                      <FiCheckSquare />
                    </span>

                    <div>
                      <h3>{task.nome_tarefa}</h3>
                      <p>{filho.nome}</p>
                    </div>

                  </div>

                  <button className={styles.lixeiraBtn} onClick={() => retornarTarefa(task.id_tarefa)}>
                    <TrashIcon />
                  </button>

                </div>

                <button className={styles.confirmarBtn} onClick={() => confirmarTarefa(task.id_tarefa)}>
                  Confirmar Conclusão
                </button>

                <span className={styles.confirmadoTexto}>
                  {filho.nome} marcou como concluída
                </span>

              </div>
            ))))}
          <br /><br /><br /><br />
        </div>
      </div>

      <MenuInferior abaAtiva="tarefas" usuario={"pai"} />
    </div>
  );
}