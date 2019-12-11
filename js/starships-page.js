import { starships } from '../assets/starships.js'
//Above is importing the information for the starships


let contentArea = document.querySelector('.content')

//the ship's div, name, and image are defined
starships.forEach(ship => {
    let shipDiv = document.createElement('div')
    let shipName = document.createElement('h3')
    let shipPic = document.createElement('img')

    shipName.textContent = ship.name
    let shipNum = getCharNumber(ship.url)

    //pulling the image from the import data/api
    shipPic.src = `https://starwars-visualguide.com/assets/img/starships/${shipNum}.jpg`

    shipDiv.appendChild(shipName)
    shipDiv.appendChild(shipPic)
    contentArea.appendChild(shipDiv)
})

//A character number function for some reason.
function getCharNumber(charURL) {
    let end = charURL.lastIndexOf('/')
    let charID =charURL.substring(end -2, end)
    if(charID.indexOf('/') !== -1) {
        return charID.slice(1,2)
        } else {
            return charID
        }
}