import { useState } from "react";
import styles from "./Login.module.css";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [role, setRole] = useState("parent");

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();

  const HandleCadastrar = () => {
    console.log("Cadastrar");
    return navigate("/cadastrar");
  };


  const HandleLogar = () => {
    console.log("tarefaspai");
    return navigate("/tarefaspai");
  };

  const handleLoginChild = async (e) => {
    e.preventDefault();
    localStorage.removeItem('token');

    const dados = {
      email: email,
      senha: senha
    }

    try {
      const response = await api.post('/auth/filhos', dados);
      const token = response.data.token;
      localStorage.setItem('token', token);
      console.log("Login filho bem-sucedido", response.data);
      navigate("/tarefasfilho");
    } catch (error) {
      console.error("Erro ao logar", error);
    }
  }

  const handleLoginParent = async (e) => {
    e.preventDefault();
    localStorage.removeItem('token');

    const dados = {
      email: email,
      senha: senha
    }

    try {
      const response = await api.post('/auth/responsaveis', dados);
      const token = response.data.token;
      localStorage.setItem('token', token);
      console.log("Login filho bem-sucedido", response.data);
      navigate("/tarefasfilho");
    } catch (error) {
      console.error("Erro ao logar", error);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <img
          className={styles.logo}
          src="https://api.builder.io/api/v1/image/assets/TEMP/063a8574758beff68c710db5d083fb52f7c873e4?width=578"
          alt="Taskcoin"
        />

        <h1 className={styles.title}>
          TASKCOIN
        </h1>

        <p className={styles.tagline}>
          Disciplina que recompensa
        </p>

        <div className={styles.toggle}>
          <button
            type="button"
            className={`${styles.toggleBtn} ${role === "parent"
              ? styles.active
              : ""
              }`}
            onClick={() => setRole("parent")}
          >
            Pai / Mãe
          </button>

          <button
            type="button"
            className={`${styles.toggleBtn} ${role === "child"
              ? styles.active
              : ""
              }`}
            onClick={() => setRole("child")}
          >
            Filho(a)
          </button>
        </div>

        <form
          key={role}
          className={styles.form}
        >
          <div
            className={styles.formContent}
          >
            <>
              <input
                className={styles.input}
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />

              <input
                className={styles.input}
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) =>
                  setSenha(e.target.value)
                }
                required
              />
            </>
          </div>

          {role === "parent" ? (
            <button
              type="submit"
              className={styles.btnEntrar}
              onClick={handleLoginParent}
            >
              Entrar
            </button>
          ) : (
            <button
              type="submit"
              className={styles.btnEntrar}
              onClick={handleLoginChild}
            >
              Entrar
            </button>
          )}

        </form>

        <div className={styles.accountRow}>
          <button
            type="button"
            className={styles.accountLink}
          >
            Não possui uma conta?
          </button>
        </div>

        <button className={styles.btnCadastrar} onClick={HandleCadastrar}>
          Cadastrar
        </button>

        {/* <Link
          to="/cadastrar"
          className={styles.btnCadastrar}
        >
          Cadastrar
        </Link> */}
      </div>
    </div>
  );
}