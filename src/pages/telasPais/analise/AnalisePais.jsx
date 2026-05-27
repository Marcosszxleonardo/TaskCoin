import './AnalisePais.css';

export default function AnalisePais() {

  const tarefas = [
    {
      titulo: 'Estudar pra prova FIAP',
      nome: 'Gustavo',
    },

    {
      titulo: 'Estudar Matemática',
      nome: 'Marcos',
    },
  ];

  return (
    <div className="pageBg">

      <div className="phoneContainer">

        {/* HEADER */}
        <div className="topoAnalise">

          <button className="voltarBtn">
            ↩
          </button>

          <h1>
            Tarefas em <span>Análise</span>
          </h1>

          <button className="olhoBtn">
            👁
          </button>

        </div>

        <p className="subtitulo">
          Confirme e analise as tarefas concluídas pelos seus filhos
        </p>

        {/* CARDS */}
        <div className="cardsArea">

          {tarefas.map((tarefa, index) => (

            <div className="cardTarefa" key={index}>

              <div className="cardTop">

                <div className="infoTarefa">

                  <span className="emoji">
                    📚
                  </span>

                  <div>
                    <h3>{tarefa.titulo}</h3>
                    <p>{tarefa.nome}</p>
                  </div>

                </div>

                <button className="lixeiraBtn">
                  🗑
                </button>

              </div>

              <button className="confirmarBtn">
                Confirmar
              </button>

              <span className="confirmadoTexto">
                {tarefa.nome} marcou como concluída
              </span>

            </div>

          ))}

        </div>

        {/* NAVBAR */}
        <nav className="bottomNav">

          <button className="navBtn active">
            <span className="navIcon">📋</span>
            <span className="navText">Tarefas</span>
          </button>

          <button className="navBtn">
            <span className="navIcon">🏆</span>
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