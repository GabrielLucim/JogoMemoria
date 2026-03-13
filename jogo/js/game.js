import {buscarPalavras, salvarPartida} from "./api.js";
import { embaralhar } from "./utils.js";

const btnReiniciar = document.getElementById("btnReiniciar");
const cards = document.querySelectorAll(".card");

let primeira = null;
let segunda = null;
let tentativa = 0;
let bloqueado = false;

function iniciar() {
    let embaralhadas = embaralhar([...palavras, ...palavras]);
    cards.forEach((card, x) => {
        card.textContent = "?";
        card.dataset.palavra = embaralhadas[x];
        card.onclick = () => virar(card);
    });
}

function virar(card) {
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
    verificar();
}

function verificar() {
    if (primeira.textContent == segunda.textContent) {
        primeira = null;
        segunda = null;
        console.log("acertou...");
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
            console.log("1")
        }, 600);
        console.log("2")
    }
}

btnReiniciar.onclick = () => buscarPalavras();