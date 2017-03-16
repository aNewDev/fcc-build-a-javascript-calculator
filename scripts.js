
var operands = [];
var operator = '';
var printResultSmall = '';
var num1 = 0;
var equalThenOperator = false;
var equalThenNumber = false;

// clear function for the CE button
function clearCurrent(result, from) {
  // reset the operands
  operands = [];
  // reset the details line
  printResultSmall = num1 + ' ' + operator;
  document.getElementById("resultsmall").innerHTML = '...';
}

// clear All function for the AC button
function clearAll() {
  // reset the operands
  operands = [];
  // clear the result
  document.getElementById("result").innerHTML = 0;
  // clear the details line
  printResultSmall = '';
  document.getElementById("resultsmall").innerHTML = '...';
  // clear the first operand
  num1 = 0;
  // clear the operator
  operator = '';
  // clear the equals handlers
  equalThenOperator = false;
  equalThenNumber = false;
}

// build the operand array
function buildOperands(num) {
  // handle the numbers if the last function was equals
  if (equalThenNumber === true) {
    operands = [];
    document.getElementById("result").innerHTML = 0;
    printResultSmall = '';
  }
  // clear the equals handler
  equalThenNumber = false
  // if the operands are too long return a message
  if (operands.length >= 12) {
    clearAll();
    document.getElementById("result").innerHTML = 'MAX DIGITS';
  } else { // or display the number in the details line
    operands.push(num);
    printResultSmall += num;
    document.getElementById("resultsmall").innerHTML = printResultSmall;
  }
}

// build a number from the operands array
function createNumberFromArray() {
  return Number(operands.join(''));
}

// complete the operation or equals function
function completeOperation(num1) {
  // clear the operand array
  operands = [];
  // determine the length of the operand and return a message if too long
  length = (num1 + '').replace('.', '').length;
  if (length >= 12) {
    clearAll();
    document.getElementById("result").innerHTML = 'MAX DIGITS';
  } else {
    document.getElementById("result").innerHTML = num1;
  }
}

// Do an operation
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
  // reset the equals flag
  if (equalThenNumber === true) {
    equalThenNumber = false;
  }
  // calculate the operation
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

// Do the equals operation
function equals() {
  // Update the display with equal sign
  printResultSmall += ' = ';
  document.getElementById("resultsmall").innerHTML = printResultSmall;
  // create the second operand
  var equalsNum = createNumberFromArray();
  // calculate the equal operation
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
  // update the details line
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
