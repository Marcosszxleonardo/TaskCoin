import styles from "./PerfilFilho.module.css";
import api from "../../../services/api";
import LoadingScreen from "../../components/LoadingScreen"
import MenuInferior from "../../components/MenuInferior/MenuInferior";
import avatar from "../../../assets/avatar.svg"
import "../../../global.css"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function PerfilFilho() {
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

        <div className={styles.profileAvatar}>
          <span><img src={avatar} /></span>
        </div>

        <h2 className={styles.profileName}>
          {usuario.nome}
        </h2>

        <span className={styles.profileType}>
          Conta de Filho
        </span>

      </section>

      {/* SECTIONS RESPONSÁVEL-NIVEL */}

      <section className={styles.linkedSection}>

        <div className={styles.linkedHeader}>
          <span className={styles.linkedTitle}>
            Responsável Vinculado
          </span>

        </div>

        <div className={styles.linkedBody}>
          {usuario?.responsavel?.nome}
          <span>{usuario?.responsavel?.email}</span>
        </div>

      </section>

      {/* SAIR */}

      <section className={styles.logoutSection}>

        <button className={styles.logoutButton} onClick={() => logout()}>
          ↪ Sair da Conta
        </button>

      </section>

      <MenuInferior abaAtiva="perfil" usuario={"filho"} />
    </div>
  );
}