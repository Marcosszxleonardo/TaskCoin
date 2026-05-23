import "./tarefasfilho.css";

export default function TarefaFilho() {
  return (
    <div className="screen">

      <header className="header">
        <h1 className="logo">TASKCOIN</h1>
        <span className="greeting">Olá Marcos!</span>
      </header>

      <section className="pointsCard">

        <span className="pointsLabel">
          Pontos:
        </span>

        <div className="pointsInfo">
          <span className="coin">🪙</span>
          <span className="pointsNumber">130</span>
        </div>

      </section>

      <section className="levelCard">

        <div className="levelTop">
          <h2>Nv. 1 - Iniciante das Virtudes</h2>
          <span>65%</span>
        </div>

        <div className="progressBar">
          <div className="progressFill"></div>
        </div>

        <p>3/5 Tarefas concluídas</p>

      </section>

      <section className="tasksSection">

        <h2 className="tasksTitle">
          Tarefas do dia
        </h2>

        {/* CARD 1 */}

        <div className="taskCard">

          <div className="taskHeader">

            <div>

              <span className="taskDate">
                ⏳ 05/05/2026
              </span>

              <div className="taskContent">

                <span className="taskEmoji">
                  📚
                </span>

                <div>

                  <h3 className="taskName">
                    Estudar Matemática
                  </h3>

                  <p className="taskMeta">
                    Semanal
                  </p>

                </div>

              </div>

            </div>

            <div className="taskRight">

              <span className="taskPoints">
                50 🪙
              </span>

              <span className="arrow">
                ˅
              </span>

            </div>

          </div>

          <button className="completeButton">
            Marcar como concluída
          </button>

        </div>

        {/* CARD 2 */}

        <div className="taskCard">

          <div className="taskHeader">

            <div>

              <span className="taskDate">
                ⏳ 05/05/2026
              </span>

              <div className="taskContent">

                <span className="taskEmoji">
                  🧹
                </span>

                <div>

                  <h3 className="taskName">
                    Limpar a casa
                  </h3>

                  <p className="taskMeta">
                    Mensal
                  </p>

                </div>

              </div>

            </div>

            <div className="taskRight">

              <span className="taskPoints">
                90 🪙
              </span>

              <span className="arrow">
                ˅
              </span>

            </div>

          </div>

          <div className="analysis">
            Em análise... ⏰
          </div>

        </div>

        {/* CARD 3 */}

        <div className="taskCard expanded">

          <div className="taskHeader">

            <div>

              <span className="taskDate today">
                ✨ Hoje...
              </span>

              <div className="taskContent">

                <span className="taskEmoji">
                  🧼
                </span>

                <div>

                  <h3 className="taskName">
                    Limpar a casa
                  </h3>

                  <p className="taskMeta">
                    Mensal
                  </p>

                </div>

              </div>

            </div>

            <div className="taskRight">

              <span className="taskPoints">
                10 🪙
              </span>

              <span className="arrow">
                ˄
              </span>

            </div>

          </div>

          <ul className="subtasks">
            <li>Limpar o Quintal</li>
            <li>Limpar o Seu Quarto</li>
            <li>Limpar o Banheiro</li>
          </ul>

          <button className="completeButton">
            Marcar como concluída
          </button>

        </div>

      </section>

      {/* NAVBAR */}

      <nav className="bottomNav">

        <button className="navBtn active">
          <span className="navIcon">☑️</span>
          <span className="navText">Tarefas</span>
        </button>

        <button className="navBtn">
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