

let board = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
};

let playerTurn = '';
let warning = '';
let playing = false;
let winsO = 0;
let winsX = 0;


document.querySelector('.reset').addEventListener('click', reset);
document.querySelectorAll('.item').forEach( item => {
    item.addEventListener('click', itemClick);
});



function itemClick(event) {
    let item = event.target.getAttribute('data-item');
    if(playing && board[item] === ''){
        board[item] = playerTurn;
        renderBoard();
        togglePlayer();
    }
}

function reset() {
    warning = '';

    let random = Math.floor(Math.random() * 2);
    playerTurn = (random === 0) ? 'x' : 'o';

    for(let i in board) {
        board[i] = '';
    }
    playing = true;

    renderBoard();
    renderInfo();
}

function renderBoard() {
    for(let i in board){
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = board[i];
    }

    checkGame();
}


function renderInfo() {
    document.querySelector('.vez').innerHTML = playerTurn;
    document.querySelector('.resultado').innerHTML = warning;
}

function togglePlayer() {
    playerTurn = (playerTurn === 'x') ? 'o' : 'x';
    renderInfo();
}

function checkGame() {
    if(checkWinnerFor('x')) {
        warning = 'Player "x" wins!';
        winsX++;
        renderScore('x', winsX);
        playing = false;
    } else if(checkWinnerFor('o')) {
        warning = 'Player "o" wins!';
        winsO++;
        renderScore('o', winsO);
        playing = false;
    } else if(isFull()){
        warning = 'Game tied!';
        playing = false;
    }
}

function renderScore(playerWin, winsPlayer) {
    document.querySelector(`.score-${playerWin}`).innerHTML = `${playerWin.toUpperCase()}: ${winsPlayer}`;
}
function checkWinnerFor(playerTurn) {
    let arrPos = [ 
        'a1,a2,a3', 
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ];

    for(let w in arrPos) {
        let pArray = arrPos[w].split(','); 
        let hasWon = pArray.every( option => board[option] === playerTurn); 
        
        if(hasWon) return true;
    }

    return false;
}

function isFull() {
    for(let i in board){
        if(board[i] === '') return false;
    }
    return true;
}










































