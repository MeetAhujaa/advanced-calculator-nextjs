import type { Operator, UnaryOperator, ConstantOperator } from '@/types/calculator';

/**
 * Performs mathematical operations with proper error handling
 */
export function calculate(
  firstValue: number,
  secondValue: number,
  operator: Operator
): number {
  switch (operator) {
    case '+':
      return firstValue + secondValue;
    case '-':
      return firstValue - secondValue;
    case '*':
      return firstValue * secondValue;
    case '/':
      if (secondValue === 0) {
        throw new Error('Division by zero');
      }
      return firstValue / secondValue;
    case '^':
      return Math.pow(firstValue, secondValue);
    case '%':
      return (firstValue * secondValue) / 100;
    default:
      throw new Error(`Unknown operator: ${operator}`);
  }
}

/**
 * Performs unary operations (operations on a single number)
 */
export function calculateUnary(
  value: number,
  operator: UnaryOperator
): number {
  switch (operator) {
    case 'sqrt':
      if (value < 0) {
        throw new Error('Cannot calculate square root of negative number');
      }
      return Math.sqrt(value);
    case 'square':
      return value * value;
    case 'reciprocal':
      if (value === 0) {
        throw new Error('Cannot calculate reciprocal of zero');
      }
      return 1 / value;
    case 'negate':
      return -value;
    default:
      throw new Error(`Unknown unary operator: ${operator}`);
  }
}

/**
 * Returns mathematical constants
 */
export function getConstant(constant: ConstantOperator): number {
  switch (constant) {
    case 'pi':
      return Math.PI;
    case 'e':
      return Math.E;
    default:
      throw new Error(`Unknown constant: ${constant}`);
  }
}

/**
 * Formats display value with proper decimal handling
 */
export function formatDisplayValue(value: string | number): string {
  const stringValue = typeof value === 'number' ? value.toString() : value;
  
  // Handle scientific notation for very large/small numbers
  const num = parseFloat(stringValue);
  if (Math.abs(num) >= 1e15 || (Math.abs(num) < 1e-10 && num !== 0)) {
    return num.toExponential(6);
  }
  
  // Limit decimal places for display
  if (stringValue.includes('.')) {
    const parts = stringValue.split('.');
    if (parts[1].length > 10) {
      return parseFloat(stringValue).toPrecision(12);
    }
  }
  
  return stringValue;
}

/**
 * Validates if a string is a valid number input
 */
export function isValidInput(input: string): boolean {
  // Allow empty string, digits, and single decimal point
  return /^$|^\d*\.?\d*$/.test(input) && (input.match(/\./g) || []).length <= 1;
}

/**
 * Checks if the current input can accept a decimal point
 */
export function canAddDecimal(currentDisplay: string): boolean {
  return !currentDisplay.includes('.') && currentDisplay !== '0';
}

/**
 * Handles backspace operation
 */
export function handleBackspace(currentDisplay: string): string {
  if (currentDisplay.length <= 1 || currentDisplay === 'Error') {
    return '0';
  }
  return currentDisplay.slice(0, -1);
}

/**
 * Checks if a key is a valid number key
 */
export function isNumberKey(key: string): boolean {
  return /^[0-9]$/.test(key);
}

/**
 * Checks if a key is a valid operator key
 */
export function isOperatorKey(key: string): boolean {
  return ['+', '-', '*', '/', '^', '%'].includes(key);
}

/**
 * Maps keyboard keys to calculator operations
 */
export function mapKeyToAction(key: string): string | null {
  const keyMap: Record<string, string> = {
    'Enter': '=',
    '=': '=',
    'Escape': 'clear',
    'Delete': 'clear',
    'Backspace': 'backspace',
    '.': '.',
    '+': '+',
    '-': '-',
    '*': '*',
    '/': '/',
    '^': '^',
    '%': '%',
    's': 'sqrt',
    'q': 'square',
    'r': 'reciprocal',
    'n': 'negate',
    'p': 'pi',
    'e': 'e',
  };
  
  return keyMap[key] || (isNumberKey(key) ? key : null);
}
