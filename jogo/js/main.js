import { iniciarTema, alterarTema } from "./theme.js";
//import * as Theme from "./theme.js"  ex: Theme.alterarTema

document.addEventListener("DOMContentLoaded", ()=>{
    console.log("Teste");
    iniciarTema();

    const btnAlterarTema = document.getElementById("btnAlterarTema");

    btnAlterarTema.onclick = alterarTema;
    
});