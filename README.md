# Calculator App

A modern, responsive calculator built with Next.js, TypeScript, and Tailwind CSS.

## Features

- ✨ **Modern UI**: Clean, responsive design with smooth animations
- 🧮 **Advanced Calculator Functions**: All basic operations plus scientific functions
- ⌨️ **Full Keyboard Support**: Complete keyboard shortcuts for all operations
- 🔢 **Decimal Support**: Handle decimal numbers with proper formatting
- 🧪 **Scientific Operations**: Square root, power, square, reciprocal, and more
- 📊 **Mathematical Constants**: Pi (π) and Euler's number (e)
- 💾 **Memory Functions**: Memory clear, recall, add, and subtract (MC, MR, M+, M-)
- ⚠️ **Error Handling**: Division by zero protection and comprehensive error states
- 🎯 **TypeScript**: Full type safety throughout the application
- 📱 **Responsive**: Works perfectly on desktop and mobile devices
- ♿ **Accessible**: Proper ARIA labels and keyboard navigation support
- 🎨 **Color-coded UI**: Different colors for different function types

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework for styling
- **React Hooks** - Modern React patterns for state management

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Home page
├── components/            # React components
│   ├── Calculator.tsx     # Main calculator component
│   └── CalculatorButton.tsx # Reusable button component
├── lib/                   # Utility functions
│   └── calculator.ts      # Calculator logic and helpers
└── types/                 # TypeScript type definitions
    └── calculator.ts      # Calculator-related types
```

## Code Quality & Best Practices

This project follows several best practices:

- **TypeScript Integration**: Full type safety with custom interfaces and types
- **Component Composition**: Reusable components with proper prop interfaces
- **Error Handling**: Graceful error handling for edge cases (division by zero, invalid operations)
- **State Management**: Clean state management using React hooks
- **Accessibility**: ARIA labels and semantic HTML
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Code Organization**: Logical folder structure separating concerns

## Calculator Operations

### Basic Operations
- **Addition (+)**: Add two numbers
- **Subtraction (−)**: Subtract two numbers  
- **Multiplication (×)**: Multiply two numbers
- **Division (÷)**: Divide two numbers with zero-division protection

### Advanced Operations
- **Power (x^y)**: Raise x to the power of y
- **Percentage (%)**: Calculate percentage (x% of y)
- **Square Root (√x)**: Calculate square root
- **Square (x²)**: Square a number
- **Reciprocal (1/x)**: Calculate 1 divided by x
- **Negate (±)**: Change sign of current number

### Mathematical Constants
- **Pi (π)**: 3.14159... 
- **Euler's number (e)**: 2.71828...

### Memory Functions
- **MC (Memory Clear)**: Clear stored memory
- **MR (Memory Recall)**: Recall number from memory
- **M+ (Memory Add)**: Add current display to memory
- **M- (Memory Subtract)**: Subtract current display from memory

### Additional Features
- **Decimal Numbers**: Full decimal point support
- **Backspace**: Delete last entered digit
- **Clear Entry (CE)**: Clear current entry only
- **All Clear (AC)**: Reset entire calculator state
- **Error Handling**: Comprehensive error protection
- **Continuous Calculations**: Chain operations together
- **Number Formatting**: Automatic formatting for large/small numbers

## Keyboard Shortcuts

| Key | Function | Description |
|-----|----------|--------------|
| **Numbers** |
| `0-9` | Numbers | Enter digits |
| `.` | Decimal | Decimal point |
| **Basic Operations** |
| `+` | Add | Addition |
| `-` | Subtract | Subtraction |
| `*` | Multiply | Multiplication |
| `/` | Divide | Division |
| `^` | Power | Raise to power |
| `%` | Percentage | Percentage calculation |
| `=`, `Enter` | Equals | Execute calculation |
| **Advanced Functions** |
| `S` | Square Root | √x |
| `Q` | Square | x² |
| `R` | Reciprocal | 1/x |
| `N` | Negate | ± (change sign) |
| **Constants** |
| `P` | Pi | π (3.14159...) |
| `E` | Euler | e (2.71828...) |
| **Control Keys** |
| `Escape`, `Delete` | All Clear | Reset calculator |
| `Backspace` | Delete | Remove last digit |

## Testing the Calculator

Try these operations to test functionality:

### Basic Operations
1. **Basic Math**: `5 + 3 = 8`
2. **Decimals**: `3.14 × 2 = 6.28`
3. **Chain Operations**: `10 + 5 - 3 × 2 = 4`
4. **Error Handling**: `5 ÷ 0 = Error`

### Advanced Operations
5. **Square Root**: `16` → press `S` → `4`
6. **Power**: `2 ^ 3 = 8`
7. **Percentage**: `200 % 25 = 50` (25% of 200)
8. **Constants**: Press `P` for π, `E` for e

### Keyboard Testing
9. **Type with keyboard**: `2 * 3 + 4` then press `Enter`
10. **Use shortcuts**: Press `S` for square root, `Q` for square
11. **Clear functions**: Press `Escape` to clear all

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
