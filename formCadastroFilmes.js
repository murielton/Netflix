const form = document.getElementById("formfilme");
const lista = document.getElementById("listaFilmes");
form.addEventListener("submit",function(evento) {
    evento.preventDefault();
    const título = document.getElementById("título").value;
    const ano = document.getElementById("ano").value;
    const genero = document.getElementById("genero").value;
    const novoFilme = document.createElement("li");
    novoFilme.innerText = `${título} -- ${ano} -- ${genero}`;
    lista.appendChild(novoFilme);
    form.reset();
    console.log(novoFilme);

})

