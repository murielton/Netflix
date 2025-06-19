const form = document.getElementById('formJogador');
 const lista = document.getElementById('listaJogadores');
 form.addEventListener('submit', function(event) {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const habilidades = 
    document.querySelectorAll('input[name="habilidades"]:checked');
    const habilidadesArray = Array.from(habilidades).map(h => h.value);
    const posicao = document.querySelector('input[name="posição"]:checked').value; 
    const dataEstreia = document.getElementById('estreia').value;
    const jogadorItem = document.createElement('li');
    jogadorItem.innerHTML =`
    Nome: ${nome}<br>

    habilidades: ${habilidadesArray.join(',')}<br>
    Posição: ${posicao}<br>
    Data de Estreia: ${dataEstreia}
    `;
    lista.appendChild(jogadorItem);
    form.reset();  
 })   