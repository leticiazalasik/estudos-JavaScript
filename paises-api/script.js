// Seleciona os elementos da página
const searchInput = document.getElementById('searchInput'); // Seleciona o campo de entrada de texto para pesquisa
const countriesContainer = document.getElementById('countriesContainer'); // Seleciona o container para exibir os cartões de países
const loading = document.getElementById('loading'); // Seleciona o elemento de carregamento
const regionDropdown = document.getElementById('regionDropdown'); // Seleciona o botão de dropdown para seleção de região

// Função para atualizar os botões de acordo com o tema
function updateThemeButtons(newTheme) {
    const buttons = document.querySelectorAll('.btn'); // Seleciona todos os botões
    buttons.forEach(button => {
        if (newTheme === 'dark') { // Se o novo tema for escuro
            button.classList.remove('btn-primary'); // Remove a classe .btn-primary
            button.classList.add('btn-dark'); // Adiciona a classe .btn-dark
        } else { // Se o novo tema for claro
            button.classList.remove('btn-dark'); // Remove a classe .btn-dark
            button.classList.add('btn-primary'); // Adiciona a classe .btn-primary
        }
    });
}

// Função para carregar o tema salvo no localStorage ao carregar a página
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme'); // Obtém o tema salvo no localStorage
    if (savedTheme) {
        const html = document.querySelector('html'); // Seleciona o elemento <html>
        html.setAttribute('data-bs-theme', savedTheme); // Define o atributo de tema no elemento <html>

        // Alterar classes do body para refletir o tema
        if (savedTheme === 'dark') {
            document.body.classList.add('bg-dark'); // Adiciona a classe .bg-dark
            document.body.classList.remove('bg-light'); // Remove a classe .bg-light
        } else {
            document.body.classList.add('bg-light'); // Adiciona a classe .bg-light
            document.body.classList.remove('bg-dark'); // Remove a classe .bg-dark
        }

        // Atualizar o texto e a classe do botão de alternar tema
        const toggleThemeBtn = document.getElementById('toggleThemeBtn');
        if (savedTheme === 'dark') {
            toggleThemeBtn.classList.remove('btn-primary');
            toggleThemeBtn.classList.add('btn-dark');
            toggleThemeBtn.textContent = 'Alternar para Tema Claro';
        } else {
            toggleThemeBtn.classList.remove('btn-dark');
            toggleThemeBtn.classList.add('btn-primary');
            toggleThemeBtn.textContent = 'Alternar para Tema Escuro';
        }

        // Atualizar os botões de acordo com o tema
        updateThemeButtons(savedTheme);

        // Atualizar o botão de dropdown de seleção de região
        if (savedTheme === 'dark') {
            regionDropdown.classList.remove('btn-primary');
            regionDropdown.classList.add('btn-dark');
        } else {
            regionDropdown.classList.remove('btn-dark');
            regionDropdown.classList.add('btn-primary');
        }
    }
}

// Adiciona um listener ao botão de alternar tema
document.getElementById('toggleThemeBtn').addEventListener('click', function () {
    const html = document.querySelector('html'); // Seleciona o elemento <html>
    const currentTheme = html.getAttribute('data-bs-theme'); // Obtém o tema atual
    const newTheme = currentTheme === 'light' ? 'dark' : 'light'; // Define o novo tema
    html.setAttribute('data-bs-theme', newTheme); // Define o novo atributo de tema no elemento <html>
    localStorage.setItem('theme', newTheme); // Salva o novo tema no localStorage

    // Alterar classes do body para refletir o tema
    document.body.classList.toggle('bg-light'); // Alterna a classe .bg-light
    document.body.classList.toggle('bg-dark'); // Alterna a classe .bg-dark

    // Atualizar as classes dos botões de acordo com o tema
    updateThemeButtons(newTheme); // Chama a função para atualizar os botões de acordo com o tema

    // Atualizar o texto e a classe do botão de alternar tema
    if (newTheme === 'dark') { // Se o novo tema for escuro
        this.classList.remove('btn-primary'); // Remove a classe .btn-primary do botão de alternar tema
        this.classList.add('btn-dark'); // Adiciona a classe .btn-dark ao botão de alternar tema
        this.textContent = 'Alternar para Tema Claro'; // Atualiza o texto do botão de alternar tema
    } else { // Se o novo tema for claro
        this.classList.remove('btn-dark'); // Remove a classe .btn-dark do botão de alternar tema
        this.classList.add('btn-primary'); // Adiciona a classe .btn-primary ao botão de alternar tema
        this.textContent = 'Alternar para Tema Escuro'; // Atualiza o texto do botão de alternar tema
    }
});

// Função para criar cartão de país
function createCountryCard(country) {
    const newTheme = localStorage.getItem('theme') || 'light'; // Obtém o tema salvo ou define como 'light' por padrão
    const btnClass = newTheme === 'dark' ? 'btn-dark' : 'btn-primary'; // Define a classe do botão com base no tema

    return `
        <div class="col-md-4">
            <div class="card country-card h-100">
                <img src="${country.flags.png}" class="card-img-top flag-img" alt="Bandeira ${country.name.common}">
                <div class="card-body">
                    <h5 class="card-title">${country.name.common}</h5>
                    <p class="card-text">
                        <strong>Capital:</strong> ${country.capital?.[0] || 'N/A'}<br>
                        <strong>População:</strong> ${country.population.toLocaleString()}<br>
                        <strong>Região:</strong> ${country.region}
                    </p>
                    <!-- Button trigger modal -->
                    <button type="button" class="btn ${btnClass}" onclick="openModal('${country.cca3}')">
                        Launch modal
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Carrega o tema salvo quando a página é carregada
document.addEventListener('DOMContentLoaded', loadSavedTheme); // Adiciona o listener para carregar o tema salvo quando a página é carregada



// Função para buscar países por nome
async function searchCountries(searchTerm) {
    try {
        loading.classList.remove('d-none'); // Mostra o elemento de carregamento
        const response = await fetch(`https://restcountries.com/v3.1/name/${searchTerm}`); // Faz a requisição à API de países
        
        if (!response.ok) { // Se a resposta não for OK
            throw new Error('País não encontrado'); // Lança um erro
        }

        const data = await response.json(); // Converte a resposta para JSON
        return data; // Retorna os dados dos países
    } catch (error) {
        console.error('Erro:', error); // Exibe o erro no console
        return []; // Retorna um array vazio
    } finally {
        loading.classList.add('d-none'); // Esconde o elemento de carregamento
    }
}


// Função para abrir modal dinamicamente
async function openModal(countryCode) {
    // Encontra o país na lista local 'countries'
    let country = countries.find(c => c.cca3 === countryCode);

    // Caso o país não esteja em 'countries', busca na API
    if (!country) {
        try {
            const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`); // Faz a requisição à API de países
            const data = await response.json(); // Converte a resposta para JSON
            country = data[0]; // Define o país com os dados recebidos
        } catch (error) {
            console.error("Erro ao buscar dados do país:", error); // Exibe o erro no console
            alert("Não foi possível carregar os dados do país."); // Mostra um alerta em caso de erro
            return; // Sai da função em caso de erro
        }
    }

    const modalId = `modal-${country.cca3}`; // Define o ID do modal
    const languages = country.languages ? Object.values(country.languages).join(', ') : 'N/A'; // Define as línguas do país

    // Monta a lista de vizinhos
    const neighbors = country.borders
        ? country.borders.map(border => {
            const neighbor = countries.find(c => c.cca3 === border); // Encontra o país vizinho na lista local
            return `<a href="#" class="neighbor-link" data-code="${border}">${neighbor ? neighbor.name.common : border}</a>`; // Cria links para os países vizinhos
        })
        : ['N/A']; // Define 'N/A' se não houver países vizinhos

    const modalHtml = `
        <div class="modal fade" id="${modalId}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="${modalId}-label" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="${modalId}-label">${country.name.common}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Língua(s): ${languages}<br>
                        Moeda: ${country.currencies ? Object.values(country.currencies).map(curr => curr.name).join(', ') : 'N/A'}<br>
                        Países vizinhos: ${neighbors.join(', ')}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Adiciona o modal ao DOM
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    // Mostra o modal
    const myModal = new bootstrap.Modal(document.getElementById(modalId)); // Inicializa o modal do Bootstrap
    myModal.show(); // Mostra o modal

    // Remove o modal do DOM ao fechar
    document.getElementById(modalId).addEventListener('hidden.bs.modal', function () {
        this.remove(); // Remove o modal do DOM
    });

    // Adiciona evento aos links de vizinhos
    document.querySelectorAll('.neighbor-link').forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault(); // Previne o comportamento padrão do link
            const code = e.target.dataset.code; // Obtém o código do país vizinho

            // Fecha o modal atual
            myModal.hide(); // Fecha o modal

            // Substitui o card atual pelo novo país clicado
            const selectedCountry = countries.find(c => c.cca3 === code); // Encontra o país vizinho na lista local

            // Se não encontrou nos países armazenados, busca na API
            if (!selectedCountry) {
                try {
                    const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`); // Faz a requisição à API de países
                    const data = await response.json(); // Converte a resposta para JSON
                    countriesContainer.innerHTML = createCountryCard(data[0]); // Substitui o card atual pelo novo
                } catch (error) {
                    console.error("Erro ao buscar país vizinho:", error); // Exibe o erro no console
                    return; // Sai da função em caso de erro
                }
            } else {
                // Atualiza o card com o país vizinho
                countriesContainer.innerHTML = createCountryCard(selectedCountry); // Substitui o card atual pelo novo
            }
        });
    });
}

// Array para armazenar os dados dos países buscados
let countries = [];

// Atualizar a lógica de busca de países para armazenar os dados no array global
let debounceTimeout;
searchInput.addEventListener('input', (e) => {
    clearTimeout(debounceTimeout); // Limpa o timeout anterior
    debounceTimeout = setTimeout(async () => { // Define um novo timeout
        const searchTerm = e.target.value.trim(); // Obtém o termo de busca
        if (searchTerm.length >= 2) { // Se o termo de busca tiver pelo menos 2 caracteres
            countries = await searchCountries(searchTerm); // Busca os países pelo termo de busca
            countriesContainer.innerHTML = countries
                .map(country => createCountryCard(country)) // Cria os cartões de países
                .join(''); // Insere os cartões no container
        } else {
            countriesContainer.innerHTML = ''; // Limpa o container se o termo de busca for muito curto
        }
    }, 300); // Aguarda 300ms antes de executar a função
});

// Função para buscar países por região
async function searchByRegion(region) {
    try {
        loading.classList.remove('d-none'); // Mostra o elemento de carregamento
        const response = await fetch(`https://restcountries.com/v3.1/region/${region}`); // Faz a requisição à API de países por região
        if (!response.ok) {
            throw new Error('Região não encontrada'); // Lança um erro se a região não for encontrada
        }
        const data = await response.json(); // Converte a resposta para JSON
        return data; // Retorna os dados dos países
    } catch (error) {
        console.error('Erro:', error); // Exibe o erro no console
        return []; // Retorna um array vazio
    } finally {
        loading.classList.add('d-none'); // Esconde o elemento de carregamento
    }
}

// Função para lidar com o clique no dropdown (busca por região)
const dropdownItems = document.querySelectorAll('.dropdown-item'); // Seleciona todos os itens do dropdown
dropdownItems.forEach(item => {
    item.addEventListener('click', async (e) => {
        const selectedRegion = e.target.dataset.region; // Obtém a região selecionada
        const regionName = e.target.textContent; // Obtém o nome da região

        // Atualiza o texto do botão do dropdown
        document.getElementById('regionDropdown').textContent = `Região: ${regionName}`;

        // Chama a função para buscar países da região
        countries = await searchByRegion(selectedRegion); // Busca os países pela região
        countriesContainer.innerHTML = countries
            .map(country => createCountryCard(country)) // Cria os cartões de países
            .join(''); // Insere os cartões no container
    });
});
