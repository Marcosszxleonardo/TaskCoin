import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { IoReturnUpBack } from "react-icons/io5";

export default function Header({ mostrarVoltar = false }) {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.headerRow}>

        {mostrarVoltar && (
          <button
            className={styles.backButton}
            onClick={() => navigate(-1)}
          >
            <IoReturnUpBack/>
          </button>
        )}

        <h1 className={styles.logo}>TASKCOIN</h1>

      </div>
    </header>
  );
}