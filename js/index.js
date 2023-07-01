// Fetch movie details for the first movie
fetch('http://localhost:3000/films/1')
  .then(response => response.json())
  .then(movie => {
    const { poster, title, runtime, description, showtime, capacity, tickets_sold } = movie;
    const ticketsAvailable = capacity - tickets_sold;

    document.getElementById('movie-poster').src = poster;
    document.getElementById('movie-title').textContent = title;
    document.getElementById('movie-runtime').textContent = `Runtime: ${runtime} minutes`;
    document.getElementById('movie-showtime').textContent = `Showtime: ${showtime}`;
    document.getElementById('movie-tickets').textContent = `Tickets available: ${ticketsAvailable}`;
    document.getElementById('movie-description').textContent = description;
  })
  .catch(error => {
    console.log('Error:', error);
  });

// Fetch movie list
fetch('http://localhost:3000/films')
  .then(response => response.json())
  .then(films => {
    const filmsList = document.getElementById('films');

    films.forEach(film => {
      const { id, title, poster } = film;
      const li = document.createElement('li');
      li.classList.add('film-item');
      li.innerHTML = `
        <div>
          <img src="${poster}" alt="${title} Poster">
          <h2>${title}</h2>
        </div>
      `;
      filmsList.appendChild(li);
    });
  })
  .catch(error => {
    console.log('Error:', error);
  });

// Function to populate film menu
function populateFilmMenu(films) {
  const filmsList = document.getElementById('films');

  films.forEach(film => {
    const { id, title, capacity, tickets_sold } = film;
    const filmItem = document.createElement('li');
    filmItem.textContent = title;
    filmItem.classList.add('film-item');

    if (capacity - tickets_sold === 0) {
      filmItem.classList.add('sold-out');
    }

    filmItem.addEventListener('click', () => {
      displayMovieDetails(film);
    });

    filmsList.appendChild(filmItem);
  });
}

// Fetch movie details on page load
window.addEventListener('load', () => {
  // Fetch first movie's details
  fetchData('/films/1', movie => {
    displayMovieDetails(movie);
  });

  // Fetch all movies and populate the film menu
  fetchData('/films', films => {
    populateFilmMenu(films);
  });
});

//tickets purchase
function buyTicket() {
  const availableTicketsElement = document.getElementById('movie-tickets');
  let availableTickets = parseInt(availableTicketsElement.textContent.split(': ')[1]);

  if (availableTickets > 0) {
    availableTicketsElement.textContent = `Available Tickets: ${availableTickets - 1}`;
  }

  if (availableTickets === 1) {
    document.getElementById('buy-ticket').disabled = true;
    document.querySelector('.film-item').classList.add('sold-out');
  }
}

// Event listener for buy ticket button
document.getElementById('buy-ticket').addEventListener('click', buyTicket);
