// Função para mostrar o banner caso o usuário ainda não tenha aceitado os cookies
function showCookieBanner() {
    // Verifica se o usuário já aceitou os cookies
    const cookieAccepted = localStorage.getItem('cookieAccepted');
    
    // Se não tiver aceitado (ou se a chave não existir no localStorage), exibe o banner
    if (!cookieAccepted) {
      document.getElementById('cookie-banner').classList.add('show-banner');
    }
  }

  // Função para esconder o banner e salvar a aceitação nos cookies
  document.getElementById('accept-cookies').addEventListener('click', function() {
    // Salva a aceitação do usuário no localStorage
    localStorage.setItem('cookieAccepted', 'true');
    // Remove o banner da tela
    document.getElementById('cookie-banner').classList.remove('show-banner');
  });

  // Exibir o banner quando a página for carregada
  window.onload = function() {
    showCookieBanner(); // Chama a função para verificar e exibir o banner, se necessário
  };