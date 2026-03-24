import { iniciar } from "./game.js";
import { iniciarTema, alterarTema } from "./theme.js";
//import * as Theme from "./theme.js"  ex: Theme.alterarTema

document.addEventListener("DOMContentLoaded", async ()=>{
    console.log("Teste");
    iniciarTema();
    await iniciar();

    const btnAlterarTema = document.getElementById("btnAlterarTema");

    btnAlterarTema.onclick = alterarTema;
    
});