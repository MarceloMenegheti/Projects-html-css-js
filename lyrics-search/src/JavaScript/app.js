const form = document.querySelector('#form')
const searchInput = document.querySelector('#search')
const songsContainer = document.querySelector('#songs-container')
const prevAndNextContainer = document.querySelector('#prev-and-next-container')

const apiUrl = `https://api.lyrics.ovh`

form.addEventListener('submit', event => {
    event.preventDefault()

    const searchTerm = searchInput.value

    console.log(searchTerm);
})
console.log({form, searchInput, songsContainer, prevAndNextContainer});