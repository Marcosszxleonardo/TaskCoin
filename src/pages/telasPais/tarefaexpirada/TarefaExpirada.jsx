import styles from './TarefaExpirada.module.css';
import api from "../../../services/api";
import { useNavigate } from 'react-router';
import { useEffect, useState } from "react";
import { FiCheckSquare } from "react-icons/fi";
import { MdOutlineTaskAlt } from "react-icons/md";
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

export default function TarefaExpiradas() {
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

  const penalizarTarefa = async (id) => {
    try {
      await api.put("/tarefas", {
        id_tarefa: id,
        status_tarefa: "PENALIZADA"
      });

      setUsuario(prev => ({
        ...prev,
        filhos: prev.filhos.map(filho => ({
          ...filho,
          tarefas: filho.tarefas.filter(task => task.id_tarefa !== id)
        }))
      }));
    } catch (error) {
      alert("Erro ao confirmar penalização da tarefa")
      console.error("ERRO AO PENALIZAR TAREFA: " + error)
    }
  }

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <div className={styles.screen}>

      <Header mostrarVoltar />

      <div className={styles.section}>

        <div className={styles.tituloArea}>
          <div className={styles.tituloTOP}>

            <h1>
              Tarefas <span>Expiradas</span>
            </h1>
          </div>
          <p className={styles.subtitulo}>
            Confirme se irá penalizar ou não o seu filho pelas tarefas expiradas
          </p>
        </div>

        {/* CARDS */}
        <div className={styles.cardsArea}>
          {usuario?.filhos?.map((filho) => (
            filho.tarefas.filter((task) => task.status_tarefa === "EXPIRADA").map((task) => (
              <div className={styles.cardTarefa} key={task.id_tarefa}>

                <div className={styles.cardTop}>

                  <div className={styles.infoTarefa}>

                    <span className={styles.emoji}>
                      <MdOutlineTaskAlt />
                    </span>

                    <div>
                      <h3>{task.nome_tarefa}</h3>
                      <p>{filho.nome}</p>
                    </div>

                  </div>

                </div>

                <button className={styles.confirmarBtn} onClick={() => penalizarTarefa(task.id_tarefa, task.valor_tarefa, filho.id, filho.saldo_pontos)}>
                  Penalizar
                </button>

                <span className={styles.confirmadoTexto}>
                  {filho.nome} não concluiu essa tarefa
                </span>

              </div>
            ))))}

        </div>
      </div>


      <MenuInferior abaAtiva="tarefas" usuario={"pai"} />
    </div>
  );
}