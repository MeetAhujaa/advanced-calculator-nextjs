import { type CalculatorButtonProps } from '@/types/calculator';

const CalculatorButton: React.FC<CalculatorButtonProps> = ({
  onClick,
  className = '',
  children,
  'data-testid': dataTestId,
}) => {
  const baseClasses = `
    h-16 text-xl font-semibold rounded-lg transition-all duration-150
    hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed select-none
  `.trim();

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${className}`}
      data-testid={dataTestId}
      type="button"
    >
      {children}
    </button>
  );
};

export default CalculatorButton;