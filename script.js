//get html elements
const numButtons = [...document.querySelectorAll(".num")];
let lowerScreen = document.getElementById("downScreen");
const operandButtons = [...document.querySelectorAll(".operate")];
let upperScreen = document.getElementById("upScreen");
const eqButton = document.getElementById("equals");
const eraseButton = document.getElementById("bkSpace");
const clearButton = document.getElementById("Clear");
const decimalButton = document.getElementById("point");
const percentButton = document.getElementById("percent");

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

function addOperandFunc(operateList) { //Adds display of operation symbols to screen
    operateList.forEach(element => {
        element.addEventListener('click', () => {
            //lower screen input without unicode characters to fix direction with point
            let lowerScreenIn = lowerScreen.textContent.replace(/[^\x00-\x7F]/g, "");

            if(a == null) { // there is no first element initially
                if(lowerScreen.textContent == "") return; // no inout in lower screen

                a = parseFloat(lowerScreenIn);
                operand = element.id;
                upperScreen.textContent = (a + " " + operand);
                lowerScreen.textContent = "";
                return;
            }

            if(lowerScreen.textContent == "") { //if user wants to change operand sign without providing a new number
                operand = element.id;
                upperScreen.textContent = (a + " " + operand);
                return;
            }

            b = parseFloat(lowerScreenIn);
            a = operate(operand, a, b);
            operand = element.id;
            upperScreen.textContent = (a + " " + operand);
            lowerScreen.textContent = "";
        });
    });
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

//Add additional event listeners
eqButton.addEventListener('click', () => {
    //No input or no second operand
    if(lowerScreen.textContent == "" || a == null) return;

    //perform calculation
    b = parseFloat(lowerScreen.textContent);
    a = operate(operand, a, b);

    //display answer
    lowerScreen.textContent = a;
    
    //reset values
    upperScreen.textContent = 0;
    a = null; b = null;
});

eraseButton.addEventListener('click', () => {
    if(lowerScreen.textContent == "") return;

    //remove last element in input
    lowerScreen.textContent = lowerScreen.textContent.slice(0,-1); 
});

clearButton.addEventListener('click', () => {
    upperScreen.textContent = 0;
    lowerScreen.textContent = "";
    a = null;
    b = null;
    operand = "";
});

decimalButton.addEventListener('click', () => {
    if(lowerScreen.textContent.includes(".")) return;

    //the added unicode escape characters need to removed during parsing to float.
    lowerScreen.textContent += '\u202A.\u202C';
});

percentButton.addEventListener('click', () => {
    if(lowerScreen.textContent == "") return;

    let lowerScreenIn = lowerScreen.textContent.replace(/[^\x00-\x7F]/g, "");
    lowerScreen.textContent = parseFloat(lowerScreenIn/100);
    
});

//Driver functions
addNumDisplay(numButtons);
addOperandFunc(operandButtons);