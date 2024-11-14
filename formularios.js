// Obtém o elemento do formulário pelo ID 'user-form'
const form = document.getElementById('user-form');  

// Obtém o elemento onde o log será exibido pelo ID 'form-log'
const formLog = document.getElementById('form-log');  

// Obtém o campo de input de nome pelo ID 'name'
const nameInput = document.getElementById('name');  

// Obtém o campo de input de email pelo ID 'email'
const emailInput = document.getElementById('email');  

// Obtém o campo de input de idade pelo ID 'age'
const ageInput = document.getElementById('age');  

// Função para registrar eventos no log com a hora e a mensagem do evento
function logFormEvent(event, message) {
    const time = new Date().toLocaleTimeString();  // Obtém a hora atual no formato 'HH:MM:SS'
    // Adiciona uma nova linha ao log, exibindo a hora, tipo de evento e a mensagem
    formLog.innerHTML += `<div>${time}: ${event} - ${message}</div>`;  
}

// Evento de 'submit' no formulário
form.addEventListener('submit', (e) => {  
    e.preventDefault();  // Previne o comportamento padrão (evita que o formulário seja enviado)
    logFormEvent('submit', 'Formulário enviado!');  // Registra no log que o formulário foi enviado
});

// Evento de 'reset' no formulário
form.addEventListener('reset', () => {  
    logFormEvent('reset', 'Formulário resetado!');  // Registra no log que o formulário foi resetado
});

// Evento de 'focus' no campo de nome
nameInput.addEventListener('focus', () => {  
    logFormEvent('focus', 'Campo nome focado');  // Registra no log que o campo nome recebeu o foco
});

// Evento de 'blur' no campo de nome
nameInput.addEventListener('blur', () => {  
    logFormEvent('blur', 'Campo nome perdeu foco');  // Registra no log que o campo nome perdeu o foco
});

// Evento de 'change' no campo de email (quando o valor do campo é alterado)
emailInput.addEventListener('change', (e) => {  
    logFormEvent('change', `Email alterado para: ${e.target.value}`);  // Registra no log a alteração do valor do email
});

// Validação em tempo real no campo de idade
ageInput.addEventListener('input', (e) => {  
    const age = e.target.value;  // Obtém o valor atual do campo de idade
    if (age < 0 || age > 150) {  
        // Se a idade estiver fora do intervalo permitido, exibe uma mensagem de erro
        ageInput.setCustomValidity('Idade deve estar entre 0 e 150');  
    } else {  
        // Se a idade for válida, limpa qualquer mensagem de erro
        ageInput.setCustomValidity('');  
    }
});
