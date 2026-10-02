// Author: Nakshatra Gupta
// ISU Netid: ng1308@iastate.edu
// Date: October 01, 2026

fetch("./ng1308_Activity08_MoviesFromJSON.json")
    .then(response => response.json())
    .then(myMovies => loadMovies(myMovies));

function loadMovies(myMovies) {
    var mainContainer = document.getElementById("goodmovies");

    for (var i = 0; i < myMovies.movies.length; i++) {
        let movieId = myMovies.movies[i].movieId;
        let title = myMovies.movies[i].title;
        let year = myMovies.movies[i].year;
        let url = myMovies.movies[i].url;

        let col = document.createElement("div");
        col.className = "col-md-3 mb-4";
        col.id = "movie_" + movieId;

        col.innerHTML = `
            <div class="card h-100">
                <img src="${url}" class="card-img-top" alt="${title}">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${year}</p>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" checked
                               id="check_${movieId}" onchange="toggleMovie('${movieId}')">
                        <label class="form-check-label" for="check_${movieId}">
                            Show movie
                        </label>
                    </div>
                </div>
            </div>
        `;

        mainContainer.appendChild(col);
    }
}

function toggleMovie(movieId) {
    let movieDiv = document.getElementById("movie_" + movieId);
    let checkbox = document.getElementById("check_" + movieId);

    if (checkbox.checked) {
        movieDiv.style.display = "block";
    } else {
        movieDiv.style.display = "none";
    }
}
