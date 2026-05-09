import styles from "./Cadastro.module.css";

export default function Cadastro() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.imageWrapper}>
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/e6b58548dea0e316d8e0fced3e2b7b00cba5319d?width=578"
            alt="Criança"
            className={styles.image}
          />
        </div>

        <p className={styles.subtitle}>
          Associe seu filho!
        </p>

        <h1 className={styles.heading}>
          Deseja adicionar mais filhos à sua conta?
        </h1>

        <div className={styles.buttonsContainer}>
          <button
            className={`${styles.button} ${styles.buttonGreen}`}
          >
            <span>Sim, adicionar mais</span>

            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M5 12H19"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />

              <path
                d="M12 5L19 12L12 19"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            className={`${styles.button} ${styles.buttonBlue}`}
          >
            <span>Confirmar</span>

            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M5 12H19"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />

              <path
                d="M12 5L19 12L12 19"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}