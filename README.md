# 🧾 Receipt Designer Challenge: Full-Stack Edition

Build a visual receipt designer that compiles to JSON, then write a Kotlin interpreter to print it on real hardware!

## The Challenge
1. **Frontend (JS/TS)**: Build a drag-drop receipt designer that outputs JSON
2. **Backend (Kotlin)**: Write an interpreter that processes your JSON format
3. **Final Test**: Your Kotlin code runs on a real Epson receipt printer!

## Getting Started
- Frontend development: `npm install && npm run dev`
- Kotlin development: See `kotlin-examples/` folder
- Test locally with mock printer, submit for real printing

## Submission Process
1. Design your JSON DSL format
2. Build the visual designer
3. Write Kotlin interpreter
4. Upload interpreter through the UI
5. Test with real printer during judging

## Project Structure
```
receipt-hackathon-kotlin/
├── src/                          # Next.js app with designer interface
├── kotlin-examples/              # Kotlin starter code and examples
│   ├── InterpreterTemplate.kt    # Your starting point
│   ├── MockEpsonPrinter.kt       # Test locally without hardware
│   └── sample-receipts/          # Example JSON formats
├── docs/                         # API and DSL specifications
│   ├── json-dsl-spec.md         # JSON format guidelines
│   ├── epson-api-reference.md   # Kotlin printer interface
│   └── judging-criteria.md      # How we'll evaluate submissions
└── package.json
```

## Quick Start

### 1. Frontend Development
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see the designer interface.

### 2. Kotlin Development
Check the `kotlin-examples/` folder for:
- Starter interpreter template
- Mock printer for local testing
- Sample JSON receipts
- Test runner script

### 3. Testing Your Solution
1. Design a receipt in the visual designer
2. Generate JSON output
3. Test your Kotlin interpreter locally with the mock printer
4. Upload your interpreter through the UI
5. Submit for real printer testing

## Evaluation Criteria
- **Creativity**: Unique JSON DSL design and receipt features
- **Completeness**: Full implementation of designer and interpreter
- **Robustness**: Error handling and edge cases
- **Print Quality**: How well receipts render on real hardware

## Support
- See `docs/` folder for detailed specifications
- Test with provided mock printer before submission
- Real printer testing happens during judging phase

Good luck! May the best receipt designer win! 🏆