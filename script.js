function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

// Fetch suggestions
async function fetchSuggestions(query) {
    if (!query) {
        document.getElementById('suggestions-list').innerHTML = '';
        return;
    }
    
    const response = await fetch(`https://api.frontendexpert.io/api/fe/glossary-suggestions?text=${query}`);
    const suggestions = await response.json();
    displaySuggestions(suggestions);
}

// Display suggestions
function displaySuggestions(suggestions) {
    const suggestionsList = document.getElementById('suggestions-list');
    suggestionsList.innerHTML = ''; // Clear previous suggestions
    
    suggestions.forEach(term => {
        const li = document.createElement('li');
        li.textContent = term;
        li.onclick = () => selectSuggestion(term);
        suggestionsList.appendChild(li);
    });
}

// Select suggestion
function selectSuggestion(term) {
    document.getElementById('typeahead').value = term;
    document.getElementById('suggestions-list').innerHTML = ''; // Clear suggestions
}

// Input event listener
const typeaheadInput = document.getElementById('typeahead');
typeaheadInput.addEventListener('input', debounce((event) => {
    fetchSuggestions(event.target.value);
}, 500));