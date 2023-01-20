//get number buttons
const numButtons = [...document.querySelectorAll(".num")];
//get lower screen
let lowerScreen = document.getElementById("downScreen");

function addNumFunc(NumList) {
    NumList.forEach(element => {
        element.addEventListener('click', () => {
            lowerScreen.textContent = element.id;
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

//Driver functions
addNumFunc(numButtons);