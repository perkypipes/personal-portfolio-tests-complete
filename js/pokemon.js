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

    //this makes it flip when clicked
    pokeCard.addEventListener( 'click', function() {
        pokeCard.classList.toggle('is-flipped');
    });
}
//Information on the card front
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
    let pokeHP = document.createElement('h6')
    let pokeWeight = document.createElement('h6')
    let pokeHeight = document.createElement('h6')
    let pokeType = document.createElement('h6')
    pokeBack.setAttribute('class', 'pokeBack')
    //let pokeRegion = document.createElement('h6')
    //let pokeRegion = getPokeRegion(data.region)
    pokeOrder.textContent = `#${data.id} ${data.name[0].toUpperCase()}${data.name.slice(1)}`
    //this is pretty neat^^
    pokeHP.textContent = `HP: ${data.stats[0].base_stat}`
    pokeWeight.textContent = `Weight: ${data.weight}kg`
    pokeHeight.textContent = `Height: ${data.height}m`

    //this was cool but i didn't wanna steal
    //pokeType.textContent = `Type: ${data.types.map(t => t.type.name)}`
    //pokeRegion.textContent = `Region: ${getPokeRegion}`

    pokeBack.appendChild(pokeOrder)
    pokeBack.appendChild(pokeHP)
    pokeBack.appendChild(pokeWeight)
    pokeBack.appendChild(pokeHeight)
    pokeBack.appendChild(pokeType)
    //pokeBack.appendChild(pokeRegion)

}


//Heres this cool function i can't call :(

// function getPokeRegion(id) {
//     if (id < 151) {
//       return "Kanto";
//     } else if (id > 151 && id < 252) {
//       return "Jhoto";
//     } else if (id > 250 && id < 387) {
//       return "Hoenn";
//     } else if (id > 386 && id < 494) {
//       return "Sinnoh";
//     } else if (id > 493 && id < 650) {
//       return "Unova";
//     } else if (id > 649 && id < 722) {
//       return "Kalos";
//     } else (id > 721 && id < 807) 
//       return "Alola";
// }




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
    alert('That Pokemon ID does not exist! (but 1-806 do!)')
} 
})