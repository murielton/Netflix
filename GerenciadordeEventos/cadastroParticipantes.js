
document.getElementById('menu-toggle')?.addEventListener('click', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
});


let eventos = JSON.parse(localStorage.getItem('eventos')) || [];
let participantes = JSON.parse(localStorage.getItem('participantes')) || [];

function atualizarListaEventos() {
    const listaEventos = document.getElementById('listaEventos');
    if (!listaEventos) return;

    if (eventos.length === 0) {
        listaEventos.innerHTML = '<p class="text-gray-500 italic">Nenhum evento cadastrado ainda.</p>';
        return;
    }

    listaEventos.innerHTML = eventos.map((evento, index) => `
        <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div class="flex justify-between items-start">
                <div>
                    <h3 class="font-bold text-lg text-blue-600">${evento.nome}</h3>
                    <p class="text-gray-600"><strong>Data:</strong> ${new Date(evento.data).toLocaleDateString('pt-BR')}</p>
                    <p class="text-gray-600"><strong>Modalidade:</strong> ${evento.modalidade}</p>
                    <p class="text-gray-600"><strong>Local:</strong> ${evento.local}</p>
                    <p class="text-gray-600"><strong>Aberto ao público:</strong> ${evento.abertoPublico ? 'Sim' : 'Não'}</p>
                </div>
                <button onclick="removerEvento(${index})" class="text-red-500 hover:text-red-700">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                </button>
            </div>
        </div>
    `).join('');
}

function atualizarListaParticipantes() {
    const listaParticipantes = document.getElementById('listaParticipantes');
    if (!listaParticipantes) return;

    if (participantes.length === 0) {
        listaParticipantes.innerHTML = '<p class="text-gray-500 italic">Nenhum participante cadastrado ainda.</p>';
        return;
    }

    listaParticipantes.innerHTML = participantes.map((participante, index) => `
        <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div class="flex justify-between items-start">
                <div>
                    <h3 class="font-bold text-lg text-blue-600">${participante.nome}</h3>
                    <p class="text-gray-600"><strong>Idade:</strong> ${participante.idade} anos</p>
                    <p class="text-gray-600"><strong>Gênero:</strong> ${participante.genero}</p>
                    <p class="text-gray-600"><strong>Evento:</strong> ${participante.evento}</p>
                    <p class="text-gray-600"><strong>Aceitou regulamento:</strong> ${participante.aceitaRegulamento ? 'Sim' : 'Não'}</p>
                </div>
                <button onclick="removerParticipante(${index})" class="text-red-500 hover:text-red-700">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                </button>
            </div>
        </div>
    `).join('');
}


function removerEvento(index) {
    eventos.splice(index, 1);
    localStorage.setItem('eventos', JSON.stringify(eventos));
    atualizarListaEventos();
}


function removerParticipante(index) {
    participantes.splice(index, 1);
    localStorage.setItem('participantes', JSON.stringify(participantes));
    atualizarListaParticipantes();
}


document.getElementById('eventoForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nomeEvento = document.getElementById('nomeEvento').value;
    const dataEvento = document.getElementById('dataEvento').value;
    const modalidade = document.getElementById('modalidade').value;
    const localEvento = document.getElementById('localEvento').value;
    const abertoPublico = document.getElementById('abertoPublico').checked;
    
    const novoEvento = {
        nome: nomeEvento,
        data: dataEvento,
        modalidade: modalidade,
        local: localEvento,
        abertoPublico: abertoPublico
    };
    
    eventos.push(novoEvento);
    localStorage.setItem('eventos', JSON.stringify(eventos));
    
    this.reset();
    atualizarListaEventos();
});


document.getElementById('participanteForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nomeCompleto = document.getElementById('nomeCompleto').value;
    const idade = document.getElementById('idade').value;
    const genero = document.querySelector('input[name="genero"]:checked').value;
    const eventoParticipacao = document.getElementById('eventoParticipacao').value;
    const aceitaRegulamento = document.getElementById('aceitaRegulamento').checked;
    
    const novoParticipante = {
        nome: nomeCompleto,
        idade: idade,
        genero: genero,
        evento: eventoParticipacao,
        aceitaRegulamento: aceitaRegulamento
    };
    
    participantes.push(novoParticipante);
    localStorage.setItem('participantes', JSON.stringify(participantes));
    
    this.reset();
    atualizarListaParticipantes();
});


document.addEventListener('DOMContentLoaded', function() {
    atualizarListaEventos();
    atualizarListaParticipantes();
});