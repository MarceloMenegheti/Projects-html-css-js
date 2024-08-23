const form = document.querySelector('#form')
const searchInput = document.querySelector('#search')
const songsContainer = document.querySelector('#songs-container')
const prevAndNextContainer = document.querySelector('#prev-and-next-container')

const apiUrl = `https://api.lyrics.ovh`

const getMoreSongs = async url => {
    const Response = await fetch(`https://cors-anywhere.herokuapp.com/${url}`)
    const data = await Response.json()
    console.log(data);
    
    insertSongsIntoPage(data)
}

const insertSongsIntoPage = songsInfo => {
   songsContainer.innerHTML = songsInfo.data.map(song => `
    <li class="song">
        <span class="song-artist"><strong>${song.artist.name}</strong> - ${song.title}</span>
        <button class="btn" data-artist="${song.artist.name}" data-song-title="${song.title}">Ver letra</button>
    </li>
    `).join('')

    if(songsInfo.prev || songsInfo.next){
        prevAndNextContainer.innerHTML = `
            ${songsInfo.prev ? `<Button class="btn" onClick="getMoreSongs('${songsInfo.prev}')">Anteriores</button>` : ''}
            ${songsInfo.next ? `<Button class="btn" onClick="getMoreSongs('${songsInfo.next}')">Próximas</button>` : ''}
        `
        return
    } 

    prevAndNextContainer.innerHTML = ''
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

songsContainer.addEventListener('click', event => {
    console.log(event);  
})
//console.log({form, searchInput, songsContainer, prevAndNextContainer});