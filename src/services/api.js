import axios from 'axios';

export const api = axios.create({
    baseURL: "https://desafio-backend-03-dindin.pedagogico.cubos.academy/",
    timeout: 500000,
    headers: { "Content-Type": "application/json" }
})

const token = localStorage.getItem("token");
const config = {
    headers: {
        Authorization: `Bearer ${token}`,
    },
};

export async function requisicoesApi(verbo, id, corpo) {

    if (verbo === "delete") {
        await api.delete(`transacao/${id}`, config)
    }
    if (verbo === "get") {
        const data = await api.get(`categoria`, config);
        return data.data
    }
    if (verbo === "post") {
        const data = await api.post(`transacao`, corpo, config)
        return data
    }
    if (verbo === "put") {
        const data = await api.put(`transacao/${id}`, corpo, config);
        return data
    }
}

export default (api, requisicoesApi)