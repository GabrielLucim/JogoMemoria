import {buscarPalavras, salvarPartida} from "./api.js";
import { embaralhar } from "./utils.js";

const btnReiniciar = document.getElementById("btnReiniciar");
const cards = document.querySelectorAll(".card");

const inputNome = document.getElementById("nomeJogador");
const spanTentativas = document.getElementById("tentativas");
const spanTempo = document.getElementById("tempo");

let primeira = null;
let segunda = null;
let tentativa = 0;
let bloqueado = false;
let acertos = 0;
let jogoFinalizado = false;

let tempo = 0;
let intervalo = null;

export async function iniciar() {

    const palavras = await buscarPalavras();
    let embaralhadas = embaralhar([...palavras, ...palavras]);

    // reset
    tentativa = 0;
    acertos = 0;
    jogoFinalizado = false;

    spanTentativas.textContent = "Tentativas: 0";
    tempo = 0;
    spanTempo.textContent = tempo;
    clearInterval(intervalo);
    intervalo = setInterval(() => {
        tempo++;
        spanTempo.textContent = tempo;
    }, 1000);

    cards.forEach((card, x) => {
        card.classList.remove("selecionado");
        card.textContent = "?";
        card.dataset.palavra = embaralhadas[x];
        card.onclick = () => virar(card);
    });
}

function virar(card) {

    if (jogoFinalizado) return;
    if (bloqueado) return;
    if (card === primeira) return;

    card.textContent = card.dataset.palavra;
    card.classList.add("selecionado");

    if (!primeira) {
        primeira = card;
        return;
    }

    segunda = card;
    tentativa++;
    spanTentativas.textContent = `Tentativas: ${tentativa}`;

    verificar();
}

function verificar() {

    if (primeira.textContent === segunda.textContent) {
        console.log("acertou...");
        acertos++;
        primeira = null;
        segunda = null;
        // verifica se o jogo terminou
        if (acertos === 6) {
            clearInterval(intervalo);
            console.log("Parabéns, você acertou todas as cartas!");
            jogoFinalizado = true;
            salvarRanking();
        }
    } else {
        bloqueado = true;

        setTimeout(() => {

            primeira.textContent = "?";
            segunda.textContent = "?";
            primeira.classList.remove("selecionado");
            segunda.classList.remove("selecionado");
            primeira = null;
            segunda = null;
            bloqueado = false;
        }, 600);
    }
}

function getDataAtual() {
    return new Date().toISOString();
}

function salvarRanking() {

    const nome = inputNome.value || "Anônimo";
    const partida = {
        nome: nome,
        tentativas: tentativa,
        tempo: tempo,
        data: getDataAtual()
    };

    console.log("Enviando:", partida);

    salvarPartida(partida);
}


btnReiniciar.onclick = () => iniciar();