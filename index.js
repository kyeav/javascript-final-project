function openMenu() {
    document.body.classList += " menu--open"
}

function closeMenu() {
    document.body.classList.remove('menu--open')
}

// http://www.omdbapi.com/?apikey=ee6b865a

const moviesEl = document.querySelector('.movies')
const val = document.querySelector("input").value
let searchResultEl = document.querySelector('.film__title')
let filmsData


async function search(event) {
    const val = document.querySelector("input").value
    setTimeout(() => {
        if (event.keyCode === 13) {
            renderFilms(val)
        }
    }, 1000)
}

async function searchButton(event) {
    const val = document.querySelector("input").value
    setTimeout(() => {
        renderFilms(val)
    }, 1000)
}


async function renderFilms(val) {
    const films = await fetch(`https://www.omdbapi.com/?apikey=ee6b865a&s=${val}`)
    filmsData = await films.json() 
    // const firstSix = filmsData.Search.filter((elem) => elem).slice(0, 6)
    let result = val
    searchResultEl.innerHTML = result
    moviesEl.innerHTML = filmsData.Search.map((film) => filmHTML(film)).slice(0, 6).join("")
}

function filterMovies(event) {
    const filter = event.target.value
    if (filter === "OLD-NEW") {
        filmsData.Search.sort((a, b) => a.Year - b.Year)
    }
    else if (filter === "NEW-OLD") {
        filmsData.Search.sort((a, b) => b.Year - a.Year)
    } 
    else if (filter === "A-Z") {
        filmsData.Search.sort((a, b) => a.Title.localeCompare(b.Title))
    }
    moviesEl.innerHTML = filmsData.Search.map((film) => filmHTML(film)).slice(0, 6).join("")
}

function filmHTML(film) {
    return `<div class="movie">
    <figure class="movie__img--wrapper">
        <img class="movie__img" src="${film.Poster}" alt="">
    </figure>
    <div class="movie__title">${film.Title}</div>
    <div class="movie__date">Release year(s): ${film.Year}</div>
</div>`
}
