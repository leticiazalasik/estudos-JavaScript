const estudantes = [
    { nome: 'Ana', notas: [8, 7, 9] },
    { nome: 'Pedro', notas: [6, 8, 7] },
    { nome: 'Maria', notas: [9, 9, 8] }
];

// Tarefas:
// 1. Calcule a média de cada estudante
estudantes.forEach(estudante => {
    
    estudante.media = estudante.notas.reduce((media, nota) => media + nota, 0)/estudante.notas.length;

});

// 2. Encontre o estudante com a maior média

// 3. Liste apenas os estudantes aprovados (média >= 7)

// 4. Adicione uma nova nota para cada estudante