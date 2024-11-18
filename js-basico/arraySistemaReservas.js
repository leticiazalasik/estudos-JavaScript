const reservasAtuais = [
    { id: 1, sala: 'A1', horario: '09:00' },
    { id: 2, sala: 'B1', horario: '10:00' },
    { id: 1, sala: 'B1', horario: '12:00' },

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
  

// 3. Combine reservas dos mesmos horários

const reservasComHorarioCombinado = novaListaReservas.reduce((acc, reserva) => {
  // Desestruturando para obter as propriedades diretamente de cada reserva
  const { horario, sala, id } = reserva;

  // Verifica se já existe uma entrada para o horário no acumulador
  const horarioExistente = acc.find(item => item.horario === horario);

  if (horarioExistente) {
      // Se o horário já existe, adiciona a reserva à lista de reservas desse horário
      horarioExistente.reservas.push({ id, sala, horario });
  } else {
      // Caso o horário não exista, cria um novo grupo para este horário
      acc.push({ horario, reservas: [{ id, sala, horario }] });
  }

  // Retorna o acumulador para a próxima iteração
  return acc;
}, []); // O valor inicial do acumulador é um array vazio

// Exibe as reservas agrupadas por horário
console.log('Reservas nos mesmos horários:');
reservasComHorarioCombinado.forEach(({ horario, reservas }) => {
  const salas = reservas.map(({ sala }) => sala); // Cria um array com as salas para o mesmo horário
  console.log(`Horário: ${horario} - Salas: ${salas.join(', ')}`); // Exibe o horário e as salas
});


// 4. Crie uma função que aceite múltiplas reservas como argumentos

// 1. Adicione várias novas reservas
function adicionarReservas(novasReservas) {
  // Cria uma cópia do array original e adiciona as novas reservas

  const reservasAtuaisCopia = [...reservasAtuais, ...novasReservas]; 
  console.log(reservasAtuaisCopia);
}

// Exemplo de uso:
adicionarReservas([
  { id: 3, sala: 'A1', horario: '11:00' },
  { id: 4, sala: 'B2', horario: '12:00' }
]);
