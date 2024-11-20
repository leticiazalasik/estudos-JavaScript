const searchInput = document.getElementById('searchInput');
const countriesContainer = document.getElementById('countriesContainer');
const loading = document.getElementById('loading');
const regionDropdown = document.getElementById('regionDropdown');

// Função para buscar países por nome
async function searchCountries(searchTerm) {
    try {
        loading.classList.remove('d-none');
        const response = await fetch(`https://restcountries.com/v3.1/name/${searchTerm}`);
        
        if (!response.ok) {
            throw new Error('País não encontrado');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro:', error);
        return [];
    } finally {
        loading.classList.add('d-none');
    }
}

// Função para criar cartão de país
function createCountryCard(country) {
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
                    <button type="button" class="btn btn-primary" onclick="openModal('${country.cca3}')">
                        Launch modal
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Função para abrir modal dinamicamente
// Função para abrir modal dinamicamente
async function openModal(countryCode) {
    // Encontra o país na lista local 'countries'
    let country = countries.find(c => c.cca3 === countryCode);

    // Caso o país não esteja em 'countries', busca na API
    if (!country) {
        try {
            const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
            const data = await response.json();
            country = data[0];
        } catch (error) {
            console.error("Erro ao buscar dados do país:", error);
            alert("Não foi possível carregar os dados do país.");
            return;
        }
    }

    const modalId = `modal-${country.cca3}`;
    const languages = country.languages ? Object.values(country.languages).join(', ') : 'N/A';

    // Monta a lista de vizinhos
    const neighbors = country.borders
        ? country.borders.map(border => {
            const neighbor = countries.find(c => c.cca3 === border);
            return `<a href="#" class="neighbor-link" data-code="${border}">${neighbor ? neighbor.name.common : border}</a>`;
        })
        : ['N/A'];

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
    const myModal = new bootstrap.Modal(document.getElementById(modalId));
    myModal.show();

    // Remove o modal do DOM ao fechar
    document.getElementById(modalId).addEventListener('hidden.bs.modal', function () {
        this.remove();
    });

    // Adiciona evento aos links de vizinhos
    document.querySelectorAll('.neighbor-link').forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            const code = e.target.dataset.code;

            // Fecha o modal atual
            myModal.hide();

            // Substitui o card atual pelo novo país clicado
            const selectedCountry = countries.find(c => c.cca3 === code);

            // Se não encontrou nos países armazenados, busca na API
            if (!selectedCountry) {
                try {
                    const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
                    const data = await response.json();
                    countriesContainer.innerHTML = createCountryCard(data[0]);
                } catch (error) {
                    console.error("Erro ao buscar país vizinho:", error);
                    return;
                }
            } else {
                // Atualiza o card com o país vizinho
                countriesContainer.innerHTML = createCountryCard(selectedCountry);
            }
        });
    });
}





// Array to store the fetched countries data
let countries = [];

// Atualizar a lógica de busca de países para armazenar os dados no array global
let debounceTimeout;
searchInput.addEventListener('input', (e) => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(async () => {
        const searchTerm = e.target.value.trim();
        if (searchTerm.length >= 2) {
            countries = await searchCountries(searchTerm);
            countriesContainer.innerHTML = countries
                .map(country => createCountryCard(country))
                .join('');
        } else {
            countriesContainer.innerHTML = '';
        }
    }, 300);
});

async function searchByRegion(region) {
    try {
        loading.classList.remove('d-none');
        const response = await fetch(`https://restcountries.com/v3.1/region/${region}`);
        if (!response.ok) {
            throw new Error('Região não encontrada');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro:', error);
        return [];
    } finally {
        loading.classList.add('d-none');
    }
}

// Função para lidar com o clique no dropdown (busca por região)
const dropdownItems = document.querySelectorAll('.dropdown-item');
dropdownItems.forEach(item => {
    item.addEventListener('click', async (e) => {
        const selectedRegion = e.target.dataset.region;
        const regionName = e.target.textContent;

        // Atualiza o texto do botão do dropdown
        document.getElementById('regionDropdown').textContent = `Região: ${regionName}`;

        // Chama a função para buscar países da região
        countries = await searchByRegion(selectedRegion);
        countriesContainer.innerHTML = countries
            .map(country => createCountryCard(country))
            .join('');
    });
});
