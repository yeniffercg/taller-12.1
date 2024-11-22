document.addEventListener("DOMContentLoaded", function() {
    
    fetch(`https://japceibal.github.io/japflix_api/movies-data.json`)
    .then(response => response.json())
    .then(data => {
        const movies = data; 
        const btnBuscar = document.getElementById("btnBuscar");
        const inputBuscar = document.getElementById('inputBuscar');
        const lista = document.getElementById("lista");


        btnBuscar.addEventListener("click", function() {
            const searchText = inputBuscar.value.toLowerCase();
            if (searchText) {
                const moviesFiltered = movies.filter(movie =>
                    movie.title.toLowerCase().includes(searchText) ||
                    movie.tagline.toLowerCase().includes(searchText) ||
                    movie.overview.toLowerCase().includes(searchText) ||
                    movie.genres.some(genre => genre.name.toLowerCase().includes(searchText))
                );
                showMovies(moviesFiltered);
            }
        });

        // Muestra las peliculas
        function showMovies(array) {
            lista.innerHTML = ''; 
            array.forEach(movie => {
                lista.innerHTML += `
                    <li class="list-group-item bg-dark mb-1 rounded" data-bs-toggle="offcanvas" data-bs-target="#a${movie.id}">
                        <h5 class="fw-bold text-white">${movie.title} ${stars(movie.vote_average)}</h5>
                        <p class="text-muted fst-italic">${movie.tagline}</p>
                    </li>
                    <div class="offcanvas offcanvas-top" tabindex="-1" id="a${movie.id}">
                        <div class="offcanvas-header">
                            <h5 class="offcanvas-title">${movie.title}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
                        </div>
                        <div class="offcanvas-body">
                            <p>${movie.overview}</p>
                            <p><strong>Genres:</strong> ${movie.genres.map(genre => genre.name).join(', ')}</p>
                            <p><strong>Year:</strong> ${movie.release_date.substring(0, 4)}</p>
                            <p><strong>Runtime:</strong> ${movie.runtime} mins</p>
                        </div>
                    </div>`;
            });
        }

        //función calificación
        function stars(vote) {
            const filledStars = Math.floor(vote / 2);
            return '<span class="fa fa-star checked"></span>'.repeat(filledStars) + 
                   '<span class="fa fa-star not-checked"></span>'.repeat(5 - filledStars);
        }
    });
});
