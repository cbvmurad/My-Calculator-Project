const calculatorInput = document.querySelector('.calculator-input');
const keys = document.querySelector('.calculator-keys');

let displayValue = '0';
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

function updateDisplay() {
    calculatorInput.value = displayValue;
}

keys.addEventListener('click', function(e) {
    const element = e.target;
    const value = element.value;

    if (!element.matches('button')) return;

    switch(value) {
        case '+':
        case '-':
        case '*':
        case '/':
            handleOperator(value);
            break;
        case '=':
            handleEqual();
            break;
        case 'clear':
            clear();
            break;
        case 'sin':
        case 'cos':
        case 'tan':
        case 'log':
        case 'square_root':
        case 'square':
            handleMathFunction(value);
            break;
        case '.':
            inputDecimal();
            break;
        default:
            inputNumber(value);
    }

    updateDisplay();
});

function handleOperator(nextOperator) {
    const value = parseFloat(displayValue);

    if (operator && waitingForSecondValue) {
        operator = nextOperator;
        return;
    }

    if (firstValue === null) {
        firstValue = value;
    } else if (operator) {
        const result = calculate(firstValue, value, operator);
        displayValue = `${parseFloat(result.toFixed(7))}`;
        firstValue = result;
    }

    waitingForSecondValue = true;
    operator = nextOperator;
}

function calculate(first, second, operator) {
    if (operator === '+') return first + second;
    if (operator === '-') return first - second;
    if (operator === '*') return first * second;
    if (operator === '/') return first / second;
    return second;
}

function handleEqual() {
    if (firstValue === null || operator === null) return;
    
    const secondValue = parseFloat(displayValue);
    const result = calculate(firstValue, secondValue, operator);
    displayValue = `${parseFloat(result.toFixed(7))}`;
    firstValue = result;
    waitingForSecondValue = false;
    operator = null;
}

function inputNumber(num) {
    if (waitingForSecondValue) {
        displayValue = num;
        waitingForSecondValue = false;
    } else {
        displayValue = displayValue === '0' ? num : displayValue + num;
    }
}

function inputDecimal() {
    if (!displayValue.includes('.')) {
        displayValue += '.';
    }
}

function clear() {
    displayValue = '0';
    firstValue = null;
    operator = null;
    waitingForSecondValue = false;
}

function handleMathFunction(func) {
    const value = parseFloat(displayValue);
    let result;

    switch(func) {
        case 'sin':
            result = Math.sin(value);
            break;
        case 'cos':
            result = Math.cos(value);
            break;
        case 'tan':
            result = Math.tan(value);
            break;
        case 'log':
            result = Math.log10(value);
            break;
        case 'square_root':
            result = Math.sqrt(value);
            break;
        case 'square':
            result = value * value;
            break;
    }

    displayValue = `${parseFloat(result.toFixed(7))}`;
    firstValue = result;
}

updateDisplay();