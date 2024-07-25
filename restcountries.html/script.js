// Function to display country information
const displayCountryInfo = countryCode => {
  fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch country details (HTTP status ${response.status})`);
      }
      return response.json();
    })
    .then(countryData => {
      const country = countryData[0];
      // Update DOM elements with country information
      document.getElementById("country-name").textContent = country.name.common;
      document.getElementById("country-flag").src = country.flags?.svg || "";
      document.getElementById("country-flag").alt = `Flag of ${country.name.common}`;
      document.getElementById("capital").textContent = country.capital?.[0] || "N/A";
      document.getElementById("population").textContent = country.population?.toLocaleString("en-US") || "N/A";
      document.getElementById("region").textContent = country.region || "N/A";
      document.getElementById("subregion").textContent = country.subregion || "N/A";
      document.getElementById("languages").textContent = Object.values(country.languages || {}).join(", ") || "N/A";
      document.getElementById("currencies").textContent = Object.values(country.currencies || {}).map(curr => `${curr.name} (${curr.symbol || "-"})`).join(", ") || "N/A";
    })
    .catch(error => {
      console.error("Error fetching country details:", error.message);
      // Display an error message on the webpage or log it for further investigation
      alert("Failed to fetch country details. Please try again later.");
    });
};

document.addEventListener("DOMContentLoaded", () => {
  const countriesSelect = document.getElementById('countries');
  const searchInput = document.getElementById('country-search');

  // Fetch countries data
  fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(countries => {
      countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country.cca3;
        option.textContent = country.name.common;
        countriesSelect.appendChild(option);
      });
    })
    .catch(error => console.error('Error fetching countries:', error));

  countriesSelect.addEventListener('change', event => {
    displayCountryInfo(event.target.value);
  });

  searchInput.addEventListener('input', () => {
    const filter = searchInput.value.toLowerCase();
    Array.from(countriesSelect.options).forEach(option => {
      const countryName = option.textContent.toLowerCase();
      option.style.display = countryName.includes(filter) ? '' : 'none';
    });
  });
});
