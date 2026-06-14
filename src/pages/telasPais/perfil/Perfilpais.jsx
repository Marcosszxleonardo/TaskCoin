import styles from "./perfil.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import avatarPai from "../../../assets/avatarPai.svg"
import api from "../../../services/api";
import LoadingScreen from "../../components/LoadingScreen";
import Counter from "../../components/Counter";
import MenuInferior from '../../components/MenuInferior/MenuInferior.jsx';

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

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <div className={styles.screen}>
      {/* HEADER */}
      <header className={styles.header}>
        <h1 className={styles.logo}>TASKCOIN</h1>
      </header>

      {/* PERFIL */}
      <section className={styles.profileSection}>
        <div className={styles.profileAvatar}><p><img src={avatarPai} /></p></div>

        <h2 className={styles.profileName}>{usuario.nome}</h2>

        <p className={styles.profileType}>Conta de Responsável</p>
      </section>

      {/* FILHOS */}
      <section className={styles.childrenSection}>
        <div className={styles.childrenHeader}>
          Filhos Cadastrados
        </div>

        <div className={styles.childrenList}>
          {usuario?.filhos?.map((filho) => (
            <p>{filho.nome} <br /> <span>Nv. {filho.nivel?.nivel} - {filho.nivel?.titulo_nivel}</span></p>
          ))}
        </div>
      </section>

      {/* LOGOUT */}
      < div className={styles.logoutSection} >
        <button className={styles.logoutButton} onClick={() => logout()}>
          ↪ Sair da Conta
        </button>
      </div >

      <MenuInferior abaAtiva="perfil" usuario={"pai"}/>
    </div >
  );
}