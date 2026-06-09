import { TaskCoinLogo } from "./TaskCoinLogo";
import styles from "./ParentRegistrationForm.module.css";
import { useState } from "react";
import TaskcoinIcon from "../../../assets/taskcoinIcon-removebg.png"

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
      className={styles.page}
    >
      <div
        style={{
          height: "100vh",
          width: "100%",
          padding: "0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <div className={styles.container}>
          <div className={styles.header}>
            <img src={TaskcoinIcon} className={styles.taskcoinIcon} alt="Logo do TaskCoin" />
            <h1 className={styles.taskcoinTitle}>TASKCOIN</h1>
            <p className={styles.tagline}>
              Disciplina que recompensa
            </p>
          </div>
          <div className={styles.formContainer}><div className={styles.headerTitle}>
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
            >
              <g clipPath="url(#clip0_users)">
                <path
                  d="M25.5 31.5V28.5C25.5 26.9087 24.8679 25.3826 23.7426 24.2574C22.6174 23.1321 21.0913 22.5 19.5 22.5H7.5C5.9087 22.5 4.38258 23.1321 3.25736 24.2574C2.13214 25.3826 1.5 26.9087 1.5 28.5V31.5M34.5 31.5V28.5C34.499 27.1706 34.0565 25.8792 33.242 24.8285C32.4276 23.7778 31.2872 23.0274 30 22.695M24 4.695C25.2906 5.02545 26.4346 5.77605 27.2515 6.82847C28.0684 7.88088 28.5118 9.17524 28.5118 10.5075C28.5118 11.8398 28.0684 13.1341 27.2515 14.1865C26.4346 15.2389 25.2906 15.9895 24 16.32M19.5 10.5C19.5 13.8137 16.8137 16.5 13.5 16.5C10.1863 16.5 7.5 13.8137 7.5 10.5C7.5 7.18629 10.1863 4.5 13.5 4.5C16.8137 4.5 19.5 7.18629 19.5 10.5Z"
                  stroke="#1A73E8"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>

              <defs>
                <clipPath id="clip0_users">
                  <rect width="36" height="36" fill="white" />
                </clipPath>
              </defs>
            </svg>

            <span className={styles.headerText}>
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
    </div>
  );
}