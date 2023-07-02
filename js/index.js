// Function to display movie details
function displayMovieDetails(movie) {
  const { poster, title, runtime, showtime, capacity, tickets_sold } = movie;
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
  buyTicketButton.textContent = ticketsAvailable === 0 ? 'Sold Out' : 'Buy Ticket';
  buyTicketButton.removeEventListener('click', buyTicket);
  if (ticketsAvailable > 0) {
    buyTicketButton.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent page  from refreshing
      buyTicket(movie);
    });
  }
}

// Function to handle ticket purchase
function buyTicket(movie) {
  const { capacity, tickets_sold } = movie;
  const availableTickets = capacity - tickets_sold;

  if (availableTickets > 0) {
    const updatedTicketsSold = tickets_sold + 1;

    displayMovieDetails({
      ...movie,
      tickets_sold: updatedTicketsSold
    });

    const ticketsAvailableElement = document.getElementById('movie-tickets');
    ticketsAvailableElement.textContent = updatedTicketsSold;

    const filmItem = document.getElementById(`film-${movie.id}`);
    filmItem.classList.toggle('sold-out', updatedTicketsSold === capacity);
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
  .then(populateFilmMenu)
  .catch(error => {
    console.log('Error:', error);
  });
