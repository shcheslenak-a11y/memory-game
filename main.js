var array = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];

function generateCard(data) {
    let card = document.createElement("div")
    card.classList.add("card")
    card.dataset.id = data
    let image = document.createElement("img")
    image.src = `images/${data}.jpg`
    card.appendChild(image)
    return card
}

function newGame(){
    let cards = document.getElementById("cards");
    cards.replaceChildren();
    
    array.sort(() => Math.random() - 0.5).forEach(element => {
        cards.appendChild(generateCard(element))
    });
}

newGame()

document.getElementById("new-game").addEventListener("click", newGame)