const tarefasIniciais = [
  { id: 1, texto: 'Estudar JavaScript', concluida: false },
  { id: 2, texto: 'Fazer exercícios', concluida: false },
];

// Tarefas:

// 1. Adicione uma nova tarefa sem modificar o array original
const tarefasIniciaisCopia = [...tarefasIniciais, {id: 3, texto:'Estudar HTML', concluida:false}];
console.log(tarefasIniciaisCopia);

// 2. Marque uma tarefa como concluída mantendo imutabilidade
const novaListaTarefas = tarefasIniciaisCopia.map((tarefa) => {
    if (tarefa.id === 1) {
      return { ...tarefa, concluida: true };
    }
    return tarefa;
  });
  
  console.log(novaListaTarefas);
  
  // 3. Combine duas listas de tarefas diferentes
  const listaTarefas2 = [
    { id: 1, texto: 'Estudar Java', concluida: true },
    { id: 2, texto: 'Fazer exercícios Spring', concluida: false },
  ];
  
  const listaTarefasCombinada = [...novaListaTarefas, ...listaTarefas2];
  console.log(listaTarefasCombinada);
  
  // 4. Remova uma tarefa específica mantendo imutabilidade
  const listaSemTarefa2 = listaTarefasCombinada.filter(
    (tarefa) => tarefa.id !== 2
  );
  const listaTarefasFinal = [...listaSemTarefa2];
  
  console.log(listaTarefasFinal);
  