import { requisicoesApi } from "../../services/api";

export function prepararData(data) {
    const dia = new Date(data);
    const diasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    const diaSemana = diasSemana[dia.getDay() + 1 > 6 ? 0 : dia.getDay() + 1];
    const options = { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC' };
    const dataFormatada = dia.toLocaleDateString('pt-BR', options);

    return { dataFormatada, diaSemana };
}

export async function listarCategorias() {
    try {
        const resposta = await requisicoesApi('get')
        return resposta
    } catch (erro) {
        console.log(erro.message);
    }
}

export function tratamentoValor(valor) {
    let possiçãoVirgula = String(valor).indexOf(".");
    let valorCentavos = (valor * 100).toFixed(2);

    if (!(valor.length - 2 === possiçãoVirgula)) {
        valorCentavos = parseFloat(valor.toString().replace('.', ''));
        return Number(valorCentavos)
    }

    return Number(valorCentavos)
}
export default { prepararData, listarCategorias, tratamentoValor }