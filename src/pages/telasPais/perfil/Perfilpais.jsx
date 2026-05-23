import "./perfil.css";

export default function PerfilPais() {
  return (
    <div className="screen">
      {/* HEADER */}
      <header className="header">
        <h1 className="logo">TASKCOIN</h1>
      </header>

      {/* PERFIL */}
      <section className="profileSection">
        <div className="profileAvatar">👤</div>

        <h2 className="profileName">Jefferson</h2>

        <p className="profileType">Conta de Pai</p>
      </section>

      {/* FILHOS */}
      <section className="childrenSection">
        <div className="childrenHeader">
          👨‍👦 Filhos Cadastrados
        </div>

        <div className="childrenList">
          <p>Marcos - 130 Pontos</p>
          <p>Gustavo - 180 Pontos</p>
          <p>Pedro Belo - 200 Pontos</p>
        </div>
      </section>

      {/* LOGOUT */}
      <div className="logoutSection">
        <button className="logoutButton">
          Sair da Conta
        </button>
      </div>

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