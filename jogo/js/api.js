import {URL, PALAVRAS} from "./config.js";

export async function buscarPalavras() {
    try {
        //função que por padrão faz requisição com get
        const response = await fetch(`${URL}/api/palavras.php?quantidade=6`);
        //o único status aceitável é 200. 200==ok
        if (!response.ok) {
            throw new Error(`Error ${response.status}`);
        }
        const palavras = await response.json();
        console.log(palavras);
        return palavras;
    } catch (error) {
        console.log(error);
        return PALAVRAS;
    }
}

export async function salvarPartida(partida) {
    try {
        const response = await fetch(`${URL}/api/salvar.php`, {
            method: 'POST',
            header: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(partida)
        });

        if (!response.ok) {
            throw new Error(`ERROR ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}