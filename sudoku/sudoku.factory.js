import { generateUUID } from "./utilities";

// this file i am thinking to make to make all the Object creation,instance and deletion modular to make it more readable and this will help in
// second pr to fix where in place of calling "const newsudoku = new Sudoku" at every function call or at every eventhandler by just calling the
// "getInstance" or "resetInstance" cause at present solution a global variable is being created "containsObject" which more or else defeats the
// purpose of singleton pattern .
// though i am not attaching this right now with main file.

function Sudoku() {
  if (Sudoku.instance) {
    return Sudoku.instance;
  }

  this.id = generateUUID();
  this.playername = localStorage.getItem("userName");
  const [visiblegrid, grid] = sudokuGenerator();
  let privategrid = grid;
  this.visiblegrid = visiblegrid;
  this.starttime = Date.now();
  this.endtime = null;

  Sudoku.instance = this;

  this.validate = function () {
    return JSON.stringify(this.visiblegrid) === JSON.stringify(privategrid);
  };
  return this;
}

Sudoku.prototype.setValue = function (row, column, value) {
  if (!Number.isNaN(value)) {
    this.visiblegrid[row][column] = value;
    totalfilled = totalfilled + 1;
    console.log(totalfilled);
  } else {
    this.visiblegrid[row][column] = "";
    totalfilled = totalfilled - 1;
    console.log(totalfilled);
  }
  console.log(this.visiblegrid);
};

export function getInstance() {
  const newsudoku = new Sudoku();
  return newsudoku;
}

export function resetSudokuInstance() {
  Sudoku.instance = null;
}
