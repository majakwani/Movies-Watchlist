const moviesList = document.getElementById("movies-list");
console.log(moviesList)

if (!localStorage.getItem("movies")){
  moviesList.innerHTML = `
    <div class="temp flex">
    <p>Your watchlist is looking a little empty</p>
    <a href="./index.html">
        <div id="link-back">
            <img class="plus-logo" src="../images/Icon(2).png">
            <p>Let's add some movies!</p>
        </div>
    </a>
</div>   
    `;
}
else{
    const parsedArray = JSON.parse(localStorage.getItem("movies"))
    for (let movie of parsedArray){
        fetch(`http://www.omdbapi.com/?apikey=aee19077&t=${movie}`)
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
                <button type="button" class="add-movie-btn"><img data-title = "${data.Title}" id="plus-logo" src="../images/Icon(5).png"><span data-title = "${data.Title}" class="watchlist">Remove</span></button>
            </div>
            <div class="description">
                ${data.Plot}
            </div>
        </div>
    </div>
    <div class="line"></div>
    `;
      });
    }
}

document.addEventListener('click', (e) => {
    if(e.target.dataset.title){
        const updateArray = JSON.parse(localStorage.getItem("movies"))
        for(let movie of updateArray){
            if(movie === e.target.dataset.title){
                const index = updateArray.indexOf(movie)
                updateArray.splice(index, 1)
            }
        }
        localStorage.setItem("movies", JSON.stringify(updateArray))
        location.reload()
    }
})