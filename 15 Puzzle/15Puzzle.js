//CIS 525 Project 2: Fifteen Puzzle
//by Blake LaFuente
//November 7,2017 

var numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
var numberMoves = 0;
var gameOver = false;
var time=0;
var emptyCell = 0;


function shuffle(array) {
//shuffles array of numbers
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there are unshuffled numbers
  while (0 !== currentIndex) {

    // Pick a random 
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}


//starts timer with interval of 1 second
function startTime(){
    window.setInterval("timer()", 1000);
} 

//increases time by one and displays
function timer(){ 
  if(gameOver == false){
    time++;
    document.getElementById("time").innerHTML ="Time: " + time +" seconds";
  }
} 

//function is activated at load
//replaces numbers in table with shuffled numbers
//16 becomes the empty cell
window.onload = function setTable() {
    numberMoves = 0;
    gameOver = false;

    shuffledNumbers = shuffle(numbers);
    shuffledNumbers[16] = shuffledNumbers[0];
    for(var i=1; i <= 16; i++) {
        var cellNum = document.getElementById(i);
        if(shuffledNumbers[i] == 16) {
            cellNum.innerHTML = "";
            emptyCell = i;
        }
        else
            cellNum.innerHTML = shuffledNumbers[i];

    }
}


function move(cell)
//moves clicked cell and replaces with empty cell
{
    //can't move if game is over
    if(gameOver == true)
        return;

    //checks if there is an empty cell adjacent to clicked cell
    else if(cell.innerHTML != "") {
      var nextToEmpty = false;
      var cellID = parseInt(cell.id);
      if (cellID == 1){
        if (emptyCell == 2 | emptyCell == 5){
          nextToEmpty = true;
        }
      }
      else if(cellID == 2| cellID == 3){
        if(emptyCell == cellID-1 | emptyCell == cellID+1 | emptyCell == cellID+4){
           nextToEmpty = true;
           }
      }
      else if(cellID == 4){
        if(emptyCell == 3 | emptyCell == 8){
           nextToEmpty = true;
           }
      }
      else if (cellID == 5 | cellID == 9){
        if(emptyCell == cellID-4 | emptyCell == cellID+1 | emptyCell == cellID+4){
           nextToEmpty = true;
           }
      }
      else if (cellID == 6| cellID == 7 | cellID == 10 |cellID == 11){
        if(emptyCell==cellID-4 | emptyCell==cellID-1 | emptyCell==cellID+1 | emptyCell==cellID+4){
           nextToEmpty = true;
           }
      }
      else if (cellID == 8 | cellID == 12){
        if(emptyCell==cellID-4 | emptyCell==cellID-1 | emptyCell==cellID+4){
           nextToEmpty = true;
           }
      }
      else if (cellID == 13){
        if(emptyCell==9 | emptyCell==14){
           nextToEmpty = true;
           }
      }
      else if(cellID == 14|cellID == 15){
        if(emptyCell==cellID-4 | emptyCell==cellID-1 | emptyCell==cellID+1){
           nextToEmpty = true;
           }
      }
      else if(cellID == 16){
        if(emptyCell==12 | emptyCell==15){
           nextToEmpty = true;
           }
      }
      
      //if there is indeed an empty cell next to the clicked cell,
      //replaces cell with empty cell. Increases and displays number of moves.
      if(nextToEmpty == true){
        numberMoves++;
        document.getElementById("message").innerHTML ="";;
        document.getElementById(emptyCell).innerHTML = cell.innerHTML;
        cell.innerHTML = "";
        emptyCell = cell.id;
        document.getElementById("numMoves").innerHTML ="Number of Moves: " + numberMoves;
      }
      
      //if there are no empty cells adjacent to clicked cell, an error cell is displayed
      else if(nextToEmpty == false){
        document.getElementById("message").innerHTML = "There are no empty spaces next to clicked tile!";
      }
     
      //checks if the game is over. If true, winning message is displayed.
      if(finished() == true){
        gameOver = true;
        document.getElementById("message").innerHTML = "You've won the game! Game won in " + numberMoves + " moves!";
      }
    }
}

function finished() {
//checks if game is won. Can only occur if every cell has correct number.
    return document.getElementById('1').innerHTML == '1' &&
        document.getElementById('2').innerHTML == '2' &&
        document.getElementById('3').innerHTML == '3' &&
        document.getElementById('4').innerHTML == '4' &&
        document.getElementById('5').innerHTML == '5' &&
        document.getElementById('6').innerHTML == '6' &&
        document.getElementById('7').innerHTML == '7' &&
        document.getElementById('8').innerHTML == '8' &&
        document.getElementById('9').innerHTML == '9' &&
        document.getElementById('10').innerHTML == '10' &&
        document.getElementById('11').innerHTML == '11' &&
        document.getElementById('12').innerHTML == '12' &&
        document.getElementById('13').innerHTML == '13' &&
        document.getElementById('14').innerHTML == '14' &&
        document.getElementById('15').innerHTML == '15' &&
        document.getElementById('16').innerHTML == '';
}

//sets up easy game where all numbers are correct, except the empty cell and 15th cell are reversed.
//One Move Game
function simpleGame(){
  if(gameOver == true)
    {
      window.location.reload();
    }
  else
    {
      time = 0;
      numberMoves = 0;
      document.getElementById("numMoves").innerHTML ="Number of Moves: " + numberMoves;
      for(var i=1; i <= 16; i++) {
          var cellNum = document.getElementById(i);
          if(i == 15) {
              cellNum.innerHTML = " ";
              emptyCell = i;
          }
          else if(i == 16) {
              cellNum.innerHTML = "15";
          }
          else{
              cellNum.innerHTML = i;
          }
      }
    }
}

//starts timer at load
window.addEventListener("load", startTime, false);



