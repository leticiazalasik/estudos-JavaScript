// Classe personalizada de erro
class CustomError extends Error {
    constructor(code, message) {
      super(message);  // Chama o construtor da classe Error
      this.code = code;  // Código do erro personalizado
      this.name = 'CustomError';  // Nome da classe de erro
    }
  }
  
  // Função para buscar dados de um usuário
  async function fetchUserData(userId) {
    try {
      // Simulando uma falha ao buscar os dados do usuário (em vez de uma requisição real)
      if (userId === 0) {
        throw new CustomError('USER_NOT_FOUND', 'Usuário não encontrado');  // Lançando um erro personalizado
      }
  
      if (userId < 0) {
        throw new CustomError('INVALID_USER_ID', 'ID do usuário inválido');  // Lançando outro erro personalizado
      }
  
      // Caso o ID seja válido, retornamos um mock de dados de usuário
      return { id: userId, name: 'João Silva' };
  
    } catch (error) {
      // Se algum erro ocorrer, captura o erro e exibe a mensagem
      if (error instanceof CustomError) {
        console.error(`Erro (${error.code}): ${error.message}`);
      } else {
        console.error('Erro desconhecido:', error);
      }
    }
  }
  
  // Testando a função com diferentes IDs de usuário
  fetchUserData(1).then(data => console.log('Usuário encontrado:', data));  // Não vai gerar erro, retorna o usuário
  fetchUserData(0);  // Vai gerar erro 'USER_NOT_FOUND'
  fetchUserData(-1);  // Vai gerar erro 'INVALID_USER_ID'
  