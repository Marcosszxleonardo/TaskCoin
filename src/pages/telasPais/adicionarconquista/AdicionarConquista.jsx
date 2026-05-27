import './AdicionarConquista.css';

export default function AdicionarConquista() {
  return (
    <div className="pageBg">

      <div className="phoneContainer">

        {/* HEADER */}
        <div className="topoAdicionar">

          <button className="voltarBtn">
            ↩
          </button>

        </div>

        <div className="tituloArea">

          <h1>
            Adicione uma <br />
            Conquista
          </h1>

          <button className="addBtn">
            +
          </button>

        </div>

        <p className="subtitulo">
          Adicione recompensas para seus filhos comprarem
        </p>

        {/* FORM */}
        <div className="formArea">

          <input
            type="text"
            placeholder="Nome da recompensa"
            className="inputField"
          />

          <input
            type="text"
            placeholder="Preço da recompensa"
            className="inputField"
          />

          <button className="criarBtn">
            Criar
          </button>

        </div>

        {/* NAVBAR */}
        <nav className="bottomNav">

          <button className="navBtn active">
            <span className="navIcon">📋</span>
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

    </div>
  );
}