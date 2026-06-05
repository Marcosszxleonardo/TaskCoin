import React from 'react';
import { BiTask } from "react-icons/bi";
import { LuSmile } from "react-icons/lu";
import { FiUser } from "react-icons/fi";
import { GoTasklist } from "react-icons/go";
import styles from "./MenuInferior.module.css";
import { useNavigate } from 'react-router';

export default function MenuInferior({ abaAtiva, usuario }) {
    const navigate = useNavigate();

    return (
        <div>
            <nav className={styles.bottomNav} data-page={abaAtiva}>
                <button className={styles.navBtn} onClick={() => navigate(`/tarefas${usuario}`)}>
                    <span className={styles.navIcon}>
                        <GoTasklist />
                    </span>
                    <span className={styles.navText}>Tarefas</span>
                </button>

                <button className={styles.navBtn} onClick={() => navigate(`/conquistas${usuario}`)}>
                    <span className={styles.navIcon}>
                        <LuSmile />
                    </span>
                    <span className={styles.navText}>Conquistas</span>
                </button>

                <button className={styles.navBtn} onClick={() => navigate(`/perfil${usuario}`)}>
                    <span className={styles.navIcon}>
                        <FiUser />
                    </span>
                    <span className={styles.navText}>Perfil</span>
                </button>
            </nav>
        </div>
    )
}