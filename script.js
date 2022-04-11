const container = document.querySelector(".container");
const startBtn = document.querySelector(".startBtn");

const modal = document.getElementById("myModal-game");
const modalAI = document.getElementById("myModal-ai");
const modalAIBtn = document.querySelector(".ai-btn");
const modalAICloseBtn = document.querySelector(".ai-close");
const modalPlayer = document.getElementById("myModal-player");
const modalPlayerBtn = document.querySelector(".player-btn");
const modalPlayerCloseBtn = document.querySelector(".player-close");
const modalWinning = document.getElementById("myModal-win");
const modalWinningBtn = document.querySelector(".win-btn");
const modalWinningCloseBtn = document.querySelector(".win-close");

const winning = document.querySelector(".winning");
const closeBtn = document.querySelector(".close");
const okBtn = document.querySelector(".okBtn");
const vsPlayer = document.getElementById("vsPlayer");
const xTeam = document.getElementById("team-x");

let gridArray = [];
let playerOne;
let playerTwo;
let takenTile;

startBtn.onclick = function() {
    modal.style.display = "block";
    window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
    }
    closeBtn.onclick = function(){
        modal.style.display = "none";
    }
    
}

okBtn.onclick = function() {
    modal.style.display = "none";
    if (vsPlayer.checked){
        modalPlayer.style.display = "block";
        modalPlayerBtn.onclick = function() {
            modalPlayer.style.display = "none";
            playerOne = document.getElementById("player-one").value;
            if (playerOne == "") playerOne = "X";
            playerTwo = document.getElementById("player-two").value;
            if (playerTwo == "") playerTwo = "O";
            startGame();
        }
        modalPlayerCloseBtn.onclick = function() {
            modalPlayer.style.display = "none";
        }
        window.onclick = function(event) {
            if (event.target == modalPlayer) {
              modalPlayer.style.display = "none";
            }
        }
    } else {
        modalAI.style.display = "block";
        modalAIBtn.onclick = function() {
            modalAI.style.display = "none";
            playerOne = "";
            playerTwo = "";
            startGame();
        }
        modalAICloseBtn.onclick = function() {
            modalAI.style.display = "none";
        }
        window.onclick = function(event) {
            if (event.target == modalAI) {
                modalAI.style.display = "none";
            }
        }
    }  
}

function startGame() {
    resetPreviousGrid();
    gridArray = [];
    make3by3grid();
    if (vsPlayer.checked){
        playerVsPlayer();
    } else {
        if (xTeam.checked){
            playerVsAI("X");
        } else playerVsAI("O");
    } 
}

function make3by3grid() {
    for (let i = 0; i < 9; i++){
        let gameTile = document.createElement("div");
        gameTile.className = "tile";
        gameTile.id = `${i+1}`;
        container.appendChild(gameTile);
    }
}

function resetPreviousGrid() {
    if (container.children)
       container.innerHTML="";
}

function playerVsPlayer() {
    let temp = document.getElementsByClassName("tile");
    let previus = "O";
    takenTile = 0;
    for (const iterator of temp) {       
        iterator.onclick = function () {
            if (iterator.innerHTML == ""){
                if (previus == "X"){
                    iterator.innerHTML = "O";
                    iterator.className = "tile-animated";
                    iterator.style = "color: #E900FF;"
                    gridArray[iterator.id] = "O";
                    previus = "O";
                    takenTile++;
                    if (isItOver())
                        gameOver("O");
                }
                else { 
                    iterator.innerHTML = "X";
                    iterator.className = "tile-animated";
                    iterator.style = "color: #5800FF;";
                    gridArray[iterator.id] = "X";
                    previus = "X";
                    takenTile++;
                    if (isItOver())
                        gameOver("X");
                }
            }
            if (takenTile >= 9){
                if (isItOver())
                        gameOver(previus);
                    else gameOver("-");
            }   
        }
    }
}

function playerVsAI(team) {
    let temp = document.getElementsByClassName("tile");
    takenTile = 0;
    if (team == "X"){
        for (const iterator of temp) {
            iterator.onclick = function () {
                if (iterator.innerHTML == ""){
                    iterator.innerHTML = "X";
                    iterator.className = "tile-animated";
                    iterator.style = "color: #5800FF;";
                    gridArray[iterator.id] = "X";
                    takenTile++;
                    if (isItOver())
                            gameOver("X");
                    else if (takenTile >= 9){
                        if (isItOver())
                            gameOver("X");
                        else gameOver("-");
                    } else {
                        let ran = randomMove();
                        let temp = document.getElementById(ran);
                        temp.innerHTML = "O";
                        temp.className = "tile-animated";
                        temp.style = "color: #E900FF;"
                        gridArray[ran] = "O";
                        takenTile++;
                        if (isItOver())
                            gameOver("O");
                    }
                } 
            }
        }
    }
    if (team == "O"){ 
        if (takenTile==0){
            let ran = randomMove();
            let temp = document.getElementById(ran);
            temp.innerHTML = "X";
            temp.className = "tile-animated";
            temp.style = "color: #5800FF;";
            gridArray[ran] = "X";
            takenTile++;
        }
        for (const iterator of temp) { 
            if (iterator.innerHTML == ""){    
                iterator.onclick = function () {
                    if (iterator.innerHTML == ""){ 
                        iterator.innerHTML = "O";
                        iterator.className = "tile-animated";
                        iterator.style = "color: #E900FF;"
                        gridArray[iterator.id] = "O";
                        takenTile++;
                        if (isItOver())
                                gameOver("O");
                        
                        let ran = randomMove();
                        let temp = document.getElementById(ran);
                        temp.innerHTML = "X";
                        temp.className = "tile-animated";
                        temp.style = "color: #5800FF;";
                        gridArray[ran] = "X";
                        takenTile++;
                        if (takenTile >= 9){
                            if (isItOver())
                                gameOver("X");
                            else gameOver("-");
                        }
                        if (isItOver())
                            gameOver("X");
                    }
                }   
            }
        }
    }
}

function isItOver(){
    let over = false;
    if (    gridArray[1] !== undefined &&
            gridArray[1] === gridArray[2] &&
            gridArray[2] === gridArray[3]){
            let temp1 = document.getElementById("1");
            let temp2 = document.getElementById("2");
            let temp3 = document.getElementById("3");
            temp1.style.backgroundColor = "#FFC600";
            temp2.style.backgroundColor = "#FFC600";
            temp3.style.backgroundColor = "#FFC600";
        return true;
    }
    if (    gridArray[4] !== undefined &&
            gridArray[4] === gridArray[5] &&
            gridArray[5] === gridArray[6]){
            let temp1 = document.getElementById("4");
            let temp2 = document.getElementById("5");
            let temp3 = document.getElementById("6");
            temp1.style.backgroundColor = "#FFC600";
            temp2.style.backgroundColor = "#FFC600";
            temp3.style.backgroundColor = "#FFC600";
        return true;
    }
    if (    gridArray[7] !== undefined &&
            gridArray[7] === gridArray[8] &&
            gridArray[8] === gridArray[9]){
            let temp1 = document.getElementById("7");
            let temp2 = document.getElementById("8");
            let temp3 = document.getElementById("9");
            temp1.style.backgroundColor = "#FFC600";
            temp2.style.backgroundColor = "#FFC600";
            temp3.style.backgroundColor = "#FFC600"; 
        return true;
    }
    if (    gridArray[1] !== undefined &&
            gridArray[1] === gridArray[4] &&
            gridArray[4] === gridArray[7]){
            let temp1 = document.getElementById("1");
            let temp2 = document.getElementById("4");
            let temp3 = document.getElementById("7");
            temp1.style.backgroundColor = "#FFC600";
            temp2.style.backgroundColor = "#FFC600";
            temp3.style.backgroundColor = "#FFC600";
        return true;
    }
    if (    gridArray[2] !== undefined &&
            gridArray[2] === gridArray[5] &&
            gridArray[5] === gridArray[8]){
            let temp1 = document.getElementById("2");
            let temp2 = document.getElementById("5");
            let temp3 = document.getElementById("8");
            temp1.style.backgroundColor = "#FFC600";
            temp2.style.backgroundColor = "#FFC600";
            temp3.style.backgroundColor = "#FFC600";
        return true; 
    }
    if (    gridArray[3] !== undefined &&
            gridArray[3] === gridArray[6] &&
            gridArray[6] === gridArray[9]){
            let temp1 = document.getElementById("3");
            let temp2 = document.getElementById("6");
            let temp3 = document.getElementById("9");
            temp1.style.backgroundColor = "#FFC600";
            temp2.style.backgroundColor = "#FFC600";
            temp3.style.backgroundColor = "#FFC600";
        return true; 
    }
    if (    gridArray[3] !== undefined &&
            gridArray[3] === gridArray[5] &&
            gridArray[5] === gridArray[7]){
            let temp1 = document.getElementById("3");
            let temp2 = document.getElementById("5");
            let temp3 = document.getElementById("7");
            temp1.style.backgroundColor = "#FFC600";
            temp2.style.backgroundColor = "#FFC600";
            temp3.style.backgroundColor = "#FFC600";
        return true;
    }if (   gridArray[1] !== undefined &&
            gridArray[1] === gridArray[5] &&
            gridArray[5] === gridArray[9]){
            let temp1 = document.getElementById("1");
            let temp2 = document.getElementById("5");
            let temp3 = document.getElementById("9");
            temp1.style.backgroundColor = "#FFC600";
            temp2.style.backgroundColor = "#FFC600";
            temp3.style.backgroundColor = "#FFC600";
        return true;
        }
    return false;
}

function randomMove() {
    let notTakenTiles = [];
    for (let i = 1; i < 10; i++){
        if (!gridArray[i]){
            notTakenTiles.push(i);
        }
    }
    let ran = Math.floor((Math.random() * notTakenTiles.length) + 0);
    return notTakenTiles[ran];
}

function gameOver(result) {
    //container.innerHTML = "";
    modalWinning.style.display = "block";
    if (result == "-"){
        winning.innerHTML = `DRAW!`;
    } else if (playerOne == ""){
        winning.innerHTML = `${result} WON!`;
        if (result == "X"){
            winning.style = "color: #5800FF;";
        } else {
            winning.style = "color: #E900FF;"
        }
    } else {
        if (result == "X"){
            winning.innerHTML = `${playerOne} WON!`;
            winning.style = "color: #5800FF;";
        } else if (result == "O"){
            winning.innerHTML = `${playerTwo} WON!`;
            winning.style = "color: #E900FF;"
        } else {
        winning.innerHTML = `DRAW!`;
        }
    }
    
    modalWinningCloseBtn.onclick = function() {
        modalWinning.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == modalWinning) {
            modalWinning.style.display = "none";
        }
    }
    modalWinningBtn.onclick = function() {
        modalWinning.style.display = "none";
        startGame();
    }
}
