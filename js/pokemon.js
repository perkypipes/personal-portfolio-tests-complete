//https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/001.png

async function getAPIData(url) {
    try {
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

const theData = getAPIData('https://pokeapi.co/api/v2/pokemon/?limit=25')
.then(data => {
    for (const pokemon of data.results) {
        getAPIData(pokemon.url)
        .then(pokedata => {
            populateDOM(pokedata)
        })
    }
})

console.log(theData)

let mainArea = document.querySelector('main')

function populateDOM(single_pokemon) {
    //let pokeDiv = document.createElement('div')
    let pokeScene = document.createElement('div')
    let pokeCard = document.createElement('div')
    let pokeFront = document.createElement('div')
    let pokeBack = document.createElement('div')
    let name = document.createElement('p')
    let pic = document.createElement('img')

    fillCardFront(pokeFront, single_pokemon)
    fillCardBack(pokeBack, single_pokemon)

    //pokeDiv.setAttribute('class', 'charDivs')
    pokeScene.setAttribute('class', 'scene')
    pokeCard.setAttribute('class', 'card')
    pokeFront.setAttribute('class', 'charDivs card__face card__face--front')
    pokeBack.setAttribute('class', 'card__face card__face--back')
    pic.setAttribute('class', 'picDivs')

    let pokeNum = getPokeNumber(single_pokemon.id)
    pokeFront.appendChild(name)
    //name.textContent = single_pokemon.name
    //name.textContent = `${single_pokemon.name} height ${single_pokemon.height}`

    //pic.src = `../images/${pokeNum}.png`
    //pic.src = `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${pokeNum}.png`
    pokeFront.appendChild(pic)
    pokeFront.appendChild(name)

    pokeCard.appendChild(pokeFront)
    pokeCard.appendChild(pokeBack)
    pokeScene.appendChild(pokeCard)
    //pokeDiv.appendChild(name)
    //pokeDiv.appendChild(pic)
    
    mainArea.appendChild(pokeScene)

    pokeCard.addEventListener( 'click', function() {
        pokeCard.classList.toggle('is-flipped');
    });
}

function fillCardFront(pokeFront, data) {
    pokeFront.setAttribute('class', 'card__face card__face--front')
    let name = document.createElement('p')
    let pic = document.createElement('img')
    pic.setAttribute('class', 'picDivs')
    let pokeNum = getPokeNumber(data.id)

    
    pokeFront.appendChild(name)
    //pic.src = `../images/${pokeNum}.png`

    pic.src = `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${pokeNum}.png`
    name.textContent = `#${data.id} ${data.name[0].toUpperCase()}${data.name.slice(1)}`
    pokeFront.appendChild(pic)
    //pokeFront.appendChild(name)
}

function fillCardBack(pokeBack, data) {
    let pokeOrder = document.createElement('p')
    let pokeHP = document.createElement('h5')
    pokeOrder.textContent = `#${data.id} ${data.name[0].toUpperCase()}${data.name.slice(1)}`
    //this is pretty neat^^
    //name.textContent = `${data.name} height: ${data.height}`
    //pokeHP.textContent = data.stats[0].base_stat
    pokeBack.appendChild(pokeOrder)
    pokeBack.appendChild(pokeHP)
}

function getPokeNumber(id) {
    if(id < 10) return `00${id}`
    if(id > 9 && id < 100) {
        return `0${id}`
    } else return id
}

class Pokemon {
    constructor(id, name, stats) {
        this.id = id;
        this.name = name;
        this.base_stat = stats;
    }
}

//know that the number is a number and not an array, also i get to be a vulpix bc its so cute
//const Perkymon = new Pokemon(37, 'Perkymon', 118)

document.querySelector('#pokeButton').addEventListener('click', () => {
    let pokeId = prompt("Pick a Number:")
    let pokeIdNum = parseInt(pokeId, 10)
    if(pokeIdNum > 0 && pokeIdNum < 807) {
    getAPIData(`https://pokeapi.co/api/v2/pokemon/${pokeId}`).then(result => {
        //let newPokemon = new Pokemon(result)
        populateDOM(result) 
    }).catch(error => console.log(error))
    } else {
    alert('That Pokemon ID does not exist! (but 1-809 do!)')
} 
})