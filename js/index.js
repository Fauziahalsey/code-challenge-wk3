const { response } = require("express");

fetch(' http://localhost:3000/films')
.then(response => response.json())
.then (data => {

const{poster, title, runtime, description, showtime, capacity, tickets_sold,}= data;

    // updating html elements with movie details 

    document.getElementById('poster').src = poster;
    document.getElementById('description').textContent = description;
    document.getElementById('title').textContent = title;
    document,getElementById('showtime').textContent = showtime;
    document,getElementById('runtime').textContent = runtime;

    const ticketsAvailable = capacity - tickets_sold;

    document.getElementById('tickets').textContent = ticketsAvailable

})

.catch(error =>{
    console.log('Error:', error):
});