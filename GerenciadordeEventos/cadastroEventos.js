// eventos.js - Lógica específica para o cadastro de eventos

// Armazenamento de eventos
let eventos = JSON.parse(localStorage.getItem('eventos')) || [];

// Elementos do DOM
const eventoForm = document.getElementById('eventoForm');
const listaEventos = document.getElementById('listaEventos');

// Inicialização
if (eventoForm && listaEventos) {
    // Carrega os eventos ao iniciar
    atualizarListaEventos();

    // Evento de submit do formulário
    eventoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtém os valores do formulário
        const nomeEvento = document.getElementById('nomeEvento').value;
        const dataEvento = document.getElementById('dataEvento').value;
        const modalidade = document.getElementById('modalidade').value;
        const localEvento = document.getElementById('localEvento').value;
        const abertoPublico = document.getElementById('abertoPublico').checked;
        
        // Validação básica
        if (!nomeEvento || !dataEvento || !modalidade || !localEvento) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        
        // Cria o objeto do evento
        const novoEvento = {
            id: Date.now(), // ID único baseado no timestamp
            nome: nomeEvento,
            data: dataEvento,
            modalidade: modalidade,
            local: localEvento,
            abertoPublico: abertoPublico,
            dataCadastro: new Date().toISOString()
        };
        
        // Adiciona ao array e salva no localStorage
        eventos.push(novoEvento);
        salvarEventos();
        
        // Limpa o formulário e atualiza a lista
        eventoForm.reset();
        atualizarListaEventos();
        
        // Feedback visual
        mostrarFeedback('Evento cadastrado com sucesso!', 'success');
    });
}

// Função para salvar eventos no localStorage
function salvarEventos() {
    localStorage.setItem('eventos', JSON.stringify(eventos));
}

// Função para atualizar a lista de eventos na tela
function atualizarListaEventos() {
    if (!listaEventos) return;

    if (eventos.length === 0) {
        listaEventos.innerHTML = '<p class="text-gray-500 italic">Nenhum evento cadastrado ainda.</p>';
        return;
    }

    // Ordena eventos por data (mais recente primeiro)
    const eventosOrdenados = [...eventos].sort((a, b) => 
        new Date(b.dataCadastro) - new Date(a.dataCadastro)
    );

    listaEventos.innerHTML = eventosOrdenados.map(evento => `
        <div class="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
            <div class="flex justify-between items-start">
                <div class="w-full">
                    <div class="flex justify-between items-start">
                        <h3 class="font-bold text-lg text-blue-600">${evento.nome}</h3>
                        <span class="text-sm text-gray-500">
                            ${formatarData(evento.dataCadastro)}
                        </span>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                        <p class="text-gray-600">
                            <span class="font-semibold">Data:</span> 
                            ${formatarDataEvento(evento.data)}
                        </p>
                        <p class="text-gray-600">
                            <span class="font-semibold">Modalidade:</span> 
                            ${evento.modalidade}
                        </p>
                        <p class="text-gray-600">
                            <span class="font-semibold">Local:</span> 
                            ${evento.local}
                        </p>
                        <p class="text-gray-600">
                            <span class="font-semibold">Aberto ao público:</span> 
                            ${evento.abertoPublico ? 'Sim' : 'Não'}
                        </p>
                    </div>
                </div>
                <button onclick="removerEvento(${evento.id})" 
                        class="ml-4 text-red-500 hover:text-red-700"
                        title="Remover evento">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                </button>
            </div>
        </div>
    `).join('');
}

// Função para remover evento (deve ser global para ser chamada do HTML)
window.removerEvento = function(id) {
    if (confirm('Tem certeza que deseja remover este evento?')) {
        eventos = eventos.filter(evento => evento.id !== id);
        salvarEventos();
        atualizarListaEventos();
        mostrarFeedback('Evento removido com sucesso!', 'info');
    }
}

// Funções auxiliares
function formatarData(dataString) {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function formatarDataEvento(dataString) {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function mostrarFeedback(mensagem, tipo = 'success') {
    const feedback = document.createElement('div');
    feedback.className = `fixed top-4 right-4 p-4 rounded-md shadow-lg text-white ${
        tipo === 'success' ? 'bg-green-500' : 
        tipo === 'error' ? 'bg-red-500' : 
        'bg-blue-500'
    }`;
    feedback.textContent = mensagem;
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        feedback.classList.add('opacity-0', 'transition-opacity', 'duration-500');
        setTimeout(() => feedback.remove(), 500);
    }, 3000);
}

// Exporta funções se estiver usando módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        eventos,
        salvarEventos,
        atualizarListaEventos,
        removerEvento
    };
}