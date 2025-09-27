export type Operator = '+' | '-' | '*' | '/' | '=' | '^' | '%';
export type UnaryOperator = 'sqrt' | 'square' | 'reciprocal' | 'negate';
export type ConstantOperator = 'pi' | 'e';

export interface CalculatorState {
  display: string;
  previousValue: number | null;
  operator: Operator | null;
  waitingForNewValue: boolean;
  hasError: boolean;
  memory: number;
  showingResult: boolean;
}

export interface CalculatorButtonProps {
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
  'data-testid'?: string;
  disabled?: boolean;
}

export interface KeyboardMapping {
  key: string;
  action: () => void;
  description: string;
}

export type CalculatorAction = 
  | { type: 'NUMBER'; payload: string }
  | { type: 'OPERATOR'; payload: Operator }
  | { type: 'UNARY_OPERATOR'; payload: UnaryOperator }
  | { type: 'CONSTANT'; payload: ConstantOperator }
  | { type: 'DECIMAL' }
  | { type: 'CLEAR' }
  | { type: 'CLEAR_ENTRY' }
  | { type: 'BACKSPACE' }
  | { type: 'EQUALS' }
  | { type: 'MEMORY_CLEAR' }
  | { type: 'MEMORY_RECALL' }
  | { type: 'MEMORY_ADD' }
  | { type: 'MEMORY_SUBTRACT' };
