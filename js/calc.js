let myOperator = document.getElementById('operator');
let myInput = document.getElementById('result');
let numbers = [];
let opArray = [];
let result = [];

function onClickCancel() {
    myOperator.value = '';
    document.getElementById('result').value = '';
    document.getElementById('result').placeholder = "0";
    numbers.length = 0;
    opArray.length = 0;
    result.length = 0;
    myInput.style = "font-size: 42px;";
}


function onClickNumber(clickedNumber) {
    if (myInput.value.indexOf('.') !== -1 && clickedNumber === "." ||
        myInput.value === '0' && clickedNumber === "0" ||
        myInput.value === '0' && clickedNumber !== '.' ||
        myInput.value.length > 15)
        return;

    if (myInput.value === '' && clickedNumber === '.') {
        myInput.value = '0';
    }
    if (myInput.value === '-') {
        myInput.value = '-';
    }
    if (myInput.placeholder !== '') {
        myInput.placeholder = '';
    }
    myInput.value += clickedNumber;
    checkInputValue();
}

function onClickOperator(op) {
    myOperator.value = op;
    if (op === '-' && myInput.value === '' && result.length === 0 && numbers.length === 0) {
        myInput.value = '-';
        myOperator.value = '';
        return;
    }
    if (op !== '-' && myInput.value === '' && result.length === 0 && numbers.length === 0) {
        myOperator.value = '';
        return;
    }
    if (myInput.value === '' && numbers.length === 0) {
        myOperator.value = op;
    }
    if (op !== '' && result.length === 0 && myInput.value !== '') {
        opArray.push(op);
        result.push(myInput.value);
        document.getElementById('result').placeholder = myInput.value;
        myInput.value = '';
    }

    if (myInput.value !== '' && numbers.length === 1 && result.length === 1) {
        numbers.pop();
        numbers.push(myInput.value);
        calculate();
        opArray.pop();
        opArray.push(op);
        myInput.value = '';
    }

    if (myInput.value === '' && result.length === 1 || myInput.value === '') {
        opArray.pop();
        opArray.push(op);
    }

    else {
        numbers.push(myInput.value);
        calculate();
        opArray.pop();
        opArray.push(op);
        myInput.value = '';
    }
}


function calculate() {
    const prev = parseFloat(result[0]);
    const current = parseFloat(numbers[0]);
    let calculation = '';
    op1 = opArray[0];
    if (current === 0 && op1 === '/') {
        myInput.value = '';
        myOperator.value = '';
        myInput.style = "font-size: 25px";
        numbers.pop()
        opArray.pop()
        result.pop()
        document.getElementById('result').placeholder = "Can't divide by 0"
        return;
    }
    switch (op1) {
        case '+': calculation = (prev + current); break;
        case '-': calculation = (prev - current); break;
        case 'x': calculation = (prev * current); break;
        case '/': calculation = (prev / current); break;
        default: return;
    }
    if (Number.isNaN(calculation)) {
        myInput.value = '';
        myOperator.value = '';
        document.getElementById('result').placeholder = 'Not possible';
        return;
    }

    document.getElementById('result').placeholder = calculation;
    myInput.value = '';
    result.length = 0;
    result.push(parseFloat(calculation));
}

function onClickEquals() {
    if (myInput.value === '' && opArray.length !== 0 && numbers.length !== 0 && result.length !== 0) {
        calculate();
        return;
    }
    if (myInput.Value !== '') {
        numbers.pop();
        numbers.push(myInput.value);
    }
    if (myOperator.value === '') {
        numbers.pop();
        return;
    }
    if (numbers.length === 1 && opArray.length !== 0 && myInput.value !== '') {
        calculate();
    }
    checkInputValue();
}


function checkInputValue() {
    if (myInput.value.length < 10 || myInput.placeholder.length < 10) {
        myInput.style = "font-size: 42px; ";
    }
    if (myInput.value.length > 9 || myInput.placeholder.length > 9) {
        myInput.style = "font-size: 35px; ";
    }
    if (myInput.value.length > 13 || myInput.placeholder.length > 13) {
        myInput.style = "font-size: 33px; "
    }
    if (myInput.value.length > 18 || myInput.placeholder.length > 18) {
        myInput.style = "font-size: 25px; "
    }
    if (myInput.placeholder.length > 20) {
        myInput.style = "font-size: 22px; "
    }
}