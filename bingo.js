// 75 possible numbers
var usedNumbers = new Array(76);
var calledNumbers = [];
var goal = "line";

function init() {
    createNewCard();
}

function createNewCard() {
    // set all elements in usedNumbers array as false
    resetUsedNumbers();
    // loops 24 times because there are 24 squares (not including free square)
    for (var i = 0; i < 25; i++) {
        if (i == 12) continue; // skip free square 

        // generates a number for each square
        generateSquare(i);
    }
}

function generateSquare(squareNum) {
    var currentSquare = 'bl' + squareNum;
    // array of column numbers
    var baseNumbers = [0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4];
    // generates random number for each square (diff for each column)
    newNumber = (baseNumbers[squareNum] * 15) + generateNewNum();
    // check if number has been used
    while (usedNumbers.includes(newNumber)) {
        newNumber = (baseNumbers[squareNum] * 15) + generateNewNum();
    }
    // sets the used number in the array as true so no duplicates
    usedNumbers[newNumber] = true;
    // sets the current square to the new number
    document.getElementById(currentSquare).value = newNumber;
}

function generateNewNum() {
    // generates a random numbers between 1 and 15
    return Math.floor((Math.random() * 15) + 1); //15
}

function resetUsedNumbers() {
    // sets all elements of the usedNumbers array to false (resets the array)
    for (var i = 0; i < usedNumbers.length; i++) {
        usedNumbers[i] = false;
    }
}

// when clicked, generates a new random card
function createAnotherCard() {
    resetUsedNumbers();
    createNewCard();
    resetSquareColours();
}

// resets all squares except FREE to white
function resetSquareColours() {
    for (var i = 0; i < 25; i++) {
        if (i == 12) continue;
        var currentSquare = document.getElementById('bl' + i);
        currentSquare.style.backgroundColor = "#ffffff";
    }
    return;
}

function markSquare(square) {
    var currentSquare = document.getElementById(square);
    if (currentSquare.style.backgroundColor == "#9dda84") 
        currentSquare.style.backgroundColor = "#ffffff";
    else
        currentSquare.style.backgroundColor = "#9dda84";
    return;
}

function callNumber() {
    var rand = Math.floor(Math.random() * 75) + 1; // random number between 1 and 75
    // if the number is in the array (already been called)
    if (calledNumbers.includes(rand))
        callNumber();
    else {
        calledNumbers.push(rand);
        if (rand >= 1 && rand <= 15)
            document.getElementById("currentCall").innerHTML = 'B' + rand;
        else if (rand >= 16 && rand <= 30)
            document.getElementById("currentCall").innerHTML = 'I' + rand;
        else if (rand >= 31 && rand <= 45)
            document.getElementById("currentCall").innerHTML = 'N' + rand;
        else if (rand >= 46 && rand <= 60)
            document.getElementById("currentCall").innerHTML = 'G' + rand;
        else
            document.getElementById("currentCall").innerHTML = 'O' + rand;
        document.getElementById("calledNums").innerHTML = calledNumbers;
    } 
}

function checkLineBingo() {
    goal = "line";
    document.getElementById("bLine").style.backgroundColor = "#4286f4";
    document.getElementById("bLine").disabled = true;
    document.getElementById("bFull").disabled = true;
    document.getElementById("bFull").style.backgroundColor = "#grey";

}

function checkFullBingo() {
    goal = "full";
    document.getElementById("bFull").style.backgroundColor = "#4286f4";
    document.getElementById("bFull").disabled = true;
    document.getElementById("bLine").disabled = true;
    document.getElementById("bLine").style.backgroundColor = "#grey";
}

function checkForBingo() {
    if (goal == "line") {
        checkVerticalBingo();
        checkHorizontalBingo();
        checkDiagonalBingo();
        checkCornersBingo();
    }
    else {
        checkFullBingo();
    }
}

function checkVerticalBingo() {
    for (var i = 0; i < 5; i++) {
        var sq1 = document.getElementById('bl' + i);
        var sq2 = document.getElementById('bl' + (i + 5));
        var sq3 = document.getElementById('bl' + (i + 10));
        var sq4 = document.getElementById('bl' + (i + 15));
        var sq5 = document.getElementById('bl' + (i + 20));

        checkLines(sq1, sq2, sq3, sq4, sq5);
    }
}

function checkHorizontalBingo() {
    j = 0;
    for (var i = 0; i < 5; i++) {
        switch(i) {
            case 0: 
                var sq1 = document.getElementById('bl' + i);
                var sq2 = document.getElementById('bl' + (i + 1));
                var sq3 = document.getElementById('bl' + (i + 2));
                var sq4 = document.getElementById('bl' + (i + 3));
                var sq5 = document.getElementById('bl' + (i + 4));
                break;
            case 1: 
                var sq1 = document.getElementById('bl' + (i + 4));
                var sq2 = document.getElementById('bl' + (i + 5));
                var sq3 = document.getElementById('bl' + (i + 6));
                var sq4 = document.getElementById('bl' + (i + 7));
                var sq5 = document.getElementById('bl' + (i + 8));
                break;
            case 2: 
                var sq1 = document.getElementById('bl' + (i + 8));
                var sq2 = document.getElementById('bl' + (i + 9));
                var sq3 = document.getElementById('bl' + (i + 10));
                var sq4 = document.getElementById('bl' + (i + 11));
                var sq5 = document.getElementById('bl' + (i + 12));
                break;
            case 3: 
                var sq1 = document.getElementById('bl' + (i + 12));
                var sq2 = document.getElementById('bl' + (i + 13));
                var sq3 = document.getElementById('bl' + (i + 14));
                var sq4 = document.getElementById('bl' + (i + 15));
                var sq5 = document.getElementById('bl' + (i + 16));
                break;
            case 4: 
                var sq1 = document.getElementById('bl' + (i + 16));
                var sq2 = document.getElementById('bl' + (i + 17));
                var sq3 = document.getElementById('bl' + (i + 18));
                var sq4 = document.getElementById('bl' + (i + 19));
                var sq5 = document.getElementById('bl' + (i + 20));
                break;
        }
        checkLines(sq1, sq2, sq3, sq4, sq5);
    }
}

function checkDiagonalBingo() {
    for (var i = 0; i < 2; i++) {
        switch(i) {
            case 0:
                var sq1 = document.getElementById('bl' + 0);
                var sq2 = document.getElementById('bl' + 6);
                var sq3 = document.getElementById('bl' + 12);
                var sq4 = document.getElementById('bl' + 18);
                var sq5 = document.getElementById('bl' + 24);
                break;
            case 1:
                var sq1 = document.getElementById('bl' + 4);
                var sq2 = document.getElementById('bl' + 8);
                var sq3 = document.getElementById('bl' + 12);
                var sq4 = document.getElementById('bl' + 16);
                var sq5 = document.getElementById('bl' + 20);
                break;
        }
        checkLines(sq1, sq2, sq3, sq4, sq5);
    }
}

function checkCornersBingo() {
    var sq1 = document.getElementById('bl' + 0);
    var sq2 = document.getElementById('bl' + 4);
    var sq3 = document.getElementById('bl' + 20);
    var sq4 = document.getElementById('bl' + 24);

    if (sq1.style.backgroundColor == "#9dda84" && calledNumbers.includes(parseInt(sq1.value)) &&
            sq2.style.backgroundColor == "#9dda84" && calledNumbers.includes(parseInt(sq2.value)) &&
            sq3.style.backgroundColor == "#9dda84" && calledNumbers.includes(parseInt(sq3.value)) &&
            sq4.style.backgroundColor == "#9dda84" && calledNumbers.includes(parseInt(sq4.value))) {
                youWinCorners(sq1, sq2, sq3, sq4);
                return;
    }
    else {
        document.getElementById("currentCall").innerHTML = "Not valid!";
        return;
    }
}

function checkFullBingo() {
    var j = 0;
    var flag = false;
    for (var i = 0; i < 5; i++) {
        var sq1 = document.getElementById('bl' + j);
        j++;
        var sq2 = document.getElementById('bl' + j);
        j++;
        var sq3 = document.getElementById('bl' + j);
        j++;
        var sq4 = document.getElementById('bl' + j);
        j++;
        var sq5 = document.getElementById('bl' + j);
        j++;

        if (sq1.style.backgroundColor == "#9dda84" && calledNumbers.includes(parseInt(sq1.value)) &&
            sq2.style.backgroundColor == "#9dda84" && calledNumbers.includes(parseInt(sq2.value)) &&
            sq3.style.backgroundColor == "#9dda84" && calledNumbers.includes(parseInt(sq3.value)) &&
            sq4.style.backgroundColor == "#9dda84" && calledNumbers.includes(parseInt(sq4.value)) &&
            sq5.style.backgroundColor == "#9dda84" && calledNumbers.includes(parseInt(sq5.value))) {
                flag = true;
        }
        else if (sq1.style.backgroundColor == "#9dda84" && calledNumbers.includes(parseInt(sq1.value)) &&
            sq2.style.backgroundColor == "#9dda84" && calledNumbers.includes(parseInt(sq2.value)) &&
            sq3.value == "FREE" &&
            sq4.style.backgroundColor == "#9dda84" && calledNumbers.includes(parseInt(sq4.value)) &&
            sq5.style.backgroundColor == "#9dda84" && calledNumbers.includes(parseInt(sq5.value))) {
                flag = true;
        }
        else {
            flag = false;
            break;
        }
    }
    if (flag == true) {
        youWinFullBingo();
    }
    else {
        document.getElementById("currentCall").innerHTML = "Not valid!";
        return;
    }
}

function checkLines(sq1, sq2, sq3, sq4, sq5) {
    if (sq1.style.backgroundColor == "#9dda84" && calledNumbers.includes(parseInt(sq1.value)) &&
        sq2.style.backgroundColor == "#9dda84" && calledNumbers.includes(parseInt(sq2.value)) &&
        sq3.value == "FREE" &&
        sq4.style.backgroundColor == "#9dda84" && calledNumbers.includes(parseInt(sq4.value)) &&
        sq5.style.backgroundColor == "#9dda84" && calledNumbers.includes(parseInt(sq5.value))) {
            youWin(sq1, sq2, sq3, sq4, sq5);
            return;
    }
    else if (sq1.style.backgroundColor == "#9dda84" && calledNumbers.includes(parseInt(sq1.value)) &&
            sq2.style.backgroundColor == "#9dda84" && calledNumbers.includes(parseInt(sq2.value)) &&
            sq3.style.backgroundColor == "#9dda84" && calledNumbers.includes(parseInt(sq3.value)) &&
            sq4.style.backgroundColor == "#9dda84" && calledNumbers.includes(parseInt(sq4.value)) &&
            sq5.style.backgroundColor == "#9dda84" && calledNumbers.includes(parseInt(sq5.value))) {
                youWin(sq1, sq2, sq3, sq4, sq5);
                return;
    }
    else {
        document.getElementById("currentCall").innerHTML = "Not valid!";
        return;
    }
}

function youWin(sq1, sq2, sq3, sq4, sq5) {
    sq1.style.backgroundColor = "yellow";
    sq2.style.backgroundColor = "yellow";
    sq3.style.backgroundColor = "yellow";
    sq4.style.backgroundColor = "yellow";
    sq5.style.backgroundColor = "yellow";
    document.getElementById("bCall").disabled = true;
    document.getElementById("bBingo").disabled = true;
    document.getElementById("currentCall").innerHTML = "BINGO!";
    alert("BINGO!");
}

function youWinCorners(sq1, sq2, sq3, sq4) {
    sq1.style.backgroundColor = "yellow";
    sq2.style.backgroundColor = "yellow";
    sq3.style.backgroundColor = "yellow";
    sq4.style.backgroundColor = "yellow";
    document.getElementById("bCall").disabled = true;
    document.getElementById("bBingo").disabled = true;
    document.getElementById("currentCall").innerHTML = "BINGO!";
    alert("BINGO!");
}

function youWinFullBingo() {
    document.getElementById("bCall").disabled = true;
    document.getElementById("bBingo").disabled = true;
    document.getElementById("currentCall").innerHTML = "BINGO!";
    alert("BINGO!");
}