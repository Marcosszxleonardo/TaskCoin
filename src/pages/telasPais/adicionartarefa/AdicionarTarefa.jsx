import './AdicionarTarefa.css';

export default function AdicionarTarefa() {
  return (
    <div className="pageBg">

      <div className="phoneContainer">

        {/* TOPO */}
        <div className="topoAdicionar">

          <button className="voltarBtn">
            ↩
          </button>

        </div>

        {/* TITULO */}
        <div className="tituloArea">

          <h1>
            Crie uma tarefa
          </h1>

          <button className="addBtn">
            +
          </button>

        </div>

        <p className="subtitulo">
          Crie tarefas para seus filhos realizarem
        </p>

        {/* FORM */}
        <div className="formArea">

          <input
            type="text"
            placeholder="Nome da tarefa"
            className="inputField"
          />

          <div className="dataArea">

            <input
              type="text"
              placeholder="Data de Término"
              className="inputField"
            />

            <span className="dataTexto">
              00/00
            </span>

          </div>

          {/* SELECT */}
          <div className="selectArea">

            <div className="selectTop">
              <span>Filho que fará</span>
              <span className="seta">⌄</span>
            </div>

            <div className="filhosLista">
              <p>Marcos</p>
              <p>Gustavo</p>
              <p>Pedro Belo</p>
            </div>

          </div>

          <input
            type="text"
            placeholder="Valor Recebido"
            className="inputField"
          />

        </div>

        {/* BOTAO */}
        <button className="criarBtn">
          Criar Tarefa
        </button>

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