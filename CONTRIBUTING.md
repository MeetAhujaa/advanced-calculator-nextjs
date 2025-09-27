# Contributing to Advanced Calculator

Thank you for your interest in contributing to the Advanced Calculator project! We welcome contributions from the community.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/advanced-calculator-nextjs.git
   cd advanced-calculator-nextjs
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start the development server**:
   ```bash
   npm run dev
   ```

## Development Guidelines

### Code Style
- Follow TypeScript best practices
- Use meaningful variable and function names
- Add comments for complex logic
- Maintain consistent formatting (Prettier is configured)

### Component Structure
- Keep components focused and reusable
- Use proper TypeScript interfaces
- Follow the existing folder structure:
  - `src/components/` - React components
  - `src/lib/` - Utility functions
  - `src/types/` - TypeScript type definitions

### Testing
- Test your changes thoroughly
- Verify keyboard shortcuts work correctly
- Test edge cases (division by zero, large numbers, etc.)
- Ensure the build passes: `npm run build`

## Submitting Changes

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** and test them

3. **Commit with a descriptive message**:
   ```bash
   git commit -m "feat: add new mathematical function"
   ```

4. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request** on GitHub

## Types of Contributions

### New Features
- Additional mathematical functions
- UI/UX improvements  
- Accessibility enhancements
- Performance optimizations

### Bug Fixes
- Calculation errors
- Keyboard shortcut issues
- UI/display problems
- TypeScript type issues

### Documentation
- README improvements
- Code comments
- Usage examples
- API documentation

## Feature Ideas

We welcome contributions for:
- **Scientific functions**: Trigonometric functions (sin, cos, tan), logarithms
- **Number systems**: Binary, hexadecimal, octal conversion
- **History feature**: Calculation history with recall
- **Themes**: Dark mode, custom color themes
- **Export/Import**: Save/load calculator sessions
- **Unit conversions**: Length, weight, temperature, etc.

## Code Review Process

All contributions will be reviewed for:
- Code quality and style
- Functionality and testing
- TypeScript type safety
- Performance impact
- User experience

## Questions?

Feel free to open an issue for:
- Feature requests
- Bug reports
- Questions about contributing
- General discussion

Thank you for contributing! 🎉