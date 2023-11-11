//Input the number
document.querySelector('#sudoku-board').addEventListener('keyup', (event) => {
    if (event.target && event.target.nodeName == "TD") {
        let validNum = /[1-9]/;
        let tdEl = event.target;
        if (tdEl.innerText.length > 0 && validNum.test(tdEl.innerText[0])) {
          tdEl.innerText = tdEl.innerText[0];
          tdEl.style.backgroundColor = 'lightgrey';
        } else {
          tdEl.innerText = '';
          tdEl.style.backgroundColor = 'white';
        }
      }
});

document.querySelector('#clear-button').addEventListener('click', () => {
    let tdArr = document.getElementsByTagName('td');

    for (let i = 0; i < tdArr.length; i++){

        tdArr[i].innerText = '';
        tdArr[i].style.backgroundColor = 'white';

    }

    document.getElementById('invalid-sudoku').innerText = '';
});

document.querySelector('#solve-button').addEventListener('click', () => {
    let board = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    let tdArr = document.getElementsByTagName('td');
    let row = -1, col = 0;
    for (let i = 0; i < tdArr.length; i++){
        if (i % 9 === 0){
            row++;
            col = 0;
        }

        if (tdArr[i].innerText.length != 0){
            board[row][col] = Number(tdArr[i].innerText);
        }

        col++;
    }

    if (isValidSudoku(board)){
        solveSudoku(board, 0, 0);
        printSodoku(board);
        document.getElementById('invalid-sudoku').innerText = '';
    } else{
        document.getElementById('invalid-sudoku').innerText = 'Invalid Sudoku!';
    }
    

});

function solveSudoku(board, row, col){

    if (col === board.length){
        row++;
        col = 0;
    }

    if (row === board.length){
        return true;
    }

    if (board[row][col] !== 0){
        return solveSudoku(board, row, col+1);
    }

    for (let choice = 1; choice <= 9; choice++){
        if (possible(board, row, col, choice)){
            board[row][col] = choice;
            if (solveSudoku(board, row, col+1)) return true;
            board[row][col] = 0;
        }
    }

    return false;
}

function possible(board, row, col, value){
    for (let i = 0; i < board.length; i++){
        if (board[i][col] === value){
            return false;
        }
    }

    for (let i = 0; i < board.length; i++){
        if (board[row][i] === value){
            return false;
        }
    }

    const r = row - row % 3;
    const c = col - col % 3;

    for (let i = r; i < r + 3; i++){
        for (let j = c; j < c + 3; j++){

            if (board[i][j] === value){
                return false;
            }
        }
    }

    return true;
}

function printSodoku(board){
    let tdArr = document.getElementsByTagName('td');
    let ind = 0;
    for (let i = 0; i < board.length; i++){
        for (let j = 0; j < board.length; j++){
            tdArr[ind].innerText = `${board[i][j]}`;
            ind++;
        }
    }
}

function isValidSudoku(board){
    for (let i = 0; i < board.length; i++){
        for (let j = 0; j < board.length; j++){
            if (board[i][j] !== 0){
                let val = board[i][j];
                board[i][j] = 0;
                if (!possible(board, i, j, val)){
                    board[i][j] = val;
                    return false;
                }

                board[i][j] = val;
            }
        }
    }

    return true;
}
