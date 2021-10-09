const container = document.getElementById('container');
const buttons = document.getElementsByClassName('button');

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

function createElements(col, row){

    container.style.gridTemplateColumns = `repeat(${col},1fr)`;
    container.style.gridTemplateRows = `repeat(${row},1fr)`;

    let gridArea = col * row;

    for(let i = 0; i < gridArea; i++){

        let button = document.createElement('button');
        button.className = 'button';
        button.setAttribute('id', idArray[i]);
        button.textContent = symbolsArray[i];
        button.style.margin = '10px';
        container.appendChild(button);
    }
}

createElements(4, 5);