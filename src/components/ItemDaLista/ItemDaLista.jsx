import { useState } from "react";
import { prepararData } from '../funções/index'
import { requisicoesApi } from "../../services/api";
import iconeLapis from '../../assets/icon-editar.png'
import iconeLixeira from '../../assets/icon-lixo.png'
import iconeSetaCima from '../../assets/icon-seta-cima.png'
import './itemDaLista.css'

function ItemDaLista({ data, descricao, categoria, valor, tipo, id, fecharModal, modalPrincipal, setTipoDeReq, setIdEditar }) {
    const dataPronta = prepararData(data)
    const [modalAbertoExcluir, setModalExcluirAberto] = useState(false)
    const valorFormatado = (valor / 100).toFixed(2).replace(".", ",")

    function clickFechar() {
        fecharModal();
        setModalExcluirAberto(!modalAbertoExcluir)
    }
    async function clickConfirma(id) {
        await requisicoesApi('delete', id)

        clickFechar()
    }

    function abrirModalPrincipal() {
        setIdEditar(id)
        setTipoDeReq("put")
        modalPrincipal(true)
    }

    return (
        <div>
            <div className='itemDaLista'>
                <div>
                    <p>
                        {dataPronta.dataFormatada}
                    </p>
                </div>
                <div>
                    <p>
                        {dataPronta.diaSemana}
                    </p>
                </div>
                <div>
                    <p>
                        {descricao}
                    </p>
                </div>
                <div>
                    <p>
                        {categoria}
                    </p>
                </div>
                <div>
                    <p className={`valor${tipo}`}>
                        R${valorFormatado}
                    </p>
                </div>
                <div>
                    <button className="btnHover" onClick={abrirModalPrincipal}>
                        <img src={iconeLapis} alt="iconeLapis" />
                    </button>
                    <button className="btnHover" onClick={clickFechar}>
                        <img src={iconeLixeira} alt="iconeLixeira" />
                    </button>
                </div>
            </div>
            {modalAbertoExcluir && (
                <div className="containerModal">
                    <div className='modalExcluir'>
                        <img src={iconeSetaCima} alt="setaCima" className="seta" />
                        <div>
                            <p>Apagar item?</p>
                        </div>
                        <div>
                            <button
                                onClick={() => clickConfirma(id)}>
                                <p>Sim</p>
                            </button>
                            <button onClick={() => clickFechar()}>
                                <p>Não</p>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )

}

export default ItemDaLista