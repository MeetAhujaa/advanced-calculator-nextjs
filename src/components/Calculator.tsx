'use client';

import { useState, useCallback, useEffect } from 'react';
import CalculatorButton from './CalculatorButton';
import KeyboardShortcuts from './KeyboardShortcuts';
import { 
  calculate, 
  calculateUnary, 
  getConstant, 
  formatDisplayValue, 
  canAddDecimal, 
  handleBackspace, 
  mapKeyToAction 
} from '@/lib/calculator';
import type { CalculatorState, Operator, UnaryOperator, ConstantOperator } from '@/types/calculator';

const Calculator: React.FC = () => {
  const [state, setState] = useState<CalculatorState>({
    display: '0',
    previousValue: null,
    operator: null,
    waitingForNewValue: false,
    hasError: false,
    memory: 0,
    showingResult: false,
  });

  const handleClear = useCallback(() => {
    setState({
      display: '0',
      previousValue: null,
      operator: null,
      waitingForNewValue: false,
      hasError: false,
      memory: 0,
      showingResult: false,
    });
  }, []);

  const handleClearEntry = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      display: '0',
      hasError: false,
    }));
  }, []);

  const handleBackspaceOperation = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      display: handleBackspace(prevState.display),
      hasError: false,
    }));
  }, []);

  const handleNumber = useCallback((num: string) => {
    setState(prevState => {
      if (prevState.hasError || prevState.showingResult) {
        return {
          ...prevState,
          display: num,
          hasError: false,
          waitingForNewValue: false,
          showingResult: false,
        };
      }

      if (prevState.waitingForNewValue) {
        return {
          ...prevState,
          display: num,
          waitingForNewValue: false,
        };
      }

      const newDisplay = prevState.display === '0' ? num : prevState.display + num;
      
      return {
        ...prevState,
        display: newDisplay,
      };
    });
  }, []);

  const handleDecimal = useCallback(() => {
    setState(prevState => {
      if (prevState.hasError || prevState.showingResult) {
        return {
          ...prevState,
          display: '0.',
          hasError: false,
          waitingForNewValue: false,
          showingResult: false,
        };
      }

      if (prevState.waitingForNewValue) {
        return {
          ...prevState,
          display: '0.',
          waitingForNewValue: false,
        };
      }

      if (canAddDecimal(prevState.display)) {
        return {
          ...prevState,
          display: prevState.display + '.',
        };
      }

      return prevState;
    });
  }, []);

  const handleOperator = useCallback((nextOperator: Operator) => {
    setState(prevState => {
      if (prevState.hasError) {
        return prevState;
      }

      const inputValue = parseFloat(prevState.display);

      if (prevState.previousValue === null) {
        return {
          ...prevState,
          previousValue: inputValue,
          operator: nextOperator,
          waitingForNewValue: true,
          showingResult: false,
        };
      }

      if (prevState.operator && prevState.waitingForNewValue) {
        return {
          ...prevState,
          operator: nextOperator,
        };
      }

      try {
        const result = calculate(prevState.previousValue, inputValue, prevState.operator!);
        
        return {
          ...prevState,
          display: formatDisplayValue(result),
          previousValue: nextOperator === '=' ? null : result,
          operator: nextOperator === '=' ? null : nextOperator,
          waitingForNewValue: true,
          showingResult: nextOperator === '=',
        };
      } catch {
        return {
          ...prevState,
          display: 'Error',
          previousValue: null,
          operator: null,
          waitingForNewValue: true,
          hasError: true,
          showingResult: false,
        };
      }
    });
  }, []);

  const handleUnaryOperator = useCallback((operator: UnaryOperator) => {
    setState(prevState => {
      if (prevState.hasError) {
        return prevState;
      }

      const inputValue = parseFloat(prevState.display);

      try {
        const result = calculateUnary(inputValue, operator);
        return {
          ...prevState,
          display: formatDisplayValue(result),
          waitingForNewValue: true,
          showingResult: true,
        };
      } catch {
        return {
          ...prevState,
          display: 'Error',
          hasError: true,
          waitingForNewValue: true,
          showingResult: false,
        };
      }
    });
  }, []);

  const handleConstant = useCallback((constant: ConstantOperator) => {
    const value = getConstant(constant);
    setState(prevState => ({
      ...prevState,
      display: formatDisplayValue(value),
      waitingForNewValue: true,
      showingResult: true,
      hasError: false,
    }));
  }, []);

  const handleEquals = useCallback(() => {
    handleOperator('=');
  }, [handleOperator]);

  // Memory operations
  const handleMemoryClear = useCallback(() => {
    setState(prevState => ({ ...prevState, memory: 0 }));
  }, []);

  const handleMemoryRecall = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      display: formatDisplayValue(prevState.memory),
      waitingForNewValue: true,
      showingResult: true,
    }));
  }, []);

  const handleMemoryAdd = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      memory: prevState.memory + parseFloat(prevState.display),
    }));
  }, []);

  const handleMemorySubtract = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      memory: prevState.memory - parseFloat(prevState.display),
    }));
  }, []);

  // Keyboard event handler
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    event.preventDefault();
    const key = event.key;
    const action = mapKeyToAction(key.toLowerCase());

    if (!action) return;

    switch (action) {
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        handleNumber(action);
        break;
      case '+':
      case '-':
      case '*':
      case '/':
      case '^':
      case '%':
        handleOperator(action as Operator);
        break;
      case '.':
        handleDecimal();
        break;
      case '=':
        handleEquals();
        break;
      case 'clear':
        handleClear();
        break;
      case 'backspace':
        handleBackspaceOperation();
        break;
      case 'sqrt':
        handleUnaryOperator('sqrt');
        break;
      case 'square':
        handleUnaryOperator('square');
        break;
      case 'reciprocal':
        handleUnaryOperator('reciprocal');
        break;
      case 'negate':
        handleUnaryOperator('negate');
        break;
      case 'pi':
        handleConstant('pi');
        break;
      case 'e':
        handleConstant('e');
        break;
    }
  }, [
    handleNumber, 
    handleOperator, 
    handleDecimal, 
    handleEquals, 
    handleClear, 
    handleBackspaceOperation, 
    handleUnaryOperator, 
    handleConstant
  ]);

  // Add keyboard event listener
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-2xl">
      {/* Header with title and keyboard shortcuts */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Calculator</h2>
        <KeyboardShortcuts />
      </div>

      {/* Display */}
      <div className="mb-6">
        <div 
          className="w-full h-20 px-4 py-2 text-right text-3xl font-mono bg-gray-100 rounded-lg border-2 border-gray-200 flex items-center justify-end overflow-hidden"
          data-testid="calculator-display"
        >
          <span className={`${state.hasError ? 'text-red-500' : 'text-gray-800'}`}>
            {state.display}
          </span>
        </div>
        {/* Memory and status indicators */}
        <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
          <span>
            {state.memory !== 0 && `Memory: ${formatDisplayValue(state.memory)}`}
          </span>
          <span>
            {state.operator && `${state.operator} pending`}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {/* Row 1 - Memory and Clear functions */}
        <CalculatorButton
          onClick={handleMemoryClear}
          className="bg-purple-500 hover:bg-purple-600 text-white text-sm focus:ring-purple-500"
          data-testid="memory-clear"
        >
          MC
        </CalculatorButton>
        <CalculatorButton
          onClick={handleMemoryRecall}
          className="bg-purple-500 hover:bg-purple-600 text-white text-sm focus:ring-purple-500"
          data-testid="memory-recall"
        >
          MR
        </CalculatorButton>
        <CalculatorButton
          onClick={handleMemoryAdd}
          className="bg-purple-500 hover:bg-purple-600 text-white text-sm focus:ring-purple-500"
          data-testid="memory-add"
        >
          M+
        </CalculatorButton>
        <CalculatorButton
          onClick={handleMemorySubtract}
          className="bg-purple-500 hover:bg-purple-600 text-white text-sm focus:ring-purple-500"
          data-testid="memory-subtract"
        >
          M-
        </CalculatorButton>
        <CalculatorButton
          onClick={handleClear}
          className="bg-red-500 hover:bg-red-600 text-white focus:ring-red-500"
          data-testid="clear"
        >
          AC
        </CalculatorButton>

        {/* Row 2 - Advanced functions */}
        <CalculatorButton
          onClick={() => handleUnaryOperator('sqrt')}
          className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm focus:ring-indigo-500"
          data-testid="sqrt"
        >
          √x
        </CalculatorButton>
        <CalculatorButton
          onClick={() => handleUnaryOperator('square')}
          className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm focus:ring-indigo-500"
          data-testid="square"
        >
          x²
        </CalculatorButton>
        <CalculatorButton
          onClick={() => handleOperator('^')}
          className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm focus:ring-indigo-500"
          data-testid="power"
        >
          x^y
        </CalculatorButton>
        <CalculatorButton
          onClick={() => handleUnaryOperator('reciprocal')}
          className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm focus:ring-indigo-500"
          data-testid="reciprocal"
        >
          1/x
        </CalculatorButton>
        <CalculatorButton
          onClick={handleBackspaceOperation}
          className="bg-gray-500 hover:bg-gray-600 text-white focus:ring-gray-500"
          data-testid="backspace"
        >
          ⌫
        </CalculatorButton>

        {/* Row 3 - Constants and basic operations */}
        <CalculatorButton
          onClick={() => handleConstant('pi')}
          className="bg-green-500 hover:bg-green-600 text-white text-sm focus:ring-green-500"
          data-testid="pi"
        >
          π
        </CalculatorButton>
        <CalculatorButton
          onClick={() => handleConstant('e')}
          className="bg-green-500 hover:bg-green-600 text-white text-sm focus:ring-green-500"
          data-testid="e"
        >
          e
        </CalculatorButton>
        <CalculatorButton
          onClick={() => handleOperator('%')}
          className="bg-orange-500 hover:bg-orange-600 text-white focus:ring-orange-500"
          data-testid="percent"
        >
          %
        </CalculatorButton>
        <CalculatorButton
          onClick={() => handleOperator('/')}
          className="bg-orange-500 hover:bg-orange-600 text-white focus:ring-orange-500"
          data-testid="divide"
        >
          ÷
        </CalculatorButton>
        <CalculatorButton
          onClick={() => handleOperator('*')}
          className="bg-orange-500 hover:bg-orange-600 text-white focus:ring-orange-500"
          data-testid="multiply"
        >
          ×
        </CalculatorButton>

        {/* Row 4 - Numbers 7,8,9 and subtract */}
        <CalculatorButton
          onClick={() => handleNumber('7')}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500"
          data-testid="number-7"
        >
          7
        </CalculatorButton>
        <CalculatorButton
          onClick={() => handleNumber('8')}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500"
          data-testid="number-8"
        >
          8
        </CalculatorButton>
        <CalculatorButton
          onClick={() => handleNumber('9')}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500"
          data-testid="number-9"
        >
          9
        </CalculatorButton>
        <CalculatorButton
          onClick={() => handleUnaryOperator('negate')}
          className="bg-orange-300 hover:bg-orange-400 text-gray-800 focus:ring-orange-500"
          data-testid="negate"
        >
          ±
        </CalculatorButton>
        <CalculatorButton
          onClick={() => handleOperator('-')}
          className="bg-orange-500 hover:bg-orange-600 text-white focus:ring-orange-500"
          data-testid="subtract"
        >
          −
        </CalculatorButton>

        {/* Row 5 - Numbers 4,5,6 and add */}
        <CalculatorButton
          onClick={() => handleNumber('4')}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500"
          data-testid="number-4"
        >
          4
        </CalculatorButton>
        <CalculatorButton
          onClick={() => handleNumber('5')}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500"
          data-testid="number-5"
        >
          5
        </CalculatorButton>
        <CalculatorButton
          onClick={() => handleNumber('6')}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500"
          data-testid="number-6"
        >
          6
        </CalculatorButton>
        <CalculatorButton
          onClick={handleClearEntry}
          className="bg-gray-400 hover:bg-gray-500 text-white text-sm focus:ring-gray-500"
          data-testid="clear-entry"
        >
          CE
        </CalculatorButton>
        <CalculatorButton
          onClick={() => handleOperator('+')}
          className="bg-orange-500 hover:bg-orange-600 text-white focus:ring-orange-500"
          data-testid="add"
        >
          +
        </CalculatorButton>

        {/* Row 6 - Numbers 1,2,3 and equals (spans 2 rows) */}
        <CalculatorButton
          onClick={() => handleNumber('1')}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500"
          data-testid="number-1"
        >
          1
        </CalculatorButton>
        <CalculatorButton
          onClick={() => handleNumber('2')}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500"
          data-testid="number-2"
        >
          2
        </CalculatorButton>
        <CalculatorButton
          onClick={() => handleNumber('3')}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500"
          data-testid="number-3"
        >
          3
        </CalculatorButton>
        <div></div> {/* Empty space */}
        <CalculatorButton
          onClick={handleEquals}
          className="row-span-2 bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500"
          data-testid="equals"
        >
          =
        </CalculatorButton>

        {/* Row 7 - Number 0 (spans 2 cols), decimal */}
        <CalculatorButton
          onClick={() => handleNumber('0')}
          className="col-span-3 bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500"
          data-testid="number-0"
        >
          0
        </CalculatorButton>
        <CalculatorButton
          onClick={handleDecimal}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500"
          data-testid="decimal"
        >
          .
        </CalculatorButton>
        {/* Equals button continues from row 6 */}
      </div>
    </div>
  );
};

export default Calculator;