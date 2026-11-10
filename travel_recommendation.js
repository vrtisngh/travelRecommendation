const resultsDiv = document.getElementById('results');
const searchInput = document.getElementById('searchInput');
const btnSearch = document.getElementById('btnSearch');
const btnReset = document.getElementById('btnReset');

// Task 6: check the data loads
fetch('./travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));

function showResults(items) {
    resultsDiv.innerHTML = items.map(item => `
        <div class="card">
            <img src="${item.imageUrl}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
        </div>
    `).join('');
}

// Tasks 7 and 8
function searchRecommendations() {
    const keyword = searchInput.value.toLowerCase().trim();

    fetch('./travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            let items = [];

            if (keyword === 'beach' || keyword === 'beaches') {
                items = data.beaches;
            } else if (keyword === 'temple' || keyword === 'temples') {
                items = data.temples;
            } else if (keyword === 'country' || keyword === 'countries') {
                items = data.countries.flatMap(country => country.cities);
            } else {
                const match = data.countries.find(country => country.name.toLowerCase() === keyword);
                if (match) items = match.cities;
            }

            if (items.length > 0) {
                showResults(items);
            } else {
                resultsDiv.innerHTML = '<p class="msg">No results found. Try beach, temple, or country.</p>';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultsDiv.innerHTML = '<p class="msg">An error occurred while fetching data.</p>';
        });
}

// Task 9
function clearResults() {
    resultsDiv.innerHTML = '';
    searchInput.value = '';
}

btnSearch.addEventListener('click', searchRecommendations);
btnReset.addEventListener('click', clearResults);