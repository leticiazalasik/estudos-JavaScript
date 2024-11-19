const searchInput = document.getElementById('searchInput');
const countriesContainer = document.getElementById('countriesContainer');
const loading = document.getElementById('loading');
const regionDropdown = document.getElementById('regionDropdown');


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

function createCountryCard(country) {
    const languages = country.languages ? Object.values(country.languages).join(', ') : 'N/A';
    const modalId = `modal-${country.cca3}`;
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
                </div>

                <!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${modalId}">
  Launch modal
</button>

<!-- Modal -->
<div class="modal fade" id="${modalId}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="${modalId}" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="${modalId}">${country.name.common}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      Língua(s): ${languages}
      Moeda: ${country.currencies.name}
      Países vzinhos:
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Understood</button>
      </div>
    </div>
  </div>
</div>
            </div>
        </div>
    `;
}

let debounceTimeout;
searchInput.addEventListener('input', (e) => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(async () => {
        const searchTerm = e.target.value.trim();
        if (searchTerm.length >= 2) {
            const countries = await searchCountries(searchTerm);
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
        const countries = await searchByRegion(selectedRegion);
        countriesContainer.innerHTML = countries
            .map(country => createCountryCard(country))
            .join('');
    });
});



document.addEventListener('DOMContentLoaded', () => {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        new bootstrap.Modal(modal); // Inicializa manualmente os modais
    });
});

// Forçar fechamento do modal ao clicar nos botões de fechar
const closeButtons = document.querySelectorAll('[data-bs-dismiss="modal"]');
closeButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const modal = button.closest('.modal');
        const modalInstance = bootstrap.Modal.getInstance(modal);
        if (modalInstance) {
            modalInstance.hide();  // Força o fechamento do modal
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        const modalInstance = bootstrap.Modal.getInstance(modal);
        console.log(modalInstance); // Verifique se a instância está sendo obtida corretamente
    });
});

