const form = document.querySelector('#form')
const searchInput = document.querySelector('#search')
const songsContainer = document.querySelector('#songs-container')
const prevAndNextContainer = document.querySelector('#prev-and-next-container')

const apiUrl = `https://api.lyrics.ovh`

const insertSongsIntoPage = songsInfo => {
    console.log(songsInfo);
    songsContainer.innerHTML = ``
}

const fetchSongs = async term => {
    const Response = await fetch(`${apiUrl}/suggest/${term}`)
    const data = await Response.json()

    insertSongsIntoPage(data)
}

form.addEventListener('submit', event => {
    event.preventDefault()

    const searchTerm = searchInput.value.trim()

    if(!searchTerm){
        songsContainer.innerHTML =`<li class="warning-message">Por favor, digite um termo valido</li>` 
        return
    }

    fetchSongs(searchTerm)
})
//console.log({form, searchInput, songsContainer, prevAndNextContainer});