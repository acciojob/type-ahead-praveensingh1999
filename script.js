//your JS code here. If required.
const input = document.getElementById("typeahead");
const suggestionsList = document.getElementById("suggestions-list");

let debounceTimer = null;

// Helper to clear suggestions
function clearSuggestions() {
  suggestionsList.innerHTML = "";
}

// Fetch and render suggestions
async function fetchSuggestions(text) {
  try {
    const response = await fetch(
      `https://api.frontendexpert.io/api/fe/glossary-suggestions?text=${encodeURIComponent(
        text
      )}`
    );

    const suggestions = await response.json();
    clearSuggestions();

    suggestions.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;

      li.addEventListener("click", () => {
        input.value = item;
        clearSuggestions();
      });

      suggestionsList.appendChild(li);
    });
  } catch (error) {
    clearSuggestions();
  }
}

// Input event with debounce
input.addEventListener("input", () => {
  const text = input.value.trim();

  // Clear previous timer
  clearTimeout(debounceTimer);

  // If input is empty, clear suggestions and do nothing
  if (text === "") {
    clearSuggestions();
    return;
  }

  // Debounce API call by 500ms
  debounceTimer = setTimeout(() => {
    fetchSuggestions(text);
  }, 500);
});

