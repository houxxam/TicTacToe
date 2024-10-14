let selectTurnBox = document.querySelector('.turn-select');
let selectTurnMessage = document.querySelector('.select-turn-message');
let firstTurnValue = document.querySelectorAll('.first-turn');
let square = document.getElementsByClassName('square');
let startValue = null;
let gameFinished = false;
let currentValue;
let gameArray = [
    "0","1","2",
    "3","4","5",
    "6","7","8"
];

let winnerMessage = document.querySelector('.result-alert p');
let winnerLabel = document.querySelector('.result-alert .winner');
let overlay = document.querySelector('.overlay');
let myAlert = document.querySelector('.result-alert');
let newGameBtn = document.getElementById('new-game');




// detect first Value X or O
for (const item of firstTurnValue) {
    item.addEventListener('click', () => {
        startValue = item.innerHTML;
        console.log(`start value is ${startValue}`);
        selectTurnBox.classList.add('invisible');
        selectTurnMessage.classList.add('invisible');
    });
}
// Function to remove the shake class after the animation ends
function removeShakeEffect() {
    selectTurnBox.classList.remove('shake-btns');
}
// on board Click
for (const item of square) {
    item.addEventListener('click', () => {
        if(gameFinished){
            return
        }
       
        if (startValue !== null) { 
             currentValue= startValue;
            let value = item.getAttribute("value");
            if(gameArray[value] === "x" || gameArray[value] === "o"){
                return
            }
            let squareContent = document.querySelector(`.square[value='${value}']`);
            squareContent.innerHTML = startValue;
            gameArray[value] = currentValue;
            console.log(value);
            console.log(gameArray);
           // Switch turns globally by updating startValue
           startValue = (currentValue === "x") ? "o" : "x";
            detectWinner();

        } else {
            selectTurnBox.classList.toggle('shake-btns');
            setTimeout(removeShakeEffect, 500);
        }
    });
}

function detectWinner(){
    if(
        //row
        (gameArray[0]=== gameArray[1] && gameArray[1] === gameArray[2]) || 
        (gameArray[3]=== gameArray[4] && gameArray[4] === gameArray[5]) ||
        (gameArray[6]=== gameArray[7] && gameArray[7] === gameArray[8]) ||
        // columns
        (gameArray[0]=== gameArray[3] && gameArray[3] === gameArray[6]) ||
        (gameArray[1]=== gameArray[4] && gameArray[4] === gameArray[7]) ||
        (gameArray[2]=== gameArray[5] && gameArray[5] === gameArray[8]) ||
        //Diagonal
        (gameArray[0]=== gameArray[4] && gameArray[4] === gameArray[8]) ||
        (gameArray[2]=== gameArray[4] && gameArray[4] === gameArray[6])
    ){
        let winner ;
        if(currentValue === "x"){
            winner = "x";
           
        }else{
            winner = "o";


        }
        winnerMessage.innerHTML= "the winner is";
        winnerLabel.innerHTML = winner;
       
        gameFinished = true;
        overlay.classList.remove('invisible');
        myAlert.classList.add('visible');
        console.log(`winner is ${winner}`);
        newGame();
    }
    let isDraw = true;
    for(square of gameArray){
        if(square !== "x" && square !== "o"){
            isDraw =false;
        }
    }
    if(isDraw){
        gameFinished = true;
        overlay.classList.remove('invisible');
        myAlert.classList.add('visible');
        winnerLabel.innerHTML= "DRAW";
        winnerMessage.innerHTML= "";
        
    }
}

overlay.addEventListener('click',()=>{
    overlay.classList.add('invisible');
    myAlert.classList.remove('visible');
    newGame();
});


newGameBtn.addEventListener('click',()=>{
    newGame();
});

function newGame() {
    let square = document.getElementsByClassName('square');

    // Clear all squares
    for (const item of square) {
        let value = item.getAttribute("value");
        let squareContent = document.querySelector(`.square[value='${value}']`);
        squareContent.innerHTML = "";
    }

  
    gameArray = [
        "0","1","2",
        "3","4","5",
        "6","7","8"
    ];

    // Reset startValue and gameFinished flag
    startValue = null;  // Reset to allow players to choose again
    gameFinished = false;  // Allow playing again

    // Show the turn selection box again
    selectTurnBox.classList.remove('invisible');
    selectTurnMessage.classList.remove('invisible');
}

