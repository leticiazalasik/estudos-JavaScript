const livros = [
    { id: 1, titulo: 'JavaScript Avançado', emprestado: false },
    { id: 2, titulo: 'Python Básico', emprestado: true },
    { id: 3, titulo: 'Node.js na Prática', emprestado: false }
];

// Tarefas:
// 1. Liste todos os livros disponíveis (não emprestados)
const livrosDisponiveis = livros.filter(livro => livro.emprestado===false);
console.log(livrosDisponiveis)

// 2. Adicione um novo livro à biblioteca
const livrosAtualizados = [...livros, {id: 4, titulo: 'Java Básico', emprestado: true }];
console.log(livrosAtualizados);

// 3. Marque um livro como emprestado
const novaListaLivros = livrosAtualizados.map(livro => 
    livro.id === 1 
      ? { ...livro, emprestado: true }
      : livro
  );
  console.log(novaListaLivros);

// 4. Calcule quantos livros estão emprestados
let qtLivrosEmprestados=0;

novaListaLivros.forEach(livro => {
    if (livro.emprestado===true) {
        qtLivrosEmprestados++
    }
    
});

console.log(`A quantidade nde livros emprestados é ${qtLivrosEmprestados}`);