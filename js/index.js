// Function to display movie details
function displayMovieDetails(movie) {
  const { poster, title, runtime, description, showtime, capacity, tickets_sold } = movie;
  const ticketsAvailable = capacity - tickets_sold;

  const moviePoster = document.getElementById('movie-poster');
  moviePoster.src = poster;
  moviePoster.style.display = 'block';

  document.getElementById('movie-title').textContent = title;
  document.getElementById('movie-runtime').textContent = `Runtime: ${runtime} minutes`;
  document.getElementById('movie-showtime').textContent = `Showtime: ${showtime}`;
  document.getElementById('movie-tickets').textContent = ticketsAvailable;

  const buyTicketButton = document.getElementById('buy-ticket');
  buyTicketButton.classList.toggle('sold-out', ticketsAvailable === 0);
  buyTicketButton.removeEventListener('click', buyTicket);
  if (ticketsAvailable > 0) {
    buyTicketButton.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent page refresh
      buyTicket(movie);
    });
  }
}

// Function to handle ticket purchase
function buyTicket(movie) {
  const { id, capacity, tickets_sold } = movie;
  const availableTickets = capacity - tickets_sold;

  if (availableTickets > 0) {
movie.tickets_sold = tickets_sold + 1;

    fetch(`http://localhost:3000/films/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ tickets_sold: updatedTicketsSold })
    })
      .then(response => response.json())
      .then(updatedMovie => {
        displayMovieDetails(updatedMovie);
        const ticketsAvailableElement = document.getElementById('movie-tickets');
        ticketsAvailableElement.textContent = updatedTicketsSold;
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }
}

// Function to populate film menu
function populateFilmMenu(films) {
  const filmsList = document.getElementById('films');
  filmsList.innerHTML = '';

  films.forEach(film => {
    const { id, title, capacity, tickets_sold } = film;
    const li = document.createElement('li');
    li.classList.add('film-item');
    li.id = `film-${id}`;
    li.textContent = title;
    if (capacity - tickets_sold === 0) {
      li.classList.add('sold-out');
    }

    li.addEventListener('click', function(event) {
      event.preventDefault();

      fetch(`http://localhost:3000/films/${id}`)
        .then(response => response.json())
        .then(movie => {
          displayMovieDetails(movie);
        })
        .catch(error => {
          console.log('Error:', error);
        });
    });

    filmsList.appendChild(li);
  });
}

// Fetch movie list and populate the film menu
fetch('http://localhost:3000/films')
  .then(response => response.json())
  .then(films => {
    populateFilmMenu(films);
  })
  .catch(error => {
    console.log('Error:', error);
  });
