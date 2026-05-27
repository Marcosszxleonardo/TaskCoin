import './TarefaExpirada.css';

export default function TarefaExpirada() {

  const tarefas = [
    {
      titulo: 'Estudar pra prova de Quimica',
      nome: 'Gustavo',
    },

    {
      titulo: 'Estudar Português',
      nome: 'Marcos',
    },
  ];

  return (
    <div className="pageBg">

      <div className="phoneContainer">

        {/* HEADER */}
        <div className="topoExpirada">

          <button className="voltarBtn">
            ↩
          </button>

          <h1>
            Tarefas <span>expiradas</span>
          </h1>

          <button className="emojiBtn">
            ☹
          </button>

        </div>

        <p className="subtitulo">
          Confirme e decida se irá penalizar seus filhos pelas tarefas expiradas
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

                    <h3>
                      {tarefa.titulo}
                    </h3>

                    <p>
                      {tarefa.nome}
                    </p>

                  </div>

                </div>

                <button className="lixeiraBtn">
                  🗑
                </button>

              </div>

              <button className="penalizarBtn">
                Penalizar
              </button>

              <span className="expiradoTexto">
                {tarefa.nome} não concluiu a Tarefa
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