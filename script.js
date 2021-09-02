const display = document.querySelector('#display');
const clear = document.querySelector('#clear');
const num = document.querySelectorAll('.number');
const divide = document.querySelector('#division');
const addition = document.querySelector('#addition');
const subtract = document.querySelector('#subtraction');
const multiply = document.querySelector('#multiplication');
const equal =  document.querySelector('#equal');
const decimal = document.querySelector('#decimal');
const container = document.querySelector('#conatiner');
const delBut = document.querySelector('#backspace');

let total =  0;
let firstNum = 0;
let secondNum = 0;
let operatorState = "";
let equalState = false;
let currentState = "first number";
 


clear.addEventListener('click', clearNum);
addition.addEventListener('click', addNum);
subtract.addEventListener('click', subNum);
multiply.addEventListener('click', mulNum);
divide.addEventListener('click', divNum);
equal.addEventListener('click', equalNum);
decimal.addEventListener('click', deci);
delBut.addEventListener('click', del);

num.forEach(number => {
    number.addEventListener('click', applyNum);
})


// Numbers

function applyNum(e){
    
    if (display.textContent == "0"){
        display.textContent = "";
    }
   
    let digit = e.target.id.charAt(1);
    display.textContent += `${digit}`;
}

function deci() {
    display.textContent += "."
}

// Clear
function clearNum(){
    display.textContent = 0;
    firstNum = 0;
    secondNum = 0;
    operatorState = "";
    currentState = "first number";
}

// Delete
function del() {
    if (display.textContent == 0) {
        return;
    }
    else if (display.textContent.length == 0){
        display.textContent = 0;
    }
    else {
        let str = display.textContent;
        display.textContent = str.substring(0, str.length - 1);
    }

}

// Addition
function addNum(){
    preOperate();
    operatorState = "add";
                  
}

// Subtraction
function subNum(){
    preOperate();
    operatorState = "subtract";
    
}

// Multiplication
function mulNum(){
    preOperate();
    operatorState = "multiply";
    
}

// Division
function divNum(){
    preOperate();
    operatorState = "divide";
    
}

//Equal
function equalNum(){
    if (equalState == true){
        secondNum = parseFloat(display.textContent);
        
    if (operatorState == "add"){
        total = firstNum + secondNum;

    }
    else if (operatorState == "subtract"){
        total = firstNum - secondNum;
       
    }
    else if (operatorState == "multiply"){
        total = firstNum * secondNum;
    }
    else if (operatorState == "divide"){
        total = firstNum / secondNum;   
    }
    display.textContent = total;
    console.log (firstNum);

    firstNum = parseFloat(display.textContent);
    notation();
    
    console.log (secondNum);
    console.log (total);
    equalState = false;
    currentState = 'first number';
    }
}


// necessary functions
function preOperate () {
    if (currentState == "first number"){
        firstNum = parseFloat(display.textContent);
        currentState = "next number"        
    }
    else {
        secondNum = parseFloat(display.textContent);
        if (operatorState == "add"){
            total = firstNum + secondNum;
    
        }
        else if (operatorState == "subtract"){
            total = firstNum - secondNum;
           
        }
        else if (operatorState == "multiply"){
            total = firstNum * secondNum;
        }
        else if (operatorState == "divide"){
            total = firstNum / secondNum;   
        }
        firstNum = total;
    }
    /// above code makes operators progressive    
    
    display.textContent = 0;
    equalState = true; // makes equal button non progressive
    console.log (firstNum);
    console.log (secondNum);
    console.log (`= ${total}`);
}

function notation () {
    if (display.textContent.length > 11) {
        display.textContent = parseFloat(display.textContent).toExponential(4);
    }
}