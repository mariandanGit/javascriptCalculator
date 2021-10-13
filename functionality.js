const container = document.getElementById('container');
const digits = document.querySelectorAll('digits');
const previousOperation = document.getElementById('previousOperation');
const currentOperation = document.getElementById('currentOperation');

let shouldClearScreen = false;
let firstOperand = '';
let secondOperand = '';
let currentOperator = null;

const symbolsArray = [
    'AC', 'C', '%', '÷',
    '7', '8', '9' ,'×',
    '4', '5', '6', '-',
    '1', '2', '3' ,'+',
    '+/-', '0', '.', '='
];
const idArray = [
    'allClear','clear', 'mod', 'divide',
    'digit-7','digit-8','digit-9', 'multiply',
    'digit-4','digit-5','digit-6','subtract',
    'digit-1','digit-2','digit-3', 'add',
    'negative','digit-0', 'dot', 'equals'
]

const operationsArray = ['mod', 'divide','multiply','subtract','add'];

function createElements(col, row){

    container.style.gridTemplateColumns = `repeat(${col},1fr)`;
    container.style.gridTemplateRows = `repeat(${row},1fr)`;

    let gridArea = col * row;

    for(let i = 0; i < gridArea; i++){

        var button = document.createElement('button');

        button.classList.add('buttons');
        button.setAttribute('id', idArray[i]);
        button.textContent = symbolsArray[i];
        button.style.margin = '10px';

        if(button.getAttribute('id').includes('digit')){

            button.classList.add('digits');

            button.addEventListener('click', function(){
                appendDigit(this.textContent);
            });
        }

        if(button.getAttribute('id').includes('clear')){
            
            button.addEventListener('click', function(){
                clear();
            });
        }

        if(button.getAttribute('id').includes('allClear')){
            
            button.addEventListener('click', function(){
                clearAll();
            });
        }

        if(button.getAttribute('id').includes('equals')){
            
            button.addEventListener('click', function(){
                evaluate();
            });
        }

        if(button.getAttribute('id') == 'dot'){
            
            button.addEventListener('click', function(){
                appendPoint();
            });
        }

        if(button.getAttribute('id') == 'negative'){
            
            button.addEventListener('click', function(){
                appendNegative();
            });
        }

        if(operationsArray.includes(button.getAttribute('id'))){

            button.classList.add('operations');
            
            button.addEventListener('click', function(){
                appendOperator(this.textContent);
            });
        }

        container.appendChild(button);
    }
}

function clear(){

    currentOperation.textContent = currentOperation.textContent.toString().slice(0, -1);
}

function clearAll(){
    previousOperation.textContent = '';
    currentOperation.textContent = '0';
    firstOperand = '';
    secondOperand = '';
    currentOperator = null;
}

function clearScreen(){

    currentOperation.textContent = '';
    shouldClearScreen = false;
}

function checkOverflow(el){
    
   var currentOverflow = el.style.overflow;

    if(!currentOverflow || currentOverflow === "visible"){
       el.style.overflow = "hidden";
    }

   var isOverflowing = el.clientWidth < el.scrollWidth || el.clientHeight < el.scrollHeight;

   el.style.overflow = currentOverflow;

   return isOverflowing;
}

function appendDigit(digit){

    if(currentOperation.textContent === '0' || shouldClearScreen){
        clearScreen();
    }

    let previousTextContent = currentOperation.textContent;

    if (checkOverflow(currentOperation)) {
        currentOperation.textContent = 'LIMIT EXCEEDED';
        setTimeout(function(){
            currentOperation.textContent = previousTextContent;
        }, 700);
    }
    else
        currentOperation.textContent += digit;
}

function appendPoint(){
    
    if(currentOperation.textContent === ''){
        currentOperation.textContent = '0';
    }
    if (currentOperation.textContent.includes('.')) {
        return;
    }
    currentOperation.textContent += '.';
}

function appendOperator(operator){

    if(currentOperator !== null){
        evaluate();
    }
    firstOperand = currentOperation.textContent;
    currentOperator = operator;
    previousOperation.textContent = `${firstOperand} ${currentOperator}`;
    shouldClearScreen = true;
}

function appendNegative(){

    if(currentOperation.textContent === '0'){
        return;
    }
    if(currentOperation.textContent.includes('-')){
        currentOperation.textContent = currentOperation.textContent.substring(1);
    }
    else{
        currentOperation.textContent = '-' + currentOperation.textContent;
    }
}

function evaluate(){

    if(currentOperator === null || shouldClearScreen){
        return;
    }
    if(currentOperator === '÷' && currentOperation.textContent === '0'){
        
        currentOperation.textContent = 'LMAO';
        return;
    }
    secondOperand = currentOperation.textContent;
    
    let result = roundResult(operate(firstOperand, currentOperator, secondOperand));

    if(result > 10e9){
        currentOperation.textContent = result.toExponential(2);
    }
    else{
        currentOperation.textContent = result;
    }

    previousOperation.textContent = `${firstOperand} ${currentOperator} ${secondOperand} =`
    currentOperator = null;
}

function roundResult(number) {

    return Math.round(number * 1000) / 1000;
}

function add(a, b) {
    return a + b;
}
  
function subtract(a, b) {
    return a - b;
}
  
function multiply(a, b) {
    return a * b;
}
  
function divide(a, b) {
    return a / b;
}
function mod(a, b){
    return a % b;
}

function operate(a, operator, b) {
    
    a = Number(a)
    b = Number(b)
    
    switch (operator) {

      case '+':
        return add(a, b);

      case '-':
        return subtract(a, b);

      case '×':
        return multiply(a, b);

      case '%':
          return mod(a, b);  

      case '÷':
        if (b === 0)
            return null
        else 
            return divide(a, b);

      default:
        return null
    }
}

window.onload = function(){
    createElements(4, 5);
}
