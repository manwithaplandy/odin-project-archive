// Initialize variables
let firstOperand = '';
let secondOperand = '';
let operator = null;
let screenContent = document.getElementById('screen');
let equalButton = document.getElementById('equals');
let clearButton = document.getElementById('clear');
let dotButton = document.getElementById('dot');

// Set up click listeners for all number buttons
let buttons = Array.from(document.getElementsByClassName('number'));
buttons.forEach(button => {
    button.addEventListener('click', () => setOperand(button.textContent));
});

// User clicks button, adds numbers to first operand until operator is selected
//   if (operator) is switch to decide whether first or second
// Operator is selected
// Additional numbers are added to second operand
// Either = or another operator is clicked, causing the operation to be evaluated and the results returned
//      If =, results are returned to screen
//      If another operator, results are returned to first operand and displayed
// Convert operands to numbers from strings, calculate using operator using series of if statements

function setOperand(num) {
    if (!operator) {
        // Add digit to firstOperand
        if (firstOperand === null) { // Was getting errors with += on null, this should resolve it
            firstOperand = num;
        } else {
            firstOperand += num;
        }
    } else {
        // Add digit to secondOperand
        if (secondOperand === null) {
            secondOperand = num;
        } else {
            secondOperand += num;
        }
    }
    refreshScreen();
}

// Set the operator as a string
function setOperator(str) {
    // if second operand exists, run calculation before changing operator
    if (secondOperand) {
        calculate(firstOperand, operator, secondOperand);
        secondOperand = null;
    }
    operator = str;
    refreshScreen();
}

// Add event listeners to set operator to respective operator
let operatorButtons = Array.from(document.getElementsByClassName('operator'));
operatorButtons.forEach(operatorButton => {
    operatorButton.addEventListener('click', () => setOperator(operatorButton.textContent));
})

// Add event listener for equal button
equalButton.addEventListener('click', () => {
    calculate(firstOperand, operator, secondOperand);
    operator = null;
    secondOperand = null;
    refreshScreen();
});

// Add event listener for clear button
clearButton.addEventListener('click', () => clear());

// Refresh screen with updated values, to be called at the end of every button press
function refreshScreen() {
    // Only display truthy elements
    if (!operator && !firstOperand && !secondOperand) {
        screenContent.textContent = '';
    } else if (operator && secondOperand) {
        screenContent.textContent = `${firstOperand} ${operator} ${secondOperand}`; 
    } else if (operator && !secondOperand) {
        screenContent.textContent = `${firstOperand} ${operator}`;
    } else if (!operator && !secondOperand) {
        screenContent.textContent = `${firstOperand}`;
    }
    if (firstOperand == 'Infinity') {
        screenContent.textContent = 'Err';
    }
}

// Calculate results -
//    Return results to firstOperand
function calculate(firstOp, operator, secondOp) {
    firstOp = parseFloat(firstOperand);
    secondOp = parseFloat(secondOperand);
    // If statements to determine operator
    if (operator === '+'){
        firstOperand = Math.round((firstOp + secondOp) * 10000) / 10000;
    } else if (operator === '-') {
        firstOperand = Math.round((firstOp - secondOp) * 10000) / 10000;
    } else if (operator === '*') {
        firstOperand = Math.round((firstOp * secondOp) * 10000) / 10000;
    } else if (operator = '/') {
        firstOperand = Math.round((firstOp / secondOp) * 10000) / 10000;
    } else {
        console.error('How the shit did you manage to get this error?');
    }
}

// Clear - set operators and operand to null, refresh the screen
function clear() {
    firstOperand = null;
    secondOperand = null;
    operator = null;
    refreshScreen();
}

// Add functionality for number keys
document.addEventListener('keydown', (key) => {
    if (key.key === '1') {
        setOperand('1');
    } else if (key.key === '2') {
        setOperand('2');
    } else if (key.key === '3') {
        setOperand('3');
    } else if (key.key === '4') {
        setOperand('4');
    } else if (key.key === '5') {
        setOperand('5');
    } else if (key.key === '6') {
        setOperand('6');
    } else if (key.key === '7') {
        setOperand('7');
    } else if (key.key === '8') {
        setOperand('8');
    } else if (key.key === '9') {
        setOperand('9');
    } else if (key.key === '0') {
        setOperand('0');
    } else if (key.key === '+') {
        setOperator('+');
    } else if (key.key === '-') {
        setOperator('-');
    } else if (key.key === '*') {
        setOperator('*');
    } else if (key.key === '/') {
        setOperator('/');
    } else if (key.key === 'Enter') {
        calculate(firstOperand, operator, secondOperand);
        operator = null;
        secondOperand = null;
        refreshScreen();
    } else if (key.key === 'Delete') {
        clear();
    } else if (key.key === '.') {
        if (firstOperand && !secondOperand) {
            firstOperand = addDecimal(firstOperand);
            refreshScreen();
        } else if (firstOperand && secondOperand) {
            secondOperand = addDecimal(secondOperand);
            refreshScreen();
        }
    }
})

// Add functionality for decimal
//    Can only be one decimal per operand
//    Use if statements to determine if number is Integer (no decimal) and only add decimal if int
dotButton.addEventListener('click', () => {
    if (firstOperand && !secondOperand) {
        firstOperand = addDecimal(firstOperand);
        refreshScreen();
    } else if (firstOperand && secondOperand) {
        secondOperand = addDecimal(secondOperand);
        refreshScreen();
    }
});

function addDecimal(operand) {
    if (Number.isInteger(parseFloat(operand))) { // Is an integer
        return operand + '.';
    } else {
        return operand;
    }
}