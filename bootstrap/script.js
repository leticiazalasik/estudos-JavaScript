document.addEventListener('DOMContentLoaded', () => {
  const banner = document.getElementById('cookie-banner');
  const acceptBtn = document.getElementById('accept-cookies');
  const rejectBtn = document.getElementById('reject-cookies');

  // Verifica se o usuário já aceitou ou rejeitou cookies
  const hasAcceptedCookies = localStorage.getItem('cookiesAccepted');
  const hasRejectedCookies = sessionStorage.getItem('cookiesRejected');

  if (!hasAcceptedCookies && !hasRejectedCookies) {
    banner.classList.remove('hidden'); // Mostra o banner
  }

  // Quando o usuário aceita os cookies
  acceptBtn.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'true'); // Salva a aceitação permanentemente
    banner.classList.add('hidden'); // Esconde o banner
  });

  // Quando o usuário rejeita os cookies
  rejectBtn.addEventListener('click', () => {
    sessionStorage.setItem('cookiesRejected', 'true'); // Salva a rejeição para a sessão atual
    banner.classList.add('hidden'); // Esconde o banner
  });
});
``
