import React from "react";
import { useNavigate } from "react-router";
import styles from "./ErrorPage.module.css";
import "../global.css"; // Mantendo o mesmo padrão de import do seu app

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.screen}>
      <div className={styles.errorWrapper}>
        {/* Um emoji animado para dar um charme na tela limpa */}
        <span className={styles.emoji} role="img" aria-label="Erro">
          🔍
        </span>
        <h1 className={styles.code}>404</h1>
        <h2 className={styles.title}>Página não encontrada</h2>
        <p className={styles.message}>
          Ops! A tela que você está tentando acessar não existe ou foi movida.
        </p>
      </div>

      {/* Botão integrado com o seu router para voltar em segurança */}
      <button className={styles.backButton} onClick={() => navigate("/tarefas")}>
        Voltar para o Início
      </button>
    </div>
  );
}