var array = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
var turns;
var matched;

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
    turns = 0;
    matched = 0;
    let cards = document.getElementById("cards");
    cards.replaceChildren();
    
    array.sort(() => Math.random() - 0.5).forEach(element => {
        cards.appendChild(generateCard(element))
    });
    document.getElementById("turns").innerHTML=turns;
    document.getElementById("matched").innerHTML=matched;
}

newGame()

document.getElementById("new-game").addEventListener("click", newGame)

for(let el of document.getElementsByClassName("card")) {
    el.addEventListener("click", (event) => {
        if (el.classList.contains("matched")) return;
        let current = document.getElementsByClassName("clicked")
        if (current.length > 1) return;
        current = current[0];
        el.classList.add("clicked");
        if(current) {
            console.log(current, el)
            if (el.dataset.id == current.dataset.id) {
                el.classList.add("matched");
                current.classList.add("matched");
                matched += 1;
                document.getElementById("matched").innerHTML = matched;
            }
            turns += 1;
            document.getElementById("turns").innerHTML = turns;
            window.setTimeout(() => {
                el.classList.remove("clicked");
                current.classList.remove("clicked");
            }, 1000);
        }
        if (matched == 8) endGame();
    })
}