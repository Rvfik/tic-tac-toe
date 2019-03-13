"use strict";

let player1 = '<img src="./cross.png">';
let player2 = '<img src="./circle.png">';

let turn = 1; //numer kolejki

let round = 1; //numer rundy
let gameOver;

let winPlayer1 = 0; //liczba wygranych rund przez gracza Player1
let winPlayer2 = 0; //liczba wygranych rund przez gracza Player1

let name1;
let name2;

/*Podmiana formularza na diva z grą*/
function changePage() {
    document.getElementById('form').style.display = "none";
    document.getElementById('box').style.display = "";
}

/*Podmiana diva z grą na formularz*/
function changePage2() {
    document.getElementById('form').style.display = "";
    document.getElementById('box').style.display = "none";
}

/*Pobranie i ustawienie imion z formularza*/
function setName() {
    name1 = document.getElementById("namePlayer1").value.toUpperCase();
    winPlayer1 = 0;
    document.getElementById("winnerPlayer1").innerHTML = `${name1}: ${winPlayer1}`;

    name2 = document.getElementById("namePlayer2").value.toUpperCase();
    winPlayer2 = 0;
    document.getElementById("winnerPlayer2").innerHTML = `${name2}: ${winPlayer2}`;

    gameOver = document.getElementById("numRounds").value

    round = 1;
    document.getElementById("round").innerHTML = `ROUND ${round} OF ${gameOver}`
}

let board = [
    '', '', '',
    '', '', '',
    '', '', '',
];

let gameEnabled = true; //czy gra nadal trwa

const fields = [...document.querySelectorAll('.game-board--field')];
fields.forEach(field => field.addEventListener('click', onFieldClick));

function onFieldClick(event) {
    if (!gameEnabled) {
        return;
    }

    if (event.target.querySelector('.game-board--field-content').innerHTML !== '') {
        alert('To pole jest juz zajęte!');
        return;
    }

    let selectedPlayer = turn % 2 === 0 ? player1 : player2;

    event.target.querySelector('.game-board--field-content').innerHTML = selectedPlayer;

    board[event.target.dataset.field] = selectedPlayer;
    turn++;

    checkGameStatus(selectedPlayer);
}

function checkGameStatus(selectedPlayer) {
    for (let i = 0; i <= 6; i = i + 3) {
        if (!!board[i] && !!board[i + 1] && !!board[i + 2]) {
            if (board[i] === board[i + 1] && board[i + 1] === board[i + 2]) {
                endRound(selectedPlayer);
            }
        }
    }

    for (let i = 0; i < 3; i++) {
        if (!!board[i] && !!board[i + 3] && !!board[i + 6]) {
            if (board[i] === board[i + 3] && board[i + 3] === board[i + 6]) {
                endRound(selectedPlayer);
            }
        }
    }

    if (!!board[0] && !!board[4] && !!board[8]) {
        if (board[0] === board[4] && board[4] === board[8]) {
            endRound(selectedPlayer);
        }
    }

    if (!!board[2] && !!board[4] && !!board[6]) {
        if (board[2] === board[4] && board[4] === board[6]) {
            endRound(selectedPlayer);
        }
    }
}

function endRound(selectedPlayer) {

    if (selectedPlayer === player1) {
        winPlayer1++;
        document.getElementById("winnerPlayer1").innerText = `${name1}: ${winPlayer1}`;
        alert(`Gratulacje, wygral gracz: ${name1}`)
    } else {
        winPlayer2++;
        document.getElementById("winnerPlayer2").innerText = `${name2}: ${winPlayer2}`;
        alert(`Gratulacje, wygral gracz: ${name2}`)
    }

    gameEnabled = false;
    round++;
}

function endGame(round) {

    if (round > gameOver && winPlayer1 > winPlayer2) {
        alert(`Koniec gry, zwyciezca to: ${name1}`)
        changePage2();
        document.getElementById("numRounds").value = "";
    } else if (round > gameOver && winPlayer2 > winPlayer1) {
        alert(`Koniec gry, zwyciezca to: ${name2}`)
        changePage2();
        document.getElementById("numRounds").value = "";
    }
}

function resetGameFields() {
    gameEnabled = true;

    board = [
        '', '', '',
        '', '', '',
        '', '', '',
    ];

    turn = 1;

    fields.forEach(field => {
        field.querySelector('.game-board--field-content').innerHTML = ''
    });

    document.getElementById("round").innerHTML = `ROUND ${round} OF ${gameOver}`

    endGame(round);
}