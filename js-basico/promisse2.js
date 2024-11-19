// Definindo uma função chamada fetchComTimeout
function fetchComTimeout(url, timeout = 5000) {
    // Usando Promise.race para resolver ou rejeitar a Promise mais rápida (fetch ou timeout)
    return Promise.race([

        // Primeira Promise: faz a requisição fetch para a URL fornecida
        fetch(url),

        // Segunda Promise: cria uma nova Promise que será rejeitada após o tempo limite
        new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Timeout')), timeout)  // Timeout após o tempo especificado (default 5000ms)
        )
    ]);
}
