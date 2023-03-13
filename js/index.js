const submission = document.querySelector("#form");
const moviesList = document.getElementById("movies-list");
moviesList.innerHTML = `
<div class="temp flex">
          <img src="../images/Icon(1).png" />
          <p>Start exploring</p>
        </div>
`;

// Event handler on form submission
submission.addEventListener("submit", (e) => {
  e.preventDefault();
  let userInput = document.getElementById("search");
  fetchData(userInput.value);
  userInput.value = "";
});

// Searching list of movies with names similar to user input
async function fetchData(inputValue) {
  const res = await fetch(
    `http://www.omdbapi.com/?apikey=aee19077&s=${inputValue}`
  );
  const json = await res.json();
  displayMovie(json);
}

// Searching for specific movies title and displaying each movie separately
function displayMovie(movieData) {
  moviesList.innerHTML = "";
  const movies = movieData.Search.map((movie) => {
    fetch(`http://www.omdbapi.com/?apikey=aee19077&t=${movie.Title}`)
      .then((res) => res.json())
      .then((data) => {
        moviesList.innerHTML += `
        <div id="movie" class="flex">
        <div class="image-div">
            <img class="thumbnail" src= ${data.Poster}>
        </div>
        <div class="details-div">
            <div class="title-rating flex">
                <p class="movie-title">${data.Title}</p>
                <p class="rating"><img src="../images/Icon(4).png">${data.Ratings[0].Value}</p>
            </div>
            <div class="duration-genre-add flex">
                <p class="duration">${data.Runtime}</p>
                <p class="genre">${data.Genre}</p>
                <button type="button" class="add-movie-btn"><img data-title = "${data.Title}" id="plus-logo" src="../images/Icon(2).png"><span data-title = "${data.Title}" class="watchlist">Watchlist</span></button>
            </div>
            <div class="description">
                ${data.Plot}
            </div>
        </div>
    </div>
    <div class="line"></div>
    `;
      });
  });
}

// saving data on localstorage
document.addEventListener("click", (e) => {
  if (e.target.dataset.title) {
    if (!localStorage.getItem("movies")) {
      const movies = [];
      movies.push(e.target.dataset.title);
      localStorage.setItem("movies", JSON.stringify(movies));
    } else {
      const parsedArray = JSON.parse(localStorage.getItem("movies"));
      for (let movie of parsedArray) {
        if (movie === e.target.dataset.title) {
          return;
        }
      }
      parsedArray.push(e.target.dataset.title);
      localStorage.setItem("movies", JSON.stringify(parsedArray));
    }
  }
});
