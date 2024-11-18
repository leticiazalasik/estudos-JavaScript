function buscarPost() {
    const xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                console.log('Post:', data);
            } else {
                console.error('Erro:', xhr.status);
            }
        }
    };

    // Exemplo de monitoramento do progresso
    xhr.onprogress = function(event) {
        if (event.lengthComputable) {
            const percentComplete = (event.loaded / event.total) * 100;
            console.log(`Progresso: ${percentComplete}%`);
        }
    };

    xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts/1');
    xhr.send();
}

// Exemplo de POST com XMLHttpRequest
function criarPost() {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://jsonplaceholder.typicode.com/posts');
    
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    xhr.onload = function() {
        if (xhr.status === 201) {
            const response = JSON.parse(xhr.responseText);
            console.log('Post criado:', response);
        }
    };

    const data = {
        title: 'Novo Post XMLHttpRequest',
        body: 'Conteúdo do post',
        userId: 1
    };

    xhr.send(JSON.stringify(data));

   
}

