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
const totalDisplay = document.querySelector('#total');

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

document.addEventListener('keypress', applyKey); //keyboard input
document.addEventListener('keydown', applyKeyDel); 
num.forEach(number => {
    number.addEventListener('click', applyNum);
    
})


// Numbers and Keys

function applyNum(e){
    
    if (display.textContent == "0"){
        display.textContent = "";
    }
   
    let digit = e.target.id.charAt(1);
    display.textContent += `${digit}`;
}

function applyKey(e){
    
    if (display.textContent == "0"){
        display.textContent = "";
    }
    
    if (e.keyCode > 47 && e.keyCode < 58){
        display.textContent += `${String.fromCharCode(e.keyCode)}`;
    }
    else if (e.keyCode == 13 ){
        equalNum();
    }
    else if (e.keyCode == 92 ){
        divNum();
    }
    else if (e.keyCode == 43 ){
        addNum();
    }
    else if (e.keyCode == 45 ){
        subNum();
    }
    else if (e.keyCode == 42 ){
        mulNum();
    }
    else if (e.keyCode == 46 ){
        deci();
    }
}


function deci() {
    if (display.textContent.indexOf(`.`) == -1){
        display.textContent += "." 
    }  
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

function applyKeyDel(e){
    if (display.textContent == "0"){
        display.textContent = "";
    }

    if (e.keyCode == 8) {
        del();
    }
}

// Addition
function addNum(){
    if (display.textContent == "0"){
        operatorState = "add";
        return;
    }

    preOperate();
    operatorState = "add";
                  
}

// Subtraction
function subNum(){
    if (display.textContent == "0"){
        display.textContent = "-";
        return;
    }
    else if (display.textContent == "-"){
        return;
    }
    preOperate();
    operatorState = "subtract";
    
}

// Multiplication
function mulNum(){
    if (display.textContent == "0"){
        operatorState = "multiply";
        return;
    }

    preOperate();
    operatorState = "multiply";
    
}

// Division
function divNum(){
    if (display.textContent == "0"){
        operatorState = "divide";
        return;
    }

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
    totalDisplay.textContent = `=${total}`;
    firstNum = parseFloat(display.textContent);
    notation();
    equalState = false;
    currentState = 'first number';
    
    }
}


// necessary functions
function preOperate () {
    console.log (currentState);
    if (currentState == "first number"){
        firstNum = parseFloat(display.textContent);
        currentState = "next number";
                
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
    
    totalDisplay.textContent = `=${total}`;
    display.textContent = 0;
    equalState = true; // makes equal button non progressive
    console.log (currentState);
    console.log (firstNum);
    console.log (secondNum);
    console.log (`= ${total}`);
}

function notation () {
    if (display.textContent.length > 11) {
        display.textContent = parseFloat(display.textContent).toExponential(4);
    }
    else if (display.textContent == Infinity || display.textContent == "NaN") {
        display.textContent = "Ouch";
        totalDisplay.textContent = "=(";
    }

    if (totalDisplay.textContent.length > 11) {
        totalDisplay.textContent = parseFloat(display.textContent).toExponential(4);
    }
}

