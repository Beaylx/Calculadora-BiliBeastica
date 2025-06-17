const display = document.getElementById("display");
const buttons = document.querySelector(".buttons");

let currentExpression = "";
let resultCalculated = false;

const somar = (a, b) => a + b;
const subtrair = (a, b) => a - b;
const multiplicar = (a, b) => a * b;
const dividir = (a, b) => (b === 0 ? "Erro" : a / b);

function updateDisplay() {
    display.textContent = currentExpression === "" ? "0" : currentExpression;
}

function handleNumberClick(number) {
    if (resultCalculated) {
        currentExpression = number;
        resultCalculated = false;
    } else {
        currentExpression += number;
    }
    updateDisplay();
}

function handleDecimalClick() {
    if (resultCalculated) {
        currentExpression = "0.";
        resultCalculated = false;
    } else if (!currentExpression.includes(".") || currentExpression.endsWith(" ")) {
        const lastPart = currentExpression.split(/[\+\-\*\/\(\)]/).pop();
        if (!lastPart.includes(".")) {
             currentExpression += ".";
        }
    }
    updateDisplay();
}

function handleOperatorClick(operatorSymbol) {
    resultCalculated = false;

    const lastChar = currentExpression.slice(-1);
    if (["+", "-", "*", "÷"].includes(lastChar)) {
        currentExpression = currentExpression.slice(0, -1) + operatorSymbol;
    } else {
        currentExpression += operatorSymbol;
    }
    updateDisplay();
}

function handleParenthesisClick(parenthesis) {
    if (resultCalculated) {
        currentExpression = parenthesis;
        resultCalculated = false;
    } else {
        currentExpression += parenthesis;
    }
    updateDisplay();
}

function handleEqualsClick() {
    try {
        let expressionToEvaluate = currentExpression
            .replace(/×/g, '*')
            .replace(/÷/g, '/');

        if (expressionToEvaluate.includes("/0")) {
            currentExpression = "Erro";
        } else {
            let result = eval(expressionToEvaluate);
            currentExpression = String(result);
        }
    } catch (e) {
        currentExpression = "Erro";
    } finally {
        resultCalculated = true;
        updateDisplay();
    }
}

function handleClearClick() {
    currentExpression = "";
    resultCalculated = false;
    updateDisplay();
}

function handleBackspaceClick() {
    if (resultCalculated) {
        currentExpression = "";
        resultCalculated = false;
    } else {
        currentExpression = currentExpression.slice(0, -1);
    }
    updateDisplay();
}

buttons.addEventListener("click", (event) => {
    const target = event.target;
    if (!target.matches("button")) return;

    if (target.classList.contains("number")) {
        handleNumberClick(target.textContent);
    } else if (target.classList.contains("operator")) {
        const action = target.dataset.action;
        if (action === "divide") handleOperatorClick("÷");
        else if (action === "multiply") handleOperatorClick("×");
        else if (action === "subtract") handleOperatorClick("-");
        else if (action === "add") handleOperatorClick("+");
        else if (action === "open-parenthesis") handleParenthesisClick("(");
        else if (action === "close-parenthesis") handleParenthesisClick(")");
    } else if (target.classList.contains("equals")) {
        handleEqualsClick();
    } else if (target.classList.contains("clear")) {
        handleClearClick();
    } else if (target.classList.contains("backspace")) {
        handleBackspaceClick();
    } else if (target.dataset.action === "decimal") {
        handleDecimalClick();
    }
});

updateDisplay();