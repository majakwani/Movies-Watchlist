const submission = document.querySelector("#form");
const moviesList = document.getElementById('movies-list')

submission.addEventListener("submit", (e) => {
  e.preventDefault();
  let userInput = document.getElementById("search");
  fetchData(userInput.value);
  userInput.value = "";
});

async function fetchData(inputValue) {
  const res = await fetch(
    `http://www.omdbapi.com/?apikey=aee19077&s=${inputValue}`
  );
  const json = await res.json();
  displayMovie(json)
}

function displayMovie(movieData){
  const movies = movieData.Search.map((movie) => {
    fetch(`http://www.omdbapi.com/?apikey=aee19077&t=${movie.Title}`)
      .then(res => res.json())
      .then((data) => {
        console.log(data)
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
                <button type="button" class="add-movie-btn"><img id="plus-logo" src="../images/Icon(2).png"><span class="watchlist">Watchlist</span></button>
            </div>
            <div class="description">
                ${data.Plot}
            </div>
        </div>
    </div>
    <div class="line"></div>
    `
      })
  })
}