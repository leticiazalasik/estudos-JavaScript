const reservasAtuais = [
    { id: 1, sala: 'A1', horario: '09:00' },
    { id: 2, sala: 'B1', horario: '10:00' }
];

// Tarefas:
// 1. Adicione uma nova reserva
const reservasAtuaisCopia = [...reservasAtuais, {id: 3, sala:'A1', horario:'11:00'}];
console.log(reservasAtuaisCopia);

// 2. Atualize o horário de uma reserva existente
const novaListaReservas = reservasAtuaisCopia.map(reserva => 
    reserva.id === 1 
      ? { ...reserva, horario: '12:00' }
      : reserva
  );
  console.log(novaListaReservas);
  

// 3. Combine reservas de duas salas diferentes


// 4. Crie uma função que aceite múltiplas reservas como argumentos