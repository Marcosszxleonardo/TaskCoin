import "./conquistas.css";
import { useState } from "react";

const TrophyIcon = () => {
  return <div className="trophyIcon">🏅</div>;
};

const CoinIcon = () => {
  return <div className="coin">₱</div>;
};

const TrashIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path
      d="M3 6H5H21"
      stroke="#444"
      strokeWidth="2"
      strokeLinecap="round"
    />

    <path
      d="M8 6V4C8 3.4 8.4 3 9 3H15C15.6 3 16 3.4 16 4V6"
      stroke="#444"
      strokeWidth="2"
      strokeLinecap="round"
    />

    <path
      d="M19 6V20C19 20.5 18.5 21 18 21H6C5.5 21 5 20.5 5 20V6"
      stroke="#444"
      strokeWidth="2"
    />
  </svg>
);

const conquistasData = [
  {
    id: 1,
    titulo: "Ida em família ao Mc'Donalds",
    pontos: 200,
    resgates: 0,
  },

  {
    id: 2,
    titulo: "Passeio no Parque Ibirapuera",
    pontos: 300,
    resgates: 2,
  },

  {
    id: 3,
    titulo: "Passeio no Zoológico",
    pontos: 300,
    resgates: 0,
  },
];

export default function Conquistaspais() {
  const [conquistas, setConquistas] = useState(conquistasData);

  function deletarConquista(id) {
    setConquistas(conquistas.filter((item) => item.id !== id));
  }

  return (
    <div className="screen">
      {/* HEADER */}
      <header className="header">
        <div className="headerTop">
          <span className="logo">TASKCOIN</span>

          <span className="greeting">Olá Jefferson!</span>
        </div>
      </header>

      {/* CONTEUDO */}
      <section className="section">
        <h1 className="title">Conquistas Cadastradas</h1>

        <div className="cards">
          {conquistas.map((conquista) => (
            <div className="card" key={conquista.id}>
              {/* ESQUERDA */}
              <div className="left">
                <TrophyIcon />

                <div className="info">
                  <h2>{conquista.titulo}</h2>

                  <div className="points">
                    <CoinIcon />

                    <span>{conquista.pontos}</span>
                  </div>
                </div>
              </div>

              {/* DIREITA */}
              <div className="right">
                <button
                  className="deleteBtn"
                  onClick={() => deletarConquista(conquista.id)}
                >
                  <TrashIcon />
                </button>

                <span className="resgates">
                  {conquista.resgates} Resgates
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* BOTAO */}
        <button className="addButton">
          + Adicionar Conquistas
        </button>
      </section>

      {/* NAVBAR */}
      <nav className="bottomNav">
        <button className="navBtn">
          <span className="navIcon">☑️</span>
          <span>Tarefas</span>
        </button>

        <button className="navBtn active">
          <span className="navIcon">😊</span>
          <span>Conquistas</span>
        </button>

        <button className="navBtn">
          <span className="navIcon">👤</span>
          <span>Perfil</span>
        </button>
      </nav>
    </div>
  );
}