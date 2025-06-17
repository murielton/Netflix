const form = document.getElementById("formjogo");
const lista = document.getElementById("listajogos");
form.addEventListener("submit",function(evento) {
    evento.preventDefault();
    const jogo  = document.getElementById("jogo").value;
    const ano = document.getElementById("ano").value;
    const plataforma = document.getElementById("plataforma").value;
    const novoJogo = document.createElement("li");
    novoJogo.innerText = `${jogo} -- ${ano} -- ${plataforma}`;
    lista.appendChild(novoJogo);
    form.reset();
 })

