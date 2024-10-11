let trailingResult = 0;
let operationOptions = ['divide', 'multiply', 'subtract', 'add'];
let workingOperation = "";
let currentInput = "";

function updateDisplay(input) {
    let display = document.getElementById("display");
    let secondaryDisplay = document.getElementById("secondaryDisplay");

    if (operationOptions.includes(input)) {
        if (currentInput === "" && input === 'subtract') {
            // Allow negative numbers
            currentInput = "-";
            display.innerHTML = currentInput;
        } else {
            if (workingOperation !== "") {
                // If there's already an operation, update it
                if (currentInput !== "" && currentInput !== "-") {
                    trailingResult = calculate(trailingResult, currentInput, workingOperation);
                    secondaryDisplay.innerHTML = trailingResult;
                }
            } else if (currentInput !== "") {
                trailingResult = parseFloat(currentInput);
            }
            workingOperation = input;
            currentInput = "";
        }
    } else if (input === "equals") {
        if (workingOperation !== "" && currentInput !== "" && currentInput !== "-") {
            let result = calculate(trailingResult, currentInput, workingOperation);
            display.innerHTML = result;
            secondaryDisplay.innerHTML = result;
            trailingResult = result;
            currentInput = result.toString();
            workingOperation = "";
        }
    } else if (input === "decimal") {
        if (!currentInput.includes('.')) {
            currentInput = currentInput === "" ? "0." : currentInput + '.';
            display.innerHTML = currentInput;
        }
    } else {
        // Number input
        if (input === '0' && (currentInput === '0' || currentInput === '-0')) {
            // Prevent multiple leading zeros
            return;
        }
        if (currentInput === '0' || currentInput === '-0') {
            // Replace single leading zero with new input
            currentInput = currentInput.replace('0', input);
        } else {
            currentInput += input;
        }
        display.innerHTML = currentInput;
    }
}

function clearDisplay() {
    let display = document.getElementById("display");
    let secondaryDisplay = document.getElementById("secondaryDisplay");
    display.innerHTML = "0";
    secondaryDisplay.innerHTML = "0";
    trailingResult = 0;
    workingOperation = "";
    currentInput = "";
}

function calculate(firstNumber, secondNumber, operation) {
    let result;
    firstNumber = parseFloat(firstNumber);
    secondNumber = parseFloat(secondNumber);
    switch(operation) {
        case "add":
            result = firstNumber + secondNumber;
            break;
        case "subtract":
            result = firstNumber - secondNumber;
            break;
        case "multiply":
            result = firstNumber * secondNumber;
            break;
        case "divide":
            if (secondNumber === 0) {
                return "Error"; 
            }
            result = firstNumber / secondNumber;
            break;
        default:
            console.log("Calculate switch does not work");
            return;
    }
    return parseFloat(result.toFixed(8)); // Round to 8 decimal places to avoid floating point issues
}