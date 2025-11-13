document.addEventListener('DOMContentLoaded', () => {
    // Getting references to HTML elements
    const searchButton = document.getElementById('searchbutton');
    const searchField = document.getElementById('searchfield');
    const resultDiv = document.getElementById('result');

    // Function to perform search
    const performSearch = () => {
        const query = searchField.value.trim();

        // Build URL for PHP fetch
        let url = 'superheroes.php';
        if (query !== '') {
            url += `?query=${encodeURIComponent(query)}`;
        }

        // Fetch results from PHP
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text(); // Expect HTML from PHP
            })
            .then(data => {
                resultDiv.innerHTML = data; // Display results
                console.log(data)
            })
            .catch(error => {
                console.error('Fetch error:', error);
                resultDiv.innerHTML = `<p class="error">Error fetching data. Please try again.</p>`;
            });
    };

    // Search on button click
    searchButton.addEventListener('click', performSearch);

    // Search when Enter key is pressed in input field
    searchField.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
});
