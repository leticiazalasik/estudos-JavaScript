const estudantes = [
    { nome: 'Ana', notas: [8, 7, 9] },
    { nome: 'Pedro', notas: [6, 8, 7] },
    { nome: 'Maria', notas: [9, 9, 8] }
];

// Tarefas:
// 1. Calcule a média de cada estudante
estudantes.forEach(estudante => {
    
    estudante.media = parseFloat((estudante.notas.reduce((media, nota) => media + nota,0)/estudante.notas.length).toFixed(2));

});
console.log(estudantes);
// 2. Encontre o estudante com a maior média

function buscarMaiorMedia(estudantes){
let nomeMaiorMedia = " ";
let notaMaiorMedia = 0;

estudantes.forEach(estudante => {
    if (estudante.media>notaMaiorMedia) {
        notaMaiorMedia=estudante.media;
        nomeMaiorMedia=estudante.nome;
    }
    
});

console.log(`Estudante com a maior média: ${nomeMaiorMedia} - Média: ${notaMaiorMedia} `)
}

buscarMaiorMedia(estudantes);

// 3. Liste apenas os estudantes aprovados (média >= 7)
function listarAprovados(estudantes){
const estudantesAprovados = [];

estudantes.forEach(estudante => {
    if (estudante.media>=7) {
        estudantesAprovados.push(estudante);
    }
    
});

console.log(`Lista dos estudantes aprovados:`)

estudantesAprovados.forEach(estudante => {
console.log(`Nome: ${estudante.nome} ${estudante.media}`)
});
}

listarAprovados(estudantes);

// 4. Adicione uma nova nota para cada estudante
function adicionarNovaNota(estudantes){

    const estudantesCopia = JSON.parse(JSON.stringify(estudantes));
    estudantesCopia.forEach(estudante => {
        estudante.notas.push(7); 
        console.log(estudante);
    });

}

adicionarNovaNota(estudantes);