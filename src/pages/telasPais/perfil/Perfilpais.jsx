import styles from "./perfil.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import LoadingScreen from "../../components/LoadingScreen";
import Counter from "../../components/Counter";

export default function PerfilPais() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await api.get("/responsaveis/detalhe-responsavel");
        setUsuario(response.data);
        setLoading(false)
      } catch (error) {
        console.error("Erro em coletar usuário: ", error);
      }
    };

    fetchUsuario();
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  }

  if(loading){
    return <LoadingScreen/>
  }

  return (
    <div className={styles.screen}>
      {/* HEADER */}
      <header className={styles.header}>
        <h1 className={styles.logo}>TASKCOIN</h1>
      </header>

      {/* PERFIL */}
      <section className={styles.profileSection}>
        <div className={styles.profileAvatar}><p>👤</p></div>

        <h2 className={styles.profileName}>{usuario.nome}</h2>

        <p className={styles.profileType}>Conta de Pai</p>
      </section>

      {/* FILHOS */}
      <section className={styles.childrenSection}>
        <div className={styles.childrenHeader}>
          Filhos Cadastrados
        </div>

        <div className={styles.childrenList}>
          {usuario?.filhos?.map((filho) => (
            <p>{filho.nome} <br/> <span>Nv. {filho.nivel?.nivel} - {filho.nivel?.titulo_nivel}</span></p>
          ))}
        </div>
      </section>

    {/* LOGOUT */ }
    < div className = { styles.logoutSection } >
      <button className={styles.logoutButton} onClick={() => logout()}>
        ↪ Sair da Conta
      </button>
    </div >

    {/* NAVBAR */ }
    <nav className = "bottomNav" >
        <button className="navBtn" onClick={() => { navigate("/tarefaspai") }}>
          <span className="navIcon">☑️</span>
          <span className="navText">Tarefas</span>
        </button>

        <button className="navBtn" onClick={() => { navigate("/conquistaspai") }}>
          <span className="navIcon">🌟</span>
          <span className="navText">Conquistas</span>
        </button>

        <button className="navBtn active">
          <span className="navIcon">👤</span>
          <span className="navText">Perfil</span>
        </button>
      </nav >
    </div >
  );
}