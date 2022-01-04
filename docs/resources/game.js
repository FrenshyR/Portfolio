"use strict";

/*    
   Author: Frenshy Ruiz
   Date:   5/29/2021
*/
//var numGuesses = 0;

document.getElementById("startButton").onclick = start;

function start(){ 
    var symbols = ['!', '!', '@', '@', '#', '#', '$', '$', '%', '%', '^', '^', '&', '&', '*', '*'];
    window.numGuesses = 0;
    window.userInput = 0;
    userInput = document.getElementById("numSymbols").value;

    //UserIput can only be 8 
    if(userInput > 8){
        userInput = 8;
    }

    document.getElementById("startForm").style.display = "none";   

    //display game
    createGame(userInput);
    assignValue(symbols, userInput);

    //create score board
    var scoreBoard = document.createElement("p");
    scoreBoard.setAttribute("id", "scoreBoard");
    scoreBoard.innerHTML = "Number of Guesses: " + numGuesses;
    var mainHeading = document.getElementsByTagName("H1")[0];
    mainHeading.appendChild(scoreBoard);

    //Handle cards when flipped
    var currCard = document.querySelectorAll(".cards");
    for (var i = 0; i < currCard.length; i++) {
        currCard[i].addEventListener("click", function(e){
            var card = e.target;
            //switch card to flipped 
            card.setAttribute("class", "flipped");
            var symbol = card.getAttribute("id");
            card.innerHTML = "<p>" + symbol + "</p>";
            checkForMatch();
        });
    }
}

function createGame(userInput){
    var htmlString = "";
    var cells = 0;

    htmlString += "<table>";

    //If input is only 1
    if (userInput == 1) {
        htmlString += "<tr>";
        for (var i = 0; i < 2; i++) {
            htmlString += "<td id='" + cells++ + "' class='cards'></td>";
        }
        htmlString += "</tr>";
    }
    // 2 & 8 will result in a perfect square cells
    else if (userInput == 2 || userInput == 8){
        var totalCells = userInput * 2;
        var rowsAndCells = Math.sqrt(totalCells);
        for (var i = 0; i < rowsAndCells; i++) {
            htmlString += "<tr>";
            for(var j = 0; j < rowsAndCells; j++){
                htmlString += "<td class='cards'></td>";
            }
            htmlString += "</tr>"
        }
    }
    //6 will result in a special arrangement
    else if (userInput == 6){
        for (var i = 0; i < 3; i++) {
            htmlString += "<tr>";
            for(var j = 0; j < 4; j++){
                htmlString += "<td class='cards'></td>";
            }
            htmlString += "</tr>"
        }
    }
    //Any other input will result in a 2 rows
    else{
        for (var i = 0; i < 2; i++) {
            htmlString += "<tr>";
            for(var j = 0; j < userInput; j++){
                htmlString += "<td class='cards'></td>";
            }
            htmlString += "</tr>";
        }        
    }
    htmlString += "</table>";
    document.getElementById("game").innerHTML = htmlString;
}

function assignValue(symbols, userInput){
    var neededSymbols = new Array(userInput * 2);

    //Loading needed symbols into array
    for(var i = 0; i < userInput * 2; i++){
        neededSymbols[i] = symbols[i];
    }
    //Randomly shuffle array
    neededSymbols = neededSymbols.sort(() => Math.random() - 0.5);
    var cards = document.querySelectorAll(".cards");
    for (var i = 0; i < cards.length; i++) { 
        cards[i].setAttribute("id", neededSymbols[i]);
    }  
}

function checkForMatch(){
    var flippedCard = document.querySelectorAll(".flipped");

    // Check for second flipped card
    if(flippedCard.length === 2){
        var symbol = flippedCard[0].getAttribute("id");
        var symbol2 = flippedCard[1].getAttribute("id");

        updateScore();

        //Handle if match
        if(symbol == symbol2){
        flippedCard[0].setAttribute("class", "confirmMatch");
        flippedCard[1].setAttribute("class", "confirmMatch");
        //Check if all symbols have been match   
        checkWinner();
        }
        else{
            //Flip cards back
            setTimeout(function() {
                flippedCard[0].innerText = "";
                flippedCard[1].innerText = "";
                flippedCard[0].setAttribute("class", "cards");
                flippedCard[1].setAttribute("class", "cards");
            }, 500);
        }
    }
}

function updateScore(){
    numGuesses++;
    //Displat score board
    document.getElementById("scoreBoard").innerHTML = "Number of Guesses: " + numGuesses;
}

function checkWinner(){
    var confirmMatch = document.querySelectorAll(".confirmMatch");
    setTimeout(function() {
        if (confirmMatch.length == userInput * 2) {
            //alert("Congratulations! You won!");
            document.getElementById("game").style.display = "none"; 

            var endGame = document.createElement("p");
            endGame.setAttribute("id", "endGame");
            endGame.innerHTML = "You Won! Thank You for Playing!";
            var scoreBoard = document.getElementById("scoreBoard");
            scoreBoard.appendChild(endGame);
        }
    }, 500);
}






