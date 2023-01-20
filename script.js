//get number buttons
const numButtons = [...document.querySelectorAll(".num")];
//get lower screen
let lowerScreen = document.getElementById("downScreen");
//get operand buttons
const operandButtons = [...document.querySelectorAll(".operate")];
//get upper screen
let upperScreen = document.getElementById("upScreen");

//global operation values
let operand = "";
let a = null;
let b = null;

function addNumDisplay(NumList) { //Adds display of number to screen
    NumList.forEach(element => {
        element.addEventListener('click', () => {
            if(lowerScreen.textContent.length >= 16) return;
            lowerScreen.textContent += element.textContent;
        });
    });
}

function addOperandDisplay(operateList) { //Adds display of operation symbols to screen
    operateList.forEach(element => {
        element.addEventListener('click', () => {
            if(a == null) {
                a = lowerScreen.textContent;
                operand = element.textContent;
                upperScreen.textContent += a;
            }

            upperScreen.textContent += element.textContent;
        })
    })
}

function add(a, b) {
    return parseFloat((a+b).toFixed(1));
}

function subtract(a, b) {
    return parseFloat((a-b).toFixed(1));
}

function multiply(a, b) {
    return parseFloat((a*b).toFixed(1));
}

function divide(a, b) {
    return parseFloat((a/b).toFixed(1));
}

function operate(operand, a, b) {
    switch (operand) {
        case "+":
            return add(a, b);

        case "-":
            return subtract(a, b);

        case "*":
            return multiply(a, b);

        case "/":
            return divide(a, b);
    }
}

//Driver functions
addNumDisplay(numButtons);