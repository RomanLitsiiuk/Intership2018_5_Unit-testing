'use strict';

class InfiniteCalculator {
  constructor() {
    this.result;
  }

  reverseString(string) {
    return string.split('').reverse().join('');
  }

  validateNumbers(...numbers) {
    for (let i = 0; i < numbers.length; i++) {
      if (typeof numbers[i] !== 'string' || !isFinite(numbers[i]) ||
        numbers[i].trim() === '' || Math.round(+numbers[i]) !== +numbers[i]) {
        throw new TypeError('Incorrect types of numbers. Please enter \'string\' numbers');
      }
    }
  }

  getSum(number1, number2) {
    this.validateNumbers(number1, number2);
    const flippedNumber2 = this.reverseString(number2);
    this.result = this.sum(number1.split(''), flippedNumber2.split('')).toString();
    return this.result;
  }

  sum(number1, number2, result = '', tenPart = 0) {
    if (number1.length === 0 && number2.length === 0 && !tenPart) {
      return result;
    }
    const firstNumeral = parseInt(number1.pop() || '0', 10);
    const secondNumeral = parseInt(number2.pop() || '0', 10);
    const partOfSum = firstNumeral + secondNumeral + tenPart;
    const addNumber = (result + partOfSum).slice(-1);
    return this.sum(number1, number2, addNumber + result, partOfSum > 9 ? 1 : 0);
  }
}

export default InfiniteCalculator;
