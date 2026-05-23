import "./PerfilFilho.css";

export default function PerfilFilho() {
  return (
    <div className="screen">

      {/* HEADER */}

      <header className="header">
        <h1 className="logo">TASKCOIN</h1>
      </header>

      {/* PERFIL */}

      <section className="profileSection">

        <div className="profileAvatar">
          👤
        </div>

        <h2 className="profileName">
          Marcos
        </h2>

        <span className="profileType">
          Conta de Filho
        </span>

      </section>

      {/* RESPONSÁVEL */}

      <section className="linkedSection">

        <div className="linkedHeader">

          <span className="linkedIcon">
            👥
          </span>

          <span className="linkedTitle">
            Responsável Vinculado
          </span>

        </div>

        <div className="linkedBody">
          Gustavinha - Mãe
        </div>

      </section>

      {/* SAIR */}

      <section className="logoutSection">

        <button className="logoutButton">
          ↪ Sair da Conta
        </button>

      </section>

      {/* NAVBAR */}

      <nav className="bottomNav">

        <button className="navBtn">
          <span className="navIcon">☑️</span>
          <span className="navText">Tarefas</span>
        </button>

        <button className="navBtn">
          <span className="navIcon">😊</span>
          <span className="navText">Conquistas</span>
        </button>

        <button className="navBtn active">
          <span className="navIcon">👤</span>
          <span className="navText">Perfil</span>
        </button>

      </nav>

    </div>
  );
}