
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
  operands.push(num);
  printResultSmall += num;
  document.getElementById("resultsmall").innerHTML = printResultSmall;
}

function createNumberFromArray() {
  return Number(operands.join(''));
}

function doOperation(sign) {

  // Create a number out of the operands array
  var currentNum = createNumberFromArray();

  //
  if (equalThenOperator === true) {
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
    operands = [];
    document.getElementById("result").innerHTML = num1;
  } else if (operator === '+') {
    num1 += currentNum;
    operator = sign;
    operands = [];
    document.getElementById("result").innerHTML = num1;
  } else if (operator === '-') {
    num1 -= currentNum;
    operator = sign;
    operands = [];
    document.getElementById("result").innerHTML = num1;
  } else if (operator === '÷') {
    num1 /= currentNum;
    operator = sign;
    operands = [];
    document.getElementById("result").innerHTML = num1;
  }

  // console current status
  console.log('doOp - opds are ', operands, ', opr is ', operator, ', num1 - ', num1, ', ctNum is ', currentNum, ', equal - ', equalThenOperator, ', pntSmall', printResultSmall)
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
    operands = [];
    document.getElementById("result").innerHTML = num1;
  } else if (operator === '+') {
    num1 += equalsNum;
    operator = '=';
    operands = [];
    document.getElementById("result").innerHTML = num1;
  } else if (operator === '-') {
    num1 -= equalsNum;
    operator = '=';
    operands = [];
    document.getElementById("result").innerHTML = num1;
  } else if (operator === '÷') {
    num1 /= equalsNum;
    operator = '=';
    operands = [];
    document.getElementById("result").innerHTML = num1;
  }

  printResultSmall += num1;
  document.getElementById("resultsmall").innerHTML = printResultSmall;

  // set the operands to num2
  operands.push(num1); // What happens if you hit a number next, and not a sign.  Guessing that you will create a bigger number.  Need to fix that bug.

  // clear num1 after pushing it to operands
  num1 = 0;

  // to help correct display if next button pushed in an operator
  equalThenOperator = true;

  // to help correct display if next button pushed is number
  equalThenNumber = true;

  // console current status
  console.log('equals - opds are ', operands, ', opr is ', operator, ', num1 - ', num1, ', eqNum is ', equalsNum, ', equal - ', equalThenOperator, ', pntSmall', printResultSmall)

}
