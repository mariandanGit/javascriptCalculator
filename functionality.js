const container = document.getElementById('container');
const digits = document.querySelectorAll('digits');
const previousOperation = document.getElementById('previousOperation');
const currentOperation = document.getElementById('currentOperation');

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

const operationsArray = ['mod', 'divide','multiply','subtract','add', 'negative', 'dot', 'equals'];

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

        if(operationsArray.includes(button.getAttribute('id'))){

            button.classList.add('operations');

            button.addEventListener('click', function(){
                appendDigit(this.textContent);
            });
        }

        container.appendChild(button);
    }
}

function clear(){

    currentOperation.textContent = currentOperation.textContent.toString().slice(0, -1);
}

function clearAll(){

    currentOperation.textContent = '0';
}

function appendDigit(digit){

    if(currentOperation.textContent === '0'){
        clearScreen();
    }
    currentOperation.textContent += digit;
}

function clearScreen(){
    currentOperation.textContent = '';
}

console.log(digits);
window.onload = function(){
    createElements(4, 5);
}
