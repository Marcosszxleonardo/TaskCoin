import { useState } from "react";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";

export default function Login() {
  const [role, setRole] = useState("parent");

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");


  const [childEmail, setChildEmail] =
    useState("");

  const [childPassword, setChildPassword] =
    useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const payload =
      role === "parent"
        ? {
          role,
          email,
          password,
        }
        : {
          role,
          email: childEmail,
          password: childPassword,
        };

    console.log(payload);
  };

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
          className={styles.form}
          onSubmit={handleLogin}
        >
          <div
            key={role}
            className={styles.formContent}
          >
            {role === "parent" ? (
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
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                />
              </>
            ) : (
              <>
                <input
                  className={styles.input}
                  type="email"
                  placeholder="E-mail"
                  value={childEmail}
                  onChange={(e) =>
                    setChildEmail(
                      e.target.value
                    )
                  }
                  required
                />

                <input
                  className={styles.input}
                  type="password"
                  placeholder="Senha"
                  value={childPassword}
                  onChange={(e) =>
                    setChildPassword(
                      e.target.value
                    )
                  }
                  required
                />
              </>
            )}
          </div>

          <button
            type="submit"
            className={styles.btnEntrar}
          >
            Entrar
          </button>
        </form>

        <div className={styles.accountRow}>
          <button
            type="button"
            className={styles.accountLink}
          >
            Não possui uma conta?
          </button>
        </div>

        <Link
          to="/cadastrar"
          className={styles.btnCadastrar}
        >
          Cadastrar
        </Link>
      </div>
    </div>
  );
}