import "./perfil.css";

export default function Perfilpais() {
  return (
    <div className="container">
      {/* HEADER */}
      <header className="header">
        <h1 className="logo">TASKCOIN</h1>
      </header>

      {/* PERFIL */}
      <section className="profileSection">
        <div className="avatarBackground">
          <div className="avatarIcon">👤</div>
        </div>

        <h2 className="name">Jefferson</h2>

        <p className="accountType">Conta de Pai</p>
      </section>

      {/* FILHOS */}
      <section className="childrenSection">
        <div className="childrenHeader">
          <span>👨‍👦</span>
          <h3>Filhos Cadastrados</h3>
        </div>

        <div className="childrenList">
          <p>Marcos - 130 Pontos</p>
          <p>Gustavo - 180 Pontos</p>
          <p>Pedro Belo - 200 Pontos</p>
        </div>
      </section>

      {/* SAIR */}
      <button className="logoutButton">
        ↪ Sair da Conta
      </button>

      {/* NAVBAR */}
      <nav className="bottomBar">
        <button className="navItem">
          <div className="navIconBox">
            ☑️
          </div>
          <span>Tarefas</span>
        </button>

        <button className="navItem">
          <div className="navIconBox">
            😊
          </div>
          <span>Conquistas</span>
        </button>

        <button className="navItem active">
          <div className="navIconBox activeBox">
            👤
          </div>
          <span>Perfil</span>
        </button>
      </nav>
    </div>
  );
}