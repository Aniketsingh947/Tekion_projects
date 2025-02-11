import sudokuGenerator from "./Sudokugeneration.js";
import { msToTime,generateUUID } from "./utilities.js";

let totalfilled=25;


const alltiles = document.querySelectorAll(".tiles");
alltiles.forEach(function(tile){
    const newsudoku=new Sudoku();
    tile.addEventListener('change',function(event){
        const value=parseInt(event.target.value);
        const row=event.target.dataset.row;
        const column=event.target.dataset.column;
        console.log(value);
        console.log(Number.isNaN(value));
        newsudoku.setValue(row,column,value);
    });
    tile.addEventListener('input', function(event) {
        const value = event.target.value;
        if (!/^[1-9]$/.test(value)) {
            event.target.value = '';
        }
    });
});


const validatebutton=document.querySelector('.validate');
validatebutton.addEventListener('click',function()
    {
        const newsudoku=new Sudoku();
        if(newsudoku.validate())
            {
                console.log("inside validate");
                newsudoku.endtime=Date.now();
                const millis=newsudoku.endtime-newsudoku.starttime;
                const timelapsed=msToTime(millis); 
                alert(`Total Time taken : ${timelapsed}`);
                startnewgame();
                //here will make appear a new div for showing the timetaken and only Newgame button will appear along with it,for timebeing i am keeping this alert functionality.
                //totaltimeplayed.textContent=timelapsed;
            }
        else
            {
                if(totalfilled==81){
                alert("InCorrect");
                }
                else
                {
                    alert('Incomplete');
                }
            }
    }
)


const Newgamebutton=document.querySelector('.newgame');
Newgamebutton.addEventListener('click',function()
{
    totalfilled=25;
    Sudoku.instance=null;
    startnewgame();
})



function checkforUsername()
{
    const inputname = localStorage.getItem("userName");

    if (inputname === null || inputname === "") {
        window.location.href='home.html';
    }
}


function startnewgame() {
        const newsudoku=new Sudoku();
        console.log(newsudoku);
        if(newsudoku.visiblegrid)
        {
            console.log("entered");
                for (let i = 0; i < 9; i++) {
                    for (let j = 0; j < 9; j++) {
                        const ele = document.querySelector(`[data-row='${i}'][data-column='${j}']`);
                        ele.classList.remove('prefilled');
                        if (ele) {
                            ele.value = newsudoku.visiblegrid[i][j];  
                        }
                        if(newsudoku.visiblegrid[i][j]!="")
                        {
                            ele.readOnly=true;
                            ele.classList.add("prefilled");
                        }
                    }
                }
        }
}


function Sudoku()
{

    if (Sudoku.instance) {
        return Sudoku.instance;  
    }

    this.id=generateUUID();
    this.playername=localStorage.getItem("userName");
    const [visiblegrid,grid] = sudokuGenerator();
    let privategrid=grid;
    this.visiblegrid=visiblegrid;
    this.starttime=Date.now();
    this.endtime=null;

    Sudoku.instance = this;

    this.validate = function()
    {
        return JSON.stringify(this.visiblegrid) === JSON.stringify(privategrid);
    }
    return this;
}


Sudoku.prototype.setValue=function(row,column,value)
{
    if(!Number.isNaN(value))
    {
    this.visiblegrid[row][column]=value;
    totalfilled=totalfilled+1;
    console.log(totalfilled);
    }
    else
    {
        this.visiblegrid[row][column]='';
        totalfilled=totalfilled-1;
        console.log(totalfilled);
    }
    console.log(this.visiblegrid);
}

window.onload = function() {
    checkforUsername();  
    startnewgame();  
};