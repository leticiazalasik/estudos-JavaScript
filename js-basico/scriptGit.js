// Função que busca dados de um usuário do GitHub
async function buscarUsuarioGithub(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        const dados = await response.json();

        // Desestruturando apenas os dados que precisamos
        const {
            name,
            bio,
            public_repos,
            followers,
            following,
            location,
            blog,
            created_at
        } = dados;

        // Criando um objeto com os dados formatados
        const usuarioFormatado = {
            nome: name || username,
            biografia: bio || 'Sem biografia',
            repositorios: public_repos,
            seguidores: followers,
            seguindo: following,
            localizacao: location || 'Não informado',
            website: blog || 'Não informado',
            dataCriacao: new Date(created_at).toLocaleDateString('pt-BR')
        };

        return usuarioFormatado;
    } catch (erro) {
        console.error('Erro ao buscar usuário:', erro);
        throw erro;
    }
}

buscarUsuarioGithub('octocat')
    .then(usuario => {
        console.log(usuario);
    })
    .catch(erro => {
        console.log('Houve um erro:', erro);
    });
