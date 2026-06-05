import styles from './AdicionarConquista.module.css';
import "../../../global.css"
import api from "../../../services/api";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import MenuInferior from '../../components/MenuInferior/MenuInferior';
import LoadingScreen from '../../components/LoadingScreen';
import Counter from '../../components/Counter';

export default function AdicionarConquista() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [loading, setLoading] = useState(true);
  const [aberto, setAberto] = useState(false);
  const [filhoSelecionado, setFilhoSelecionado] = useState(null);
  const [recompensaForm, setRecompensaForm] = useState({
    nome_recompensa: "",
    valor_recompensa: null,
    id_filho: null,
    id_responsavel: null,
  })

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await api.get("/responsaveis/detalhe-responsavel");
        setUsuario(response.data);

        setRecompensaForm(prev => ({
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

    const valorFormatado = name === "valor_recompensa" ? Number(value) : value;

    setRecompensaForm({
      ...recompensaForm,
      [name]: valorFormatado
    });
  };

  const criarRecompensa = async (recompensa) => {
    try {
      const response = await api.post("/recompensas", recompensa)
      navigate("/conquistaspai")
    } catch (error) {
      alert("Erro ao criar conquista")
      console.error("ERRO AO CRIAR CONQUISTA: " + error)
    }
  }

  return (
    <div className={styles.pageBg}>
      {/* TOPO */}

      {/* TITULO */}
      <div className={styles.tituloArea}>
        <h1>
          Crie uma conquista
        </h1>
        <div className={styles.addBtn}>
          🌟
        </div>
      </div>

      <p className={styles.subtitulo}>
        Crie conquistas para seus filhos adquirirem
      </p>

      {/* FORM */}
      <div className={styles.formArea}>

        <input
          type="text"
          name="nome_recompensa"
          placeholder="Nome da conquista"
          className={styles.inputField}
          value={recompensaForm.nome_recompensa}
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
                    setRecompensaForm({ ...recompensaForm, id_filho: filho.id });
                    setFilhoSelecionado(filho); 
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
          name="valor_recompensa"
          placeholder="Custo da conquista"
          className={styles.inputField}
          value={recompensaForm.valor_recompensa}
          onChange={handleChange}
        />

      </div>

      {/* BOTAO */}
      <button className={styles.criarBtn} onClick={() => criarRecompensa(recompensaForm)}>
        Criar Conquista
      </button>

      <br /><br /><br /><br /><br />

      <MenuInferior abaAtiva="conquistas" usuario={"pai"}/>
    </div>
  );
}