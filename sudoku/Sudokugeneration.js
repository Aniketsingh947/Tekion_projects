

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]; 
    }
}

function fillBox(grid, row, col) {
   
    let numbers = [];
    for (let i = 1; i <= 9; i++) {
        numbers.push(i);
    }

    shuffleArray(numbers);
    
    let index = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let num = numbers[index];
            if (unUsedInBox(grid, row, col, num)) {
                grid[row + i][col + j] = num;
            }
            index++;
        }
    }
}

// Check if it's safe to put num in Subsquare
function unUsedInBox(grid, rowStart, colStart, num) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (grid[rowStart + i][colStart + j] === num) {
                return false;
            }
        }
    }
    return true;
}

// Check if it's safe to put num in row i
function unUsedInRow(grid, i, num) {
    for (let j = 0; j < 9; j++) {
        if (grid[i][j] === num) {
            return false;
        }
    }
    return true;
}

// Check if it's safe to put num in column j
function unUsedInCol(grid, j, num) {
    for (let i = 0; i < 9; i++) {
        if (grid[i][j] === num) {
            return false;
        }
    }
    return true;
}

// Check if safe to put in tiles "cell"
function checkIfSafe(grid, i, j, num) {
    return (unUsedInRow(grid, i, num)
            && unUsedInCol(grid, j, num)
            && unUsedInBox(grid, i - (i % 3), j - (j % 3),
                           num));
}

// Fill the diagonal 3x3 matrices
function fillDiagonal(grid) {
    for (let i = 0; i < 9; i += 3) {
        fillBox(grid, i, i);
    }
}

// Fill remaining blocks
function fillRemaining(grid, i, j) {
    if (j >= 9 && i < 8) {
        i++;
        j = 0;
    }
    if (i >= 9 && j >= 9) {
        return true;
    }
    if (i < 3) {
        if (j < 3) {
            j = 3;
        }
    }
    else if (i < 6) {
        if (j === Math.floor(i / 3) * 3) {
            j += 3;
        }
    }
    else {
        if (j === 6) {
            i++;
            j = 0;
            if (i >= 9) {
                return true;
            }
        }
    }
    let numbers = [];
    for (let i = 1; i <= 9; i++) {
        numbers.push(i);
    }

    shuffleArray(numbers);//Taking shuffled array and not taking randomly generated number because there could a case only invalid number or same number 
    // is generated and not generating the valid one resulting in a infinte loop. 

    for (let ind= 0; ind < 9; ind++) {
        if (checkIfSafe(grid, i, j, numbers[ind])) {
            grid[i][j] = numbers[ind];
            if (fillRemaining(grid, i, j + 1)) {
                return true;
            }
            grid[i][j] = 0;
        }
    }
    return false;
}

//Keeping only prefilled tiles
function KeepDigits(grid, row, col) {
    let positions = [];
    
    
    while (positions.length < 3) {
        let randomPos = Math.floor(Math.random() * 9); 
        let r = Math.floor(randomPos / 3);  
        let c = randomPos % 3;  
        let pos = [row + r, col + c];
        
      
        if (!positions.some(p => p[0] === pos[0] && p[1] === pos[1])) {
            positions.push(pos);
        }
    }
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let shouldSkip = false;
            positions.forEach(pos => {
                if (pos[0] === row + i && pos[1] === col + j) {
                    shouldSkip = true;
                }
            });
            if (shouldSkip) continue;
            grid[row + i][col + j] = "";
        }
    }
}

//Sudoku generation logic begins here
function sudokuGenerator() {
    const grid
        = Array.from({length : 9}, () => Array(9).fill(0));

    fillDiagonal(grid);
    fillRemaining(grid, 0, 3);
    const visiblegrid = grid.map(row => row.slice());
    for (let i = 0; i < 9; i += 3) {
        for (let j = 0; j < 9; j += 3) {
            KeepDigits(visiblegrid, i, j);
        }
    }
    return [visiblegrid,grid];
}

export default sudokuGenerator;