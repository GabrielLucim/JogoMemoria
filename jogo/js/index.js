let palavras = ["DIV", "META", "READER", "JS", "FOOTER", "BODY"];

const btnReiniciar = document.getElementById("btnReiniciar");
const cards = document.querySelectorAll(".card");
const url = "https://darkblue-frog-779608.hostingersite.com";

let primeira = null;
let segunda = null;
let tentativa = 0;


//iniciar();

buscarPalavras();

async function buscarPalavras(){
	try{
		//função que por padrão faz requisição com get
		const response = await fetch(`${url}/api/palavras.php?quantidade=6`);
		if(!response.ok){
			throw new Error(`Error ${response.status}`);
		}
		palavras = await response.json();
		console.log(palavras);
		iniciar();
	}catch(error){
		console.log(error);
	}
}

function iniciar(){
	let embaralhadas = embaralhar([...palavras, ...palavras]);
	cards.forEach((card, x) =>{
		card.textContent = "?";
		card.dataset.palavra = embaralhadas[x];
		card.onclick = () => virar(card);
	});
}

function virar(card){
	card.textContent = card.dataset.palavra;
	card.classList.add("selecionado");
	if(!primeira){
		primeira = card;
		return;
	}
	segunda = card;
	tentativa++;
	verificar();
}

function verificar(){
	if(primeira.textContent == segunda.textContent){
		primeira = null;
		segunda = null;
		console.log("acertou...");
	}else{
		setTimeout(()=>{
			primeira.textContent = "?";
			segunda.textContent = "?";
			primeira.classList.remove("selecionado");
			segunda.classList.remove("selecionado");
			primeira = null;
			segunda = null;
		},600);
	}
}

function embaralhar(array){
	for(let x = array.length - 1; x > 0; x--){
		let y = Math.floor(Math.random()*(1+x));
		/* Só funciona no javascript: */
		[array[x], array[y]] = [array[y], array[x]];
	}
	return array;
}

btnReiniciar.onclick =() => buscarPalavras();