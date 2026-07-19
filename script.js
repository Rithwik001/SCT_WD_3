const cells = document.querySelectorAll(".cell");
const status = document.getElementById("status");
const restart = document.getElementById("restart");

let board = ["","","","","","","","",""];
let currentPlayer = "X";
let gameOver = false;

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

cells.forEach(cell=>{
    cell.addEventListener("click",playGame);
});

function playGame(){

    const index = this.dataset.index;

    if(board[index] !== "" || gameOver)
        return;

    board[index] = currentPlayer;
    this.textContent = currentPlayer;

    if(checkWinner()){
        status.textContent = "Player " + currentPlayer + " Wins!";
        gameOver = true;
        return;
    }

    if(!board.includes("")){
        status.textContent = "Match Draw!";
        gameOver = true;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    status.textContent = "Player " + currentPlayer + "'s Turn";
}

function checkWinner(){

    for(let pattern of winPatterns){

        let a = pattern[0];
        let b = pattern[1];
        let c = pattern[2];

        if(
            board[a] &&
            board[a] === board[b] &&
            board[b] === board[c]
        ){
            return true;
        }
    }

    return false;
}

restart.addEventListener("click",()=>{

    board = ["","","","","","","","",""];

    currentPlayer = "X";

    gameOver = false;

    status.textContent = "Player X's Turn";

    cells.forEach(cell=>{
        cell.textContent = "";
    });

});