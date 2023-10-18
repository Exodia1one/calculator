// main functions for window clicks on buttons
const button = document.querySelectorAll('.button');
const display = document.querySelector('.display');
const calculation = document.querySelector('.chain');
const division = document.querySelector('#divide')
let displayObj = {
    num1: '',
    operator: '',
    num2: '',
}
function add(num1, num2) {
    ans = num1 + num2;
    return '' + ans;
}
function subtract(num1, num2) {
    ans = num1 - num2;
    return '' + ans;
}
function multiply(num1, num2) {
    ans = num1 * num2;
    return '' + ans;
}
function divide(num1, num2) {
    ans = num1 / num2;
    let newthing = ans.toString();
    if(newthing.includes(".")){
        let what = newthing.split("");
        let sum = 0;
        let i = what.length-1;
        while (what[i] != ".") {
            sum += 1;
            i--;
        }
        if(sum > 11){
            ans = +ans;
            ans = ans.toFixed(12);
        }
    }
    return '' + ans;
}
function modulo(num1, num2) {
    ans = num1 % num2;
    return '' + ans;
}
function operate(num1, operator, num2) {
    let value1 = +num1;
    let value2 = +num2;
    if (operator == '+') {
        displayObj.num1 = add(value1, value2);
    } else if (operator == '-') {
        displayObj.num1 = subtract(value1, value2);
    } else if (operator == division.textContent) {
        displayObj.num1 = divide(value1, value2);
    } else if (operator == 'x') {
        displayObj.num1 = multiply(value1, value2);
    } else if (operator == '%') {
        displayObj.num1 = modulo(value1, value2);
    }
    display.textContent = displayObj.num1;
    displayObj.operator = '';
    calculation.textContent += ' ' + displayObj.num2;
    displayObj.num2 = '';
}
function main() {
    window.addEventListener('click', event => {
        if(event.target.nodeName == 'LI' || event.target.className == 'del' || event.target.className == 'ac') {
            event.target.style.top = '0px';
            if(event.target.className.includes('operator') && displayObj.operator == '') {
                displayObj.operator = event.target.textContent;
                calculation.textContent = displayObj.num1 + ' ' + displayObj.operator;
            } else if (event.target.className == 'button digit' && displayObj.operator === '') {
                displayObj.num1 += event.target.textContent;
                display.textContent = displayObj.num1;
                
            } else if (event.target.className == 'button decimal' && !(displayObj.num1.includes('.')) && displayObj.operator === '') {
                displayObj.num1 += event.target.textContent;
                display.textContent = displayObj.num1;
            } else if (event.target.className == 'button decimal' && !(displayObj.num2.includes('.')) && displayObj.operator !== '') {
                displayObj.num2 += event.target.textContent;
                display.textContent = displayObj.num2;
            } else if (event.target.className == 'button digit' && displayObj.num1 !== '') {
                displayObj.num2 += event.target.textContent;
                display.textContent = displayObj.num2;
            } else if (event.target.className == 'ac' || event.target.className.includes('acc')) {
                displayObj.num1 = '';
                displayObj.num2 = '';
                displayObj.operator = '';
                display.textContent = '';
                calculation.textContent = '';
            } else if (event.target.className == 'del' || event.target.className.includes('dell')) {
                if (displayObj.operator == '') {
                    displayObj.num1 = displayObj.num1.slice(0, -1);
                    display.textContent = displayObj.num1;
                } else if (!(displayObj.operator == '') && !(displayObj.num2 == '')) {
                    displayObj.num2 = displayObj.num2.slice(0,-1);
                    display.textContent = displayObj.num2;
                }
            } else if (event.target.className.includes('operator') && displayObj.operator !== '') {
                operate(displayObj.num1, displayObj.operator, displayObj.num2);
                displayObj.operator = event.target.textContent;
                calculation.textContent += ' ' + displayObj.num2 + displayObj.operator;
            } else if (event.target.className == 'button equal') {
                operate(displayObj.num1, displayObj.operator, displayObj.num2);
                calculation.textContent += ' ' + displayObj.num2 + '=';
            }
            console.log(displayObj);
        }
    })
}
main();