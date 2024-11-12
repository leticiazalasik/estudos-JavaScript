/* 
Crie um objeto chamado 'biblioteca' que contenha os seguintes dados:
- nome
- livros (array de objetos com título, autor e ano)
- adicionarLivro (método para adicionar novo livro)
- listarLivros (método para listar todos os livros)
*/

const biblioteca = {
    nome: "Biblioteca Central",
    livros: [],
    adicionarLivro(titulo, autor, ano) {
        this.livros.push({ titulo, autor, ano });
    },
    listarLivros() {
        this.livros.forEach(livro => 
            console.log(`${livro.titulo} - ${livro.autor} (${livro.ano})`)
        );
    }
};

biblioteca.adicionarLivro("livro teste", "autor teste", 1997)
biblioteca.adicionarLivro("livro teste2222", "autor teste2222", 2020)

biblioteca.listarLivros()

/* 
Dado o objeto abaixo, use destructuring para extrair:
- nome e idade em variáveis normais
- rua e número em variáveis chamadas enderecoRua e enderecoNumero
- telefone celular em uma variável chamada celular (com valor padrão 'não informado')
*/

const cliente = {
    nome: "Ana Silva",
    idade: 28,
    endereco: {
        rua: "Rua das Flores",
        numero: 123
    },
    telefones: {
        fixo: "11 2222-3333"
    }
};

// Solução
const { nome, idade } = cliente;
console.log(nome);
console.log(idade);

const { endereco: { rua: enderecoRua, numero: enderecoNumero } } = cliente;
console.log(enderecoRua);

const { telefones: { celular = 'não informado' } } = cliente;
console.log(celular);

