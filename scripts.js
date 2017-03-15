
var operands = [];
var operator = '';
var printResultSmall = '';
var num1 = 0;
var equalThenOperator = false;
var equalThenNumber = false;

function clearCurrent(result, from) {
  operands = [];
  printResultSmall = num1 + ' ' + operator;
  document.getElementById("resultsmall").innerHTML = printResultSmall;
}

function clearAll() {
  operands = [];
  document.getElementById("result").innerHTML = 0;
  printResultSmall = '';
  document.getElementById("resultsmall").innerHTML = '...';
  num1 = 0;
  operator = '';
}

function buildOperands(num) {
  if (equalThenNumber === true) {
    operands = [];
    document.getElementById("result").innerHTML = 0;
    printResultSmall = '';
  }
  equalThenNumber = false
  if (operands.length >= 12) {
    clearAll();
    document.getElementById("result").innerHTML = 'MAX DIGITS';
  } else {
    operands.push(num);
    printResultSmall += num;
    document.getElementById("resultsmall").innerHTML = printResultSmall;
  }
}

function createNumberFromArray() {
  return Number(operands.join(''));
}

function completeOperation(num1) {
  operands = [];
  length = (num1 + '').replace('.', '').length;
  if (length >= 12) {
    clearAll();
    document.getElementById("result").innerHTML = 'MAX DIGITS';
  } else {
    document.getElementById("result").innerHTML = num1;
  }
}

function doOperation(sign) {

  // Create a number out of the operands array
  var currentNum = createNumberFromArray();

  // Check to see if the last operation was "equals"
  if (equalThenOperator === true) {
    // Update the display with the "=" number, and add the operator
    operator = '';
    printResultSmall = currentNum + ' ' + sign + ' ';
    document.getElementById("resultsmall").innerHTML = printResultSmall;
    equalThenOperator = false;
  } else {
    // Update the display with the operator
    printResultSmall += ' ' + sign + ' ';
    document.getElementById("resultsmall").innerHTML = printResultSmall;
  }

  if (equalThenNumber === true) {
    equalThenNumber = false;
  }

  if (operator === '') {
    num1 += currentNum;
    operator = sign;
    operands = [];
  } else if (operator === 'x') {
    num1 = Math.round((num1 * currentNum) * 100)/100;
    operator = sign;
    completeOperation(num1);
  } else if (operator === '+') {
    num1 += currentNum;
    operator = sign;
    completeOperation(num1);
  } else if (operator === '-') {
    num1 -= currentNum;
    operator = sign;
    completeOperation(num1);
  } else if (operator === '÷') {
    num1 /= currentNum;
    operator = sign;
    completeOperation(num1);
  }

}

function equals() {
  // Update the display with equal sign
  printResultSmall += ' = ';
  document.getElementById("resultsmall").innerHTML = printResultSmall;

  // create num2 from operands
  var equalsNum = createNumberFromArray();

  if (operator === 'x') {
    num1 = Math.round((num1 * equalsNum) * 100)/100;
    operator = '=';
    completeOperation(num1);
  } else if (operator === '+') {
    num1 += equalsNum;
    operator = '=';
    completeOperation(num1);
  } else if (operator === '-') {
    num1 -= equalsNum;
    operator = '=';
    completeOperation(num1);
  } else if (operator === '÷') {
    num1 /= equalsNum;
    operator = '=';
    completeOperation(num1);
  }

  printResultSmall += num1;
  document.getElementById("resultsmall").innerHTML = printResultSmall;

  // start the next number using the result if an operator is pressed next
  operands.push(num1);

  // clear num1 after pushing it to operands
  num1 = 0;

  // to help correct display if next button pushed in an operator
  equalThenOperator = true;

  // to help correct display if next button pushed is number
  equalThenNumber = true;

}
