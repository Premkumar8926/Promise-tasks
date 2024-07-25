// Function to fetch a random Chuck Norris joke
function fetchChuckNorrisJoke() {
    return fetch('https://api.chucknorris.io/jokes/random')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error fetching Chuck Norris joke:', error);
            throw error;
        });
}

// Function to display the Chuck Norris joke on the webpage
function displayJoke(joke) {
    const jokeTextElement = document.querySelector('.joke-text');
    jokeTextElement.textContent = joke.value;
}

// Function to handle the button click event
function handleNewJokeButtonClick() {
    fetchChuckNorrisJoke()
        .then(data => displayJoke(data))
        .catch(error => console.error('Error fetching and displaying Chuck Norris joke:', error));
}

// Event listener for the button click
document.addEventListener('DOMContentLoaded', () => {
    const newJokeButton = document.querySelector('.btn-new-joke');
    newJokeButton.addEventListener('click', handleNewJokeButtonClick);
});
