//1. Pega o formulário pelo seu id
const formCadastro =
document.getElementById('cadastro');
//2. Adiciona um evento de submit(enviar) ao formulário
formCadastro.addEventListener
('submit', function(evento) {
    evento.preventDefault();//evita recarregar pagina
    //3. Pega os valores dos campos do formulário
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value; 
    const cpf = document.getElementById('cpf').value;   
    const data = document.getElementById('data').value;  
    const telefone = document.getElementById('telefone').value; 
//4. Mostra o resultado na tela
document.getElementById('resultado').innerHTML =
`<p>Nome: ${nome}</p><br>
<p>Email: ${email}</p><br>
<p>Senha: ${senha}</p>
<p>Cpf: ${cpf}</p>
<p>Data: ${data}</p>
<p>Telefone: ${telefone}</p>`
});
