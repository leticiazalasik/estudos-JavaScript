// Definição da classe PokemonService
class PokemonService {
    constructor() {
        // Inicializa o cache como um mapa vazio
        this.cache = new Map();
    }

    // Função assíncrona para buscar um Pokémon
    async buscarPokemon(nome) {
        // Verifica se o nome do Pokémon já está no cache
        if (this.cache.has(nome)) {
            console.log('Retornando do cache');  // Caso esteja, retorna o Pokémon armazenado no cache
            return this.cache.get(nome);  // Retorna o Pokémon encontrado no cache
        }

        try {
            // Faz a requisição à API para buscar os dados do Pokémon
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome.toLowerCase()}`);
            
            // Se a resposta da API não for ok (status não 200), lança um erro
            if (!response.ok) throw new Error('Pokémon não encontrado');
            
            // Converte a resposta para JSON
            const pokemon = await response.json();
            
            // Salva os dados do Pokémon no cache, usando o nome como chave
            this.cache.set(nome, pokemon);
            
            // Retorna os dados do Pokémon
            return pokemon;
        } catch (erro) {
            // Se ocorrer um erro, exibe a mensagem de erro
            console.error('Erro ao buscar Pokémon:', erro);
            throw erro;  // Lança o erro para que possa ser tratado em outro lugar
        }
    }
}

// Criação de uma instância do PokemonService
const pokemonService = new PokemonService();

// Função assíncrona para testar a busca de um Pokémon
async function testarPokemon() {
    // Chama a função buscarPokemon passando 'pikachu' como argumento
    const pikachu = await pokemonService.buscarPokemon('pikachu');
    
    // Exibe as informações do Pokémon no console
    console.log('Pikachu:', {
        nome: pikachu.name,  // Exibe o nome do Pokémon
        altura: pikachu.height,  // Exibe a altura do Pokémon
        peso: pikachu.weight,  // Exibe o peso do Pokémon
        tipos: pikachu.types.map(t => t.type.name)  // Exibe os tipos do Pokémon
    });
}

// Executa a função de teste
testarPokemon();
