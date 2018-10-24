import InfiniteCalculator from './sumInfiniteNumbers';

describe('Testing two infinite numbers sum function', function () {
  let calculator;

  beforeEach(() => {
    calculator = new InfiniteCalculator();
  });

  it('Takes two strings as arguments', function () {
    const oneNumber = '123';
    const secondNumber = '324';
    expect(calculator.getSum(oneNumber, secondNumber)).toBe('546');
  });

  it('Calculate two infinite numbers accurately', function () {
    const oneNumber = '11111111111111111111111111111111111111111111111111111';
    const secondNumber = '23333333333333333333333333333333333333333333333333333';
    expect(calculator.getSum(oneNumber, secondNumber))
      .toBe('44444444444444444444444444444444444444444444444444443');
  });

  it('Have to flip second number', function () {
    const secondNumber = '123';
    expect(calculator.reverseString(secondNumber)).toBe('321');
  });

  it('Validate function have to be called', function () {
    spyOn(calculator, 'validateNumbers');
    const oneNumber = '1';
    const secondNumber = '2';
    calculator.getSum(oneNumber, secondNumber);
    expect(calculator.validateNumbers)
      .toHaveBeenCalledWith('1', '2');
  });

  it('Throw error if numbers are invalid', function () {
    const differentValues = ['11a', '', '  ', '$ /', '12.5', true, null,
      'undefined', NaN, Infinity, [1, 2], {1: 1}, function () {}];
    const oneNumber = '121';
    differentValues.forEach((value) => {
      expect(() => {
        calculator.validateNumbers(oneNumber, value);
      }).toThrowError(TypeError, 'Incorrect types of numbers. Please enter \'string\' numbers');
    });
  });

  it('Have to take longer second number argument', function () {
    const oneNumber = '123';
    const secondNumber = '324333';
    expect(calculator.getSum(oneNumber, secondNumber)).toBe('333546');
  });

  it('Have to take longer first number argument', function () {
    const oneNumber = '324333';
    const secondNumber = '9';
    expect(calculator.getSum(oneNumber, secondNumber)).toBe('324342');
  });
});
