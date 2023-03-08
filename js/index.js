const submission = document.querySelector("#form");

submission.addEventListener("submit", (e) => {
  e.preventDefault();
  let userInput = document.getElementById('search')
  fetchData(userInput.value)
  userInput.value = ""
});

async function fetchData(inputValue){
    const res = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=aee19077&t=${inputValue}`)
    const json = await res.json()
    console.log(json)
}