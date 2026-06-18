import styles from './AdicionarTarefa.module.css';
import "../../../global.css"
import api from "../../../services/api";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import MenuInferior from '../../components/MenuInferior/MenuInferior';
import Header from '../../components/Header/Header';
import LoadingScreen from '../../components/LoadingScreen';
import Counter from '../../components/Counter';

export default function AdicionarTarefa() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [loading, setLoading] = useState(true);
  const [aberto, setAberto] = useState(false);
  const [filhoSelecionado, setFilhoSelecionado] = useState(null);
  const [tarefaForm, setTarefaForm] = useState({
    nome_tarefa: "",
    valor_tarefa: null,
    descricao_tarefa: "",
    expiracao_tarefa: "",
    id_filho: null,
    id_responsavel: null,
  })

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await api.get("/responsaveis/detalhe-responsavel");
        setUsuario(response.data);

        setTarefaForm(prev => ({
          ...prev,
          id_responsavel: response.data.id
        }));

        setLoading(false);
      } catch (error) {
        console.error("Erro em coletar usuário: ", error);
        setLoading(true);
      }
    };

    fetchUsuario();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const valorFormatado = name === "valor_tarefa" ? Number(value) : value;

    setTarefaForm({
      ...tarefaForm,
      [name]: valorFormatado
    });
  };

  const criarTarefa = async (tarefa) => {
    try {
      const response = await api.post("/tarefas", tarefa)
      navigate("/tarefaspai")
    } catch (error) {
      alert("Erro ao criar tarefa")
      console.error("ERRO AO CRIAR TAREFA: " + error)
    }
  }

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <div className={styles.screen}>
      {/* TOPO */}
      <Header mostrarVoltar />


      <div className={styles.section}>


        {/* TITULO */}
        <div className={styles.tituloArea}>
          <div className={styles.tituloTOP}>
            <h1>
              Crie uma tarefa
            </h1>
            <div className={styles.addBtn}>
              +
            </div>
          </div>
          <p className={styles.subtitulo}>
            Crie tarefas para seus filhos realizarem
          </p>
        </div>


        {/* FORM */}
        <div className={styles.formArea}>

          <input
            type="text"
            name="nome_tarefa"
            placeholder="Nome da tarefa"
            className={styles.inputField}
            value={tarefaForm.nome_tarefa}
            onChange={handleChange}
          />

          <input
            type="text"
            name="descricao_tarefa"
            placeholder="Descrição da tarefa"
            className={styles.inputField}
            value={tarefaForm.descricao_tarefa}
            onChange={handleChange}
          />

          <input
            type="date"
            name="expiracao_tarefa"
            placeholder="Data de Término"
            className={styles.inputField}
            value={tarefaForm.expiracao_tarefa}
            onChange={handleChange}
          />

          {/* SELECT */}
          <div className={styles.selectArea}>
            <div
              className={styles.selectTop}
              onClick={() => setAberto(!aberto)}
            >
              <span>{filhoSelecionado ? filhoSelecionado.nome : "Selecione o filho"}</span>
              <span className={styles.seta} style={{ transform: aberto ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                v
              </span>
            </div>

            {aberto && (
              <div className={styles.filhosLista}>
                {usuario?.filhos?.map((filho) => (
                  <p
                    key={filho.id}
                    onClick={() => {
                      setTarefaForm({ ...tarefaForm, id_filho: filho.id });
                      setFilhoSelecionado(filho); // Salva o escolhido
                      setAberto(false);
                    }}
                  >
                    {filho.nome}
                  </p>
                ))}
              </div>
            )}
          </div>

          <input
            type="number"
            name="valor_tarefa"
            placeholder="Valor Recebido"
            className={styles.inputField}
            value={tarefaForm.valor_tarefa}
            onChange={handleChange}
          />

        </div>

        {/* BOTAO */}
        <button className={styles.criarBtn} onClick={() => criarTarefa(tarefaForm)}>
          Criar Tarefa
        </button>
      </div>



      <MenuInferior abaAtiva="tarefas" usuario={"pai"} />
    </div>
  );
}