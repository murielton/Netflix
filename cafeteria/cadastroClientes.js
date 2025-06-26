document.addEventListener('DOMContentLoaded', function() {
    
    let clientes = [
        {
            id: 1,
            nome: "João Silva",
            email: "joao@example.com",
            telefone: "(11) 99999-9999",
            nascimento: "1990-05-15",
            fidelidade: "Prata",
            promocoes: true,
            cafesPreferidos: ["Cappuccino", "Latte"]
        }
    ];

   
    const clienteForm = document.getElementById('cliente-form');
    const clientesLista = document.getElementById('clientes-lista');

   
    function renderizarClientes() {
        clientesLista.innerHTML = '';
        
        clientes.forEach(cliente => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap text-sm text-amber-800">${cliente.nome}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-amber-800">${cliente.email}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-amber-800">${cliente.telefone}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-amber-800">
                    <span class="px-2 py-1 rounded-full text-xs ${getFidelidadeClass(cliente.fidelidade)}">
                        ${cliente.fidelidade}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-amber-800">
                    ${cliente.promocoes ? '<i class="fas fa-check text-green-500"></i>' : '<i class="fas fa-times text-red-500"></i>'}
                </td>
            `;
            clientesLista.appendChild(row);
        });
    }

    function getFidelidadeClass(nivel) {
        switch(nivel) {
            case 'Bronze': return 'bg-amber-200 text-amber-800';
            case 'Prata': return 'bg-gray-200 text-gray-800';
            case 'Ouro': return 'bg-yellow-200 text-yellow-800';
            default: return 'bg-amber-200 text-amber-800';
        }
    }

 
    function adicionarCliente(event) {
        event.preventDefault();
        
        
        const nome = document.getElementById('cliente-nome').value;
        const email = document.getElementById('cliente-email').value;
        const telefone = document.getElementById('cliente-telefone').value;
        const nascimento = document.getElementById('cliente-nascimento').value;
        const fidelidade = document.querySelector('input[name="fidelidade"]:checked').value;
        const promocoes = document.getElementById('cliente-promocoes').checked;
        
        
        const cafesPreferidos = [];
        document.querySelectorAll('input[type="checkbox"][value^="cafe-"]:checked').forEach(checkbox => {
            cafesPreferidos.push(checkbox.value);
        });

        
        const novoCliente = {
            id: clientes.length + 1,
            nome,
            email,
            telefone,
            nascimento,
            fidelidade,
            promocoes,
            cafesPreferidos
        };

       
        clientes.push(novoCliente);
        
        
        renderizarClientes();
        
        
        clienteForm.reset();
        
       
        alert('Cliente cadastrado com sucesso!');
        
       
        if (window.updateClientesSelect) {
            window.updateClientesSelect(clientes);
        }
    }

    
    if (clienteForm) {
        clienteForm.addEventListener('submit', adicionarCliente);
    }

    
    const telefoneInput = document.getElementById('cliente-telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) value = value.substring(0, 11);
            
            if (value.length > 0) {
                value = '(' + value;
                if (value.length > 3) {
                    value = [value.substring(0, 3), ') ', value.substring(3)].join('');
                }
                if (value.length > 12) {
                    value = [value.substring(0, 12), ' ', value.substring(12)].join('');
                }
                if (value.length > 13) {
                    value = [value.substring(0, 13), '-', value.substring(13)].join('');
                }
            }
            
            e.target.value = value;
        });
    }

   
    const emailInput = document.getElementById('cliente-email');
    if (emailInput) {
        emailInput.addEventListener('blur', function(e) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(e.target.value)) {
                e.target.classList.add('border-red-500');
                e.target.classList.remove('border-amber-300');
            } else {
                e.target.classList.remove('border-red-500');
                e.target.classList.add('border-amber-300');
            }
        });
    }

    
    renderizarClientes();

   
    window.getClientes = function() {
        return clientes;
    };
});