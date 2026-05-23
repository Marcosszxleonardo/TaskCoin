import styles from "./TaskCoinLogo.module.css";

export function TaskCoinLogo() {
  return (
    <div className={styles.container}>
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/063a8574758beff68c710db5d083fb52f7c873e4?width=578"
        alt="TaskCoin logo"
        className={styles.logo}
      />

      <h1 className={styles.title}>TASKCOIN</h1>

      <p className={styles.tagline}>Disciplina que recompensa</p>
    </div>
  );
}