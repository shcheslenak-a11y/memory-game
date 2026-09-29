var array = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
let storage = window.localStorage;
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
    document.getElementById("turns").innerHTML = turns;
    document.getElementById("matched").innerHTML = matched;

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
}

newGame()

document.getElementById("new-game").addEventListener("click", newGame)



function closeModal(){
    document.getElementById("modal").close()
}

function generateButton(inner, callback, id=null){
    let button = document.createElement("div")
    button.classList.add("button");
    button.innerHTML=inner;
    button.addEventListener("click", callback);
    if (id) button.id = id;
    return button;
}



function endGame(){
    let modal = document.getElementById("modal")
    document.getElementById("dialog-header").textContent = "Congratilation";

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    let currentDate = `${dd}.${mm}.${yyyy}`
    
    let content =  document.getElementById("dialog-content")
    content.replaceChildren()
    let block = document.createElement("div")
    block.classList.add("result");

    let H = document.createElement("h3")
    let T = document.createElement("p")
    let D = document.createElement("p")

    H.textContent = "You succesfully finish game"
    T.textContent = `Turns: ${turns}`
    D.textContent = `Date: ${currentDate}`

    block.append(H, T, D)
    content.append(
        block,
        generateButton("New Game", () => {closeModal();newGame()})
    )
    modal.showModal();
}
