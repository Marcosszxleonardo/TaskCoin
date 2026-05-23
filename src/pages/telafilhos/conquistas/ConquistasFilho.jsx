import "./ConquistasFilho.css";

export default function ConquistasFilho() {
  return (
    <div className="screen">

      <header className="header">
        <div className="headerRow">
          <h1 className="logo">TASKCOIN</h1>
          <span className="greeting">Olá Marcos!</span>
        </div>
      </header>

      <section className="pointsCard">

        <span className="pointsTitle">
          Pontos:
        </span>

        <div className="pointsRight">
          <div className="coin">P</div>
          <span className="pointsValue">130</span>
        </div>

      </section>

      <section className="progressCard">

        <div className="progressTop">
          <h2>Nv. 1 - Iniciante das Virtudes</h2>
          <span>65%</span>
        </div>

        <div className="progressBar">
          <div className="progressFill"></div>
        </div>

        <p>3/5 Tarefas concluídas</p>

      </section>

      <section className="section">

        <h2 className="sectionTitle">
          Adquira sua conquista
        </h2>

        <div className="rewardMain">

          <div>
            <h3>
              Ida em família ao
              Mc'Donalds
            </h3>
          </div>

          <div className="rewardMainRight">
            <div className="checkBox">✓</div>
            <span>Adquirido</span>
          </div>

        </div>

        <div className="rewardCard">

          <div className="rewardLeft">

            <div className="medal">
              🏅
            </div>

            <div>
              <h3>
                Passeio no Parque Ibirapuera
              </h3>

              <div className="rewardPoints">
                300 🪙
              </div>
            </div>

          </div>

          <div className="rewardRight">

            <span className="happy">
              😊
            </span>

            <button className="rewardBtn">
              Resgatar
            </button>

          </div>

        </div>

        <div className="rewardCard">

          <div className="rewardLeft">

            <div className="medal">
              🏅
            </div>

            <div>
              <h3>
                Assistir filme em família
              </h3>

              <div className="rewardPoints">
                1000 🪙
              </div>
            </div>

          </div>

          <div className="rewardRight">

            <span className="sad">
              ☹️
            </span>

            <span className="insufficient">
              Pontos insuficiente
            </span>

          </div>

        </div>

      </section>

      {/* NAVBAR */}
      <nav className="bottomNav">

        <button className="navBtn">
          <span className="navIcon">☑️</span>
          <span className="navText">Tarefas</span>
        </button>

        <button className="navBtn navBtnActive">
          <span className="navIcon">😊</span>
          <span className="navText">Conquistas</span>
        </button>

        <button className="navBtn">
          <span className="navIcon">👤</span>
          <span className="navText">Perfil</span>
        </button>

      </nav>

    </div>
  );
}