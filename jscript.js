let internalValue = NaN
let externalValue = '0'
let savedOperator = ''
let activeOperator = ''

const add = (x, y) => x + y
const subtract = (x, y) => x - y
const multiply = (x, y) => x * y
const divide = (x, y) => x / y

const operate = (operator,x, y) => {
  switch(operator) {
    case '+':
      return add(x, y)
    case '-':
      return subtract(x, y)
    case '*':
      return multiply(x, y)
    case '/':
      return divide(x, y)
    default:
      console.log('A horrid error has occurred')
  }
}

const display = () => {
  let display = document.querySelector('#display')
  if (externalValue !== '0') {
    console.log(parseInt(externalValue))
    display.textContent = Math.round(parseFloat(externalValue) * 10000) / 10000 
  } 
  else {
    display.textContent = '0'
  }
}

const init = () => {
  const operands = document.querySelectorAll('.operand')
  operands.forEach(operand => {
    operand.addEventListener('click', () => {
      if (activeOperator === '' && externalValue !== '0') {
        externalValue += operand.value
        display()
      }
      else if (activeOperator === '' && externalValue === '0') {
        externalValue = operand.value
        display()
      }
      else {
        externalValue = operand.value
        savedOperator = activeOperator
        activeOperator = ''
        display()
      }
  });
  })

  const zero = document.querySelector('#zero')
  zero.addEventListener('click', () => {
    if (activeOperator === '' && externalValue !== '0') {
      externalValue += zero.value
      display()
    }
    else if (activeOperator !== '') {
      externalValue = zero.value
      savedOperator = activeOperator
      activeOperator = ''
      display()
    }
    }
  );

  const clear = document.querySelector('.clear')
  clear.addEventListener('click', () => {
    externalValue = '0'
    activeOperator = ''
    internalValue = NaN
    savedOperator = ''
    display()
  });

  const operators = document.querySelectorAll('.operator')
  operators.forEach(operator => {
    operator.addEventListener('click', () => {
      if (Number.isNaN(internalValue)) {
        internalValue = parseFloat(externalValue)
        activeOperator = operator.value
        externalValue = '0'
      }
      else if (activeOperator === '') {
        internalValue = operate(savedOperator, internalValue, parseFloat(externalValue))
        externalValue = internalValue
        activeOperator = operator.value
        display()
      }
      else {
        activeOperator = operator.value
      }
    })
  });

  const equal = document.querySelector('#equal')
  equal.addEventListener('click', () => {
    if (Number.isNaN(internalValue)) {
      savedOperator = ''
      activeOperator = ''
      externalValue = '0'
    }
    else {
      internalValue = operate(savedOperator, internalValue, parseFloat(externalValue))
      externalValue = internalValue
      activeOperator = ''
      savedOperator = ''
      display()
    }
  })
}

init()