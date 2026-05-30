import { TaskCoinLogo } from "./TaskCoinLogo";
import styles from "./ParentRegistrationForm.module.css";
import { useState } from "react";

export default function CadastrarResponsavel({ onSubmit }) {
  const [form, setForm] = useState({
    nome_pai: "",
    email_pai: "",
    senha_pai: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (form.nome_pai && form.email_pai && form.senha_pai) {
      onSubmit(form); 
    } else {
      alert("Preencha todos os campos do responsável");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#fff",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "412px",
          padding: "40px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TaskCoinLogo />
        <div className={styles.container}>
          <div className={styles.header}>
            <span className={styles.headerTitle}>
              Cadastro do Responsável
            </span>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="text"
              name="nome_pai"
              placeholder="Nome completo"
              value={form.nome_pai}
              onChange={handleChange}
              className={styles.input}
              autoComplete="off"
              required
            />

            <input
              type="email"
              name="email_pai"
              placeholder="E-mail"
              value={form.email_pai}
              onChange={handleChange}
              className={styles.input}
              autoComplete="off"
              required
            />

            <input
              type="password"
              name="senha_pai"
              placeholder="Senha"
              value={form.senha_pai}
              onChange={handleChange}
              className={styles.input}
              autoComplete="off"
              required
            />

            <button className={styles.btnContinuar} type="submit">Continuar</button>

          </form>
        </div>
      </div>
    </div>
  );
}