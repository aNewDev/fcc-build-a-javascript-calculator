

// build out a calculator function

// create a varable to hold numbers and symbols to use


var operands = [];
var operator = '';
var printResultSmall = '';
var num1 = 0;
var num2 = 0;
var numSwitch = 1;

function clearCurrent(result) {
  operands = [];
  printResultSmall = '';
  document.getElementById("result").innerHTML = result;
  document.getElementById("resultsmall").innerHTML = '...';
  console.log(operands);
}

function clearAll() {
  clearCurrent(0);
  num1 = 0;
  num2 = 0;
  numSwitch = 1;
  operator = '';
}

function createNumberFromArray() {
  return Number(operands.join(''));
}

function equals() {

  // create num2 from operands
  num2 = createNumberFromArray();

  // clear the operands
  clearCurrent(num2);

  // run the operation (operands and operator)
  // operation(operator);

  // set the operands to num2
  operands.push(num2); // What happens if you hit a number next, and not a sign.  Guessing that you will create a bigger number.  Need to fix that bug.
  num2 = 0;
  console.log(num1, num2);

  // numSwitch = 1;
}



function buildOperands(num) {
  operands.push(num);
  printResultSmall += num;
  document.getElementById("resultsmall").innerHTML = printResultSmall;
  console.log(operands);
}

function operation(sign) {
  // Update the display with the operator
  printResultSmall += ' ' + sign + ' ';
  document.getElementById("resultsmall").innerHTML = printResultSmall;

  // Create a number out of the operands array
  if (numSwitch === 1) {
    num1 = Number(operands.join(''));
    operands = [];
    numSwitch = 2;
  } else if (numSwitch === 2) {
    num2 = Number(operands.join(''));
    operands = [];
    numSwitch = 1;
  }

  // set the operator to the operator
  operator = sign;

  // console the updates
  console.log('printResultSmall', printResultSmall, 'operator', operator, 'num1', num1, 'num2', num2, 'operands', operands);
}
