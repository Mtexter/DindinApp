import { useEffect, useState } from "react";
import { listarCategorias, tratamentoValor } from '../funções/index'
import { requisicoesApi } from "../../services/api";
import iconeModal from "../../assets/iconeModal.png";
import "./modal.css";

export default function Modal({ modalPrincipal, tipoDeReq, id }) {
  const estadoInicial = {
    tipo: "saida",
    descricao: "-",
    valor: "",
    data: "",
    categoria_id: 1
  }
  const [mensagemErro, setmensagemErro] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [form, setForm] = useState(estadoInicial);
  const tipoDeRegistro = tipoDeReq === "put" ? "Editar" : "Adicionar"

  useEffect(() => {
    async function listaDeCategorias() {
      const resposta = await listarCategorias()
      setCategorias(resposta)
    }
    listaDeCategorias()
  }, []);

  const tratarAlteracao = (e) => {
    const key = e.target.name;
    let value = e.target.value;
    setForm((old) => ({ ...old, [key]: value }));
  };

  function tratarClickTipoReg(tipoReg) {
    setForm((old) => ({ ...old, "tipo": tipoReg }))
    const botaoEntrada = document.querySelector('.entrada');
    const botaoSaida = document.querySelector('.saida');

    if (tipoReg === "entrada") {
      botaoEntrada.classList.add('entrada_clicado')
      botaoSaida.classList.remove('saida_clicado')
    } else {
      botaoSaida.classList.add('saida_clicado')
      botaoEntrada.classList.remove('entrada_clicado')
    }
  }

  const tratarEnvio = async (e) => {
    e.preventDefault();

    if (form.valor.toString().length < 2) {
      setmensagemErro("Informe ao menos 2 números no campo valor. Caso não utilize vírgulas, o valor será informado em centavos.")
      return;
    }

    let operacao = {
      tipo: form.tipo,
      descricao: form.descricao,
      valor: tratamentoValor(form.valor),
      data: new Date(form.data),
      categoria_id: form.categoria_id
    };

    console.log(operacao)
    console.log(form.valor)

    let retornoReq = "";

    try {

      if (tipoDeReq === "post") {
        retornoReq = await requisicoesApi('post', "", operacao);
      }
      if (tipoDeReq === "put") {
        retornoReq = await requisicoesApi('put', id, operacao)
      }
      if (retornoReq.status < 300) {
        modalPrincipal()
      }

    } catch (erro) {

      setmensagemErro(erro.response.data.mensagem);
    }

  }
  return (
    <>
      <div className="caixa" id="modal">
        <form className="form_modal" onSubmit={tratarEnvio}>
          <div className="titulo_fechar">
            <p className="titulo_modal">{tipoDeRegistro} Registro </p>
            <img
              src={iconeModal}
              alt=""
              className="botao_fechar"
              onClick={() => modalPrincipal()}
            />
          </div>
          <div className="container_botoes">
            <button
              type="button"
              className="entrada"
              onClick={() => tratarClickTipoReg("entrada")}>
              Entrada
            </button>
            <button
              type="button"
              className="saida saida_clicado"
              onClick={() => tratarClickTipoReg("saida")}
            >Saida</button>
          </div>
          <br></br>
          <label htmlFor="valor" className="valor">
            Valor
          </label>
          <input
            placeholder="ex:0,00"
            type="number"
            name="valor"
            id="valor"
            className="input_valor"
            onBlur={tratarAlteracao}
          />
          <label htmlFor="categoria" className="categoria">
            Categoria
          </label>
          <select
            className="selecionar"
            name="categoria_id"
            id="categoria_id"
            value={form.categoria_id}
            onChange={tratarAlteracao}
          >
            {categorias.map((categoria) => (
              <option
                key={categoria.id}
                value={categoria.id}
                id={categoria.id}
                name={categoria.descricao}
              >
                {categoria.descricao}
              </option>
            ))}
          </select>
          <label htmlFor="data" className="data_label">
            Data
          </label>
          <input
            type="date"
            name="data"
            id="data"
            value={form.data}
            className="data_input"
            onChange={tratarAlteracao}
          />
          <label htmlFor="descricao" className="label_descricao">
            {" "}
            Descrição{" "}
          </label>
          <textarea
            rows={5}
            cols={40}
            placeholder="Descrição..."
            className="texto_descricao"
            name="descricao"
            id="descricao"
            onChange={tratarAlteracao}
          ></textarea>
          <p>{mensagemErro}</p>
          <button className="confirmar_botao btnHover" onClick={tratarEnvio}>
            Confirmar
          </button>
        </form>
      </div>
    </>
  );
}