import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Resumo from "../../components/ResumoMain/ResumoMain";
import ItemDaLista from "../../components/ItemDaLista/ItemDaLista";
import logoDindin from "../../assets/dindin-logo.png";
import iconPerfil from "../../assets/icon-perfil.png";
import iconLogOut from "../../assets/icon-logout.png";
import iconFiltro from "../../assets/icon-filtro.png";
import iconSeta from "../../assets/icon-seta.png";
import Modal from "../../components/Modal/Modal";
import { api } from "../../services/api";
import "./main.css";

function Main() {
    const navigator = useNavigate();
    const [usuario, setUsuario] = useState([]);
    const [registros, setRegistro] = useState([])
    const [alvoAnterior, setAlvoAnterior] = useState("");
    const [mostrarModal, setMostrarModal] = useState(false);
    const [mostrarModalExcluir, setMostrarModalExcluir] = useState(false)
    const [tipoDeReq, setTipoDeReq] = useState("")
    const [idEditar, setIdEditar] = useState("")
    const [seta, setSeta] = useState({
        data: false,
        diaSemana: false,
        descricao: false,
        categoria: false,
        valor: false,
    });
    const [valorResumo, setValorResumo] = useState({
        entradas: 0,
        saidas: 0,
    });

    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    function fecharModal() {
        setMostrarModalExcluir(!mostrarModalExcluir)
    }

    function modalPrincipal() {
        setMostrarModal(!mostrarModal);
    }

    useEffect(() => {
        async function listarUsuario() {
            let resposta = await api.get("/usuario", config);
            setUsuario(resposta.data);
        }
        listarUsuario();

        async function inforResumos() {
            const data = await api.get("transacao/extrato", config);
            const resultado = data.data;

            setValorResumo({
                entradas: resultado.entrada,
                saidas: resultado.saida
            });
        }
        inforResumos();

        async function listarRegistros() {
            const data = await api.get("transacao", config);
            const resultado = data.data
            setRegistro(resultado)
        }
        listarRegistros()
    }, [mostrarModal, mostrarModalExcluir]);

    function logOut() {
        localStorage.removeItem("token");
        navigator("/");
    }

    function modalPrincipal(req) {
        if (!req) {
            setTipoDeReq("post")
        }
        setMostrarModal(!mostrarModal);
    }

    function clickOrdenar(alvo) {
        if (alvo !== alvoAnterior) {
            setSeta({
                data: false,
                diaSemana: false,
                descricao: false,
                categoria: false,
                valor: false,
            });
        }
        setSeta((estadoAnterior) => ({
            ...estadoAnterior,
            [alvo]: !estadoAnterior[alvo],
        }));

        setAlvoAnterior(alvo);
    }

    return (
        <div className="pagina_main">
            <header>
                <div>
                    <img src={logoDindin} alt="logoDindin" />
                </div>
                <div>
                    <button>
                        <img src={iconPerfil} alt="iconPerfil" />
                    </button>
                    <p>{usuario.nome}</p>
                    <button onClick={() => logOut()}>
                        <img src={iconLogOut} alt="iconLogOut" />
                    </button>
                </div>
            </header>
            <main>
                <div className="conteiner">
                    <div className="registros">
                        <div className="filtro">
                            <button >
                                <img src={iconFiltro} alt="" />
                                <p>Filtrar</p>
                            </button>
                        </div>
                        <div>
                            <div className="categorias">
                                <div onClick={() => clickOrdenar("data")}>
                                    <p>Data</p>
                                    {seta.data && <img src={iconSeta} alt="iconefiltro" />}
                                </div>
                                <div onClick={() => clickOrdenar("diaSemana")}>
                                    <p>Dia da semana</p>
                                    {seta.diaSemana && <img src={iconSeta} alt="iconefiltro" />}
                                </div>
                                <div onClick={() => clickOrdenar("descricao")}>
                                    <p>Descrição</p>
                                    {seta.descricao && <img src={iconSeta} alt="iconefiltro" />}
                                </div>
                                <div onClick={() => clickOrdenar("categoria")}>
                                    <p>Categoria</p>
                                    {seta.categoria && <img src={iconSeta} alt="iconefiltro" />}
                                </div>
                                <div onClick={() => clickOrdenar("valor")}>
                                    <p>Valor</p>
                                    {seta.valor && <img src={iconSeta} alt="iconefiltro" />}
                                </div>
                                <div ><p> </p></div>
                            </div>
                            <div>
                                {registros.map((registro) => {
                                    return <ItemDaLista
                                        data={registro.data}
                                        descricao={registro.descricao}
                                        categoria={registro.categoria_id}
                                        valor={registro.valor}
                                        tipo={registro.tipo}
                                        id={registro.id}
                                        key={registro.id}
                                        fecharModal={fecharModal}
                                        modalPrincipal={modalPrincipal}
                                        setTipoDeReq={setTipoDeReq}
                                        setIdEditar={setIdEditar}
                                    />
                                })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="resumos">
                        <div>
                            <Resumo entradas={valorResumo.entradas} saidas={valorResumo.saidas} />
                            <button className="btnHover" onClick={() => modalPrincipal(false)}>
                                Adicionar Registro
                            </button>
                        </div>
                    </div>
                </div>
            </main >
            {mostrarModal && (
                <Modal modalPrincipal={modalPrincipal} tipoDeReq={tipoDeReq} id={idEditar} />
            )}
        </div >
    )
}
export default Main;