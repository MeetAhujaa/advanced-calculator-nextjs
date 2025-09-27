'use client';

import { useState } from 'react';

const KeyboardShortcuts: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const shortcuts = [
    { key: '0-9', description: 'Numbers' },
    { key: '+, -, *, /', description: 'Basic operations' },
    { key: '^', description: 'Power' },
    { key: '%', description: 'Percentage' },
    { key: '.', description: 'Decimal point' },
    { key: 'Enter, =', description: 'Equals' },
    { key: 'Escape, Delete', description: 'Clear all' },
    { key: 'Backspace', description: 'Delete last digit' },
    { key: 'S', description: 'Square root' },
    { key: 'Q', description: 'Square' },
    { key: 'R', description: 'Reciprocal (1/x)' },
    { key: 'N', description: 'Negate (+/-)' },
    { key: 'P', description: 'Pi (π)' },
    { key: 'E', description: "Euler's number (e)" },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
        aria-label="Toggle keyboard shortcuts"
      >
        <span>⌨️</span>
        <span>Keyboard Shortcuts</span>
      </button>

      {isVisible && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-20 z-40"
            onClick={() => setIsVisible(false)}
          />
          
          {/* Modal */}
          <div className="absolute top-full mt-2 right-0 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 p-4 z-50">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-800">
                Keyboard Shortcuts
              </h3>
              <button
                onClick={() => setIsVisible(false)}
                className="text-gray-400 hover:text-gray-600 text-xl"
                aria-label="Close shortcuts"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {shortcuts.map((shortcut, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-1"
                >
                  <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                    {shortcut.key}
                  </span>
                  <span className="text-sm text-gray-600 ml-3">
                    {shortcut.description}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="mt-3 pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                Press any key to use keyboard shortcuts
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default KeyboardShortcuts;