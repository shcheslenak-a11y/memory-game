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
    document.getElementById("turns").textContent = turns;
    document.getElementById("matched").textContent = matched;

    for(let el of document.getElementsByClassName("card")) {
    el.addEventListener("click", (event) => {
        if (el.classList.contains("matched")) return;
        let current = document.getElementsByClassName("clicked")
        if (current.length > 1) return;
        current = current[0];
        el.classList.add("clicked");
        if(current) {
            if (el.dataset.id == current.dataset.id) {
                el.classList.add("matched");
                current.classList.add("matched");
                matched += 1;
                document.getElementById("matched").textContent = matched;
            }
            turns += 1;
            document.getElementById("turns").textContent = turns;
            window.setTimeout(() => {
                el.classList.remove("clicked");
                current.classList.remove("clicked");
            }, 1000);
        }
        if (matched == 8) endGame();
        
    })
}
}

//newGame()

//document.getElementById("new-game").addEventListener("click", newGame)

function generateButton(inner, callback, id=null){
    let button = document.createElement("div")
    button.classList.add("button");
    button.append(inner);
    button.addEventListener("click", callback);
    if (id) button.id = id;
    return button;
}


function closeModal(){
    document.getElementById("modal").close()
}

function showModal(header, modalContent){
    document.getElementById("dialog-header").textContent = header;
    let modal = document.getElementById("modal")
    let content =  document.getElementById("dialog-content")
    content.replaceChildren()
    content.append(...modalContent)
    modal.showModal();
}

function getLeaders(){
    return JSON.parse(storage.getItem("leaders") || "[]")
}

function endGame(){

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    let currentDate = `${dd}.${mm}.${yyyy}`

    let block = document.createElement("div")
    block.classList.add("result");

    let leaders = getLeaders()
    let i = 0;
    for(; i<leaders.length; i++){
        if (turns < leaders[i][0])
            break
    }
    leaders.splice(i, 0, [turns, currentDate])
    while (leaders.length > 10) { leaders.pop();}

    storage.setItem("leaders",  JSON.stringify(leaders))

    let H = document.createElement("h3")
    let T = document.createElement("p")
    let D = document.createElement("p")

    H.textContent = "You succesfully finish game"
    T.textContent = `Turns: ${turns}`
    D.textContent = `Date: ${currentDate}`

    block.append(H, T, D)


    showModal("Congratilation", [block , generateButton("New Game", () => {closeModal();newGame()})])
}

function formTableRow(data, header=false){
    let row = document.createElement("tr")
    data.forEach(el => {
        let rowdata = document.createElement(header? "th" : "td");
        rowdata.textContent=el;
        row.appendChild(rowdata);
    });
    return row;
}

function formLeaderTable() {
    
    let leaders = getLeaders()
    if (leaders.length){
        let table = document.createElement("table");
        [["turns", "Date"]].concat(leaders).forEach((row, index) => {
            table.appendChild(formTableRow([index || "#"].concat(row), index == 0));
        });
        return table
    } else {
        let p = document.createElement("p");
        p.textContent = "Ops! It's nothing here. Please finish the game to have record."
        return p
    }
}

function createText(tag, text, id=null) {
    let T = document.createElement(tag)
    T.textContent = text
    if (id) T.id = id
    return T
}
//document.getElementById("leaders").addEventListener("click", () => {showModal("Leader Board", [formLeaderTable()])})

function onLoad() {
    let header = document.createElement("header")

    header.append(
        generateButton(createText("h2", "New Game"), newGame),
        generateButton(createText("h2","Leaders"), () => { showModal("Leader Board", [formLeaderTable()]) })
    )

    let main = document.createElement("main")

    let counters = document.createElement("div")
    counters.id = "counters"
    let turns = document.createElement("p")
    turns.append("Turns: ", createText("span", 0, "turns"))
    let matches = document.createElement("p")
    matches.append(createText("span", 0, "matched"), " from 8 pairs found")
    
    counters.append(turns, matches)
    
    main.append(counters, createText("div", "", "cards"))

    let dialog = document.createElement("dialog")
    dialog.id="modal"
    
    let inner = document.createElement("div")
    inner.classList.add("inner")
    inner.append(
        createText("h2", "", "dialog-header"),
        createText("div", "", "dialog-content"),
        generateButton("Close", closeModal)
    )
    dialog.append(inner)

    document.body.append(header, main, dialog)
    newGame()
}

onLoad()