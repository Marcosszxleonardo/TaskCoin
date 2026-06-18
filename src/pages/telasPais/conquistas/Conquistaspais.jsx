import styles from "./conquistas.module.css";
import "../../../global.css";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import api from "../../../services/api";
import Counter from "../../components/Counter";
import LoadingScreen from "../../components/LoadingScreen";
import MenuInferior from '../../components/MenuInferior/MenuInferior.jsx';
import Header from "../../components/Header/Header.jsx";
import { PiCoinVerticalBold  } from "react-icons/pi";

const TrophyIcon = () => {
  return <div className="trophyIcon">🏅</div>;
};

const CoinIcon = () => {
  return <div className="coin">₱</div>;
};

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

export default function Conquistaspais() {
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
      }
    };

    fetchUsuario();
  }, []);

  if (loading) {
    return <LoadingScreen />
  }

  const deletarConquista = async (id) => {
    try {
      const response = await api.delete(`/recompensas/${id}`);

      setUsuario(prev => ({
        ...prev,
        filhos: prev.filhos.map(filho => ({
          ...filho,
          recompensas: filho.recompensas.filter(recompensa => recompensa.id_recompensa !== id)
        }))
      }));
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
  }

  return (
    <div className={styles.screen}>
      {/* HEADER */}
      <Header/>

      {/* CONTEUDO */}
      <div className={styles.sectionWrapper}>
        <section className={styles.section}>
          <div className={styles.conquistasTitle}>
            <h1 className={styles.title}>Conquistas Cadastradas</h1>
            <p className={styles.subtitulo}> Acompanhe as conquistas criadas e transforme cada objetivo alcançado em um momento de reconhecimento, aprendizado e união familiar.</p>
          </div>
          <div className={styles.achievementsContainer}>
            <div className={styles.cards}>
              {usuario?.filhos?.map((filho) => (
                filho.recompensas?.map((recompensa) => (
                  <div className={styles.card} key={recompensa.id_recompensa}>
                    <div className={styles.left}>
                      <p>🌟</p>

                      <div className={styles.info}>
                        <h2>{recompensa.nome_recompensa}</h2>

                        <div className={styles.points}>
                          <PiCoinVerticalBold/>
                          <span><Counter target={recompensa.valor_recompensa} duration={500} /></span>
                        </div>
                      </div>
                    </div>

                    <div className={styles.right}>
                      {recompensa.status_recompensa === "ADQUIRIDA" ? (
                        <div className={styles.resgatado}>
                          {filho.nome} ADQUIRIU!
                        </div>
                      ) : (
                        <>
                          <button
                            className={styles.deleteBtn}
                            onClick={() => deletarConquista(recompensa.id_recompensa)}
                          >
                            <TrashIcon />
                          </button>

                          <span className={styles.resgates}>
                            {filho.nome} NÃO RESGATOU
                          </span>
                        </>
                      )}
                    </div>
                  </div>))))}
            </div>

            {/* BOTAO */}
            < button className={styles.addButton} onClick={() => { navigate("/adicionarconquista") }}>
              + Adicionar Conquistas
            </button>
          </div>

        </section>
      </div>

      <MenuInferior abaAtiva="conquistas" usuario={"pai"} />

    </div>
  );
}