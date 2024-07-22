/*Get input using a textbox. Operator can be +,-,*,/. 
Input Format : operand1 operator operand2
*/
const button = document.querySelector('button')
button.addEventListener('click',cals)
let resultdiv = document.createElement('div')
resultdiv.id = 'result'
document.getElementById('wrapper').appendChild(resultdiv)

function cals(){
    const inputValue =(document.getElementById('input').value)
    const operand = inputValue.split(/[+\-\*\/]/)
    const operator = inputValue.match(/[+\-\*\/]/)
    let value, operand1 = Number(operand[0]), operand2 = Number(operand[1])
    switch(operator[0]){
        case '+':
           value = operand1 + operand2
           break;
        case '-':
            value = operand1 - operand2
            break;
        case '*':
            value = operand1 * operand2
            break;
        case '/':
            value = operand1 / operand2
            break;
        default :
            value = "Invalid Operator"
    }
    resultdiv.innerHTML = value
    console.log(value)
    console.log(inputValue)
    console.log(operand)
    console.log(operator)
}