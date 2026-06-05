import Index from "./associarFilho/Index";
import Cadastro from "./confirmarFilho/Cadastro";
import { useState } from "react";
import CadastrarResponsavel from "./paiMae/CadastrarResponsavel";
import api from "../../services/api";
import { useNavigate } from "react-router";

export default function CadastroController() {
    const [passo, setPasso] = useState(1);
    const navigate = useNavigate();

    const [fluxoCadastro, setFluxoCadastro] = useState({
        responsavel: {},
        filhos: []
    });

    const proximoPasso = (dados) => {
        if (passo === 1) {
            setFluxoCadastro(prev => ({ ...prev, responsavel: dados }));
            setPasso(passo + 1);
        } else if (passo === 2) {
            setFluxoCadastro(prev => ({ ...prev, filhos: [...prev.filhos, dados] }));
            setPasso(passo + 1);
        }
    };

    const finalizarTudo = async () => {
        const idPai = null;

        try {
            const resPai = await api.post("/responsaveis", fluxoCadastro.responsavel);
            console.log(resPai.data)
            const idPai = resPai.data.id;

            const promessasFilhos = fluxoCadastro.filhos.map(filho => {
                const dadosFilho = {
                    ...filho,
                    id_responsavel: idPai 
                };
                return api.post("/filhos", dadosFilho);
            });

            await Promise.all(promessasFilhos);

            navigate("/"); 
        } catch (error) {
            if(idPai){
                console.log("Erro na associação de filhos, deletando usuário pai para evitar dados vazios...")
                await api.delete(`/responsaveis/${idPaiCriado}`);
            }
            console.error("Erro ao finalizar cadastro:", error);
            alert("Houve um erro no cadastro. Verifique os dados e tente novamente.");
        }
    };

    return (
        <div>
            {passo === 1 && <CadastrarResponsavel onSubmit={proximoPasso} />}
            {passo === 2 && <Index onSubmit={proximoPasso} />}
            {passo === 3 && <Cadastro onAddMore={() => setPasso(2)}
                onFinalize={finalizarTudo} />}
        </div>
    );
}