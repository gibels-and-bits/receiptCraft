# 🧾 Receipt Designer Challenge: Full-Stack Edition

**Your Mission:** Build a complete receipt design system!

1. **Create a visual UI designer** (JavaScript/TypeScript) 
2. **Write a JavaScript interpreter** for visual preview/testing
3. **Write a Kotlin interpreter** that transforms your JSON → Printer Commands

Your Kotlin code will run on real receipt printer hardware during judging!

## 🎯 The Challenge

You have **THREE main development tasks**:

### 1. Build the Receipt Designer UI (Frontend - JavaScript/TypeScript)
**Create a visual receipt designer interface from scratch** that:
- Provides drag-and-drop or click-to-add functionality for receipt elements
- Allows users to add and configure: text, barcodes, QR codes, images, dividers, etc.
- Includes property panels for editing element attributes (size, style, alignment, etc.)
- **Generates your custom JSON intermediate language**

Your design decisions for the JSON format are crucial - this is the contract between your UI and interpreters!

### 2. Write a JavaScript Interpreter for Visual Feedback (Frontend)
**Build a JavaScript interpreter to test your designs** that:
- Parses your JSON DSL format
- Renders receipt elements using `HTMLCanvasEpsonPrinter`
- Provides immediate visual feedback during development
- Helps you debug your JSON structure before Kotlin implementation
- **This is essential for testing your designs visually!**

### 3. Write the Kotlin Interpreter (Backend)
**Implement the production interpreter in Kotlin** that:
- Takes your JSON DSL as input (same format as JS interpreter)
- Parses and validates the JSON structure
- Translates each element into printer commands
- Handles the provided EpsonPrinter interface correctly
- Manages errors gracefully without crashing
- **This interpreter will run on real hardware during judging!**

### 4. Submit Your Solution (Already Implemented ✅)
The submission system is **already built** for you:
- Navigate to the "Submit" tab in the web interface
- Enter your team name
- Paste your Kotlin interpreter code
- Click upload to test your solution

## 🚀 Getting Started

### Step 1: Setup Frontend Development
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

**What's provided for you:**
- Basic Next.js app structure with routing
- Tab navigation (Design, Preview, Submit)
- `HTMLCanvasEpsonPrinter` class for rendering receipt previews
- API client functions in `src/lib/api.ts`
- TypeScript interfaces for printer operations in `src/interfaces/`

**What YOU must build:**
- ✅ Complete visual receipt designer UI
- ✅ Your custom JSON DSL format
- ✅ JSON generation from UI state
- ✅ Preview rendering system
- ✅ Kotlin code submission interface

### Step 2: Design Your JSON DSL
Before coding, plan your JSON structure. Example considerations:
```json
{
  "elements": [
    {"type": "text", "content": "Hello", "style": {...}},
    {"type": "barcode", "data": "123456", "format": "CODE128"}
  ]
}
```

### Step 3: Kotlin Development
Write your Kotlin interpreter that:
- Parses your JSON DSL format
- Maps elements to printer commands
- Uses the `EpsonPrinter` interface correctly
- Handles errors gracefully

**Important:** There is no local Kotlin compilation environment. To test your receipt designs:
- You MUST write a JavaScript interpreter that uses `HTMLCanvasEpsonPrinter`
- This JavaScript interpreter serves as your local testing environment
- Use it to verify your JSON produces the expected output
- Your Kotlin interpreter should handle the same JSON format
- The only way to test Kotlin code is through the submission system

## 📁 Project Structure
```
receipt-hackathon-kotlin/
├── src/
│   ├── app/page.tsx              # Main app with tabs (provided)
│   ├── components/
│   │   ├── ReceiptDesigner.tsx   # TODO: Build your designer here!
│   │   └── KotlinSubmission.tsx  # TODO: Build submission UI here!
│   ├── interfaces/               # Printer interfaces (reference these!)
│   └── lib/api.ts               # API client functions (use these!)
└── docs/                         # Specifications and guides
    ├── json-dsl-spec.md         # JSON format guidelines
    ├── epson-api-reference.md   # Kotlin printer API
    └── judging-criteria.md      # How we'll evaluate

```

## 🛠️ What You Need to Implement

### Task 1: Build the UI Designer (`src/components/ReceiptDesigner.tsx`)
**This file is currently empty - you need to build everything!**
- Create an element palette (buttons/toolbox for adding receipt elements)
- Implement drag-and-drop or click-to-add functionality
- Build a properties panel for editing selected elements
- Design the layout editor/canvas where users compose their receipt
- Generate JSON from the current design state
- Call `onJsonUpdate()` whenever the design changes

### Task 2: Write a JavaScript Interpreter (`src/interpreter.ts`)
**Build a JavaScript interpreter for visual testing (REQUIRED for local testing):**
- Parse your JSON DSL format
- Use the provided `HTMLCanvasEpsonPrinter` class
- Render each element type to the canvas
- This is your ONLY way to test receipt output locally
- Essential for debugging before implementing in Kotlin!
- There is NO local Kotlin compilation - JavaScript is your test environment

### Task 3: Implement the Preview System (`src/app/page.tsx` - Preview Tab)
**Connect your interpreter to the preview:**
- Add a canvas element to render the receipt
- Call your JavaScript interpreter with the current JSON
- Display the visual receipt using `HTMLCanvasEpsonPrinter`
- Update preview in real-time as the design changes

### Task 4: Write Your Kotlin Interpreter
**This is your core backend logic:**
- Define your JSON parsing logic
- Implement handlers for each element type in your DSL
- Translate JSON elements to printer commands
- Use the `EpsonPrinter` interface methods correctly
- Add comprehensive error handling

### ✅ Already Done: Submission System
The submission interface (`src/components/KotlinSubmission.tsx`) is **already implemented**:
- Simply navigate to the "Submit" tab
- Enter your team name
- Paste your Kotlin interpreter code
- Click upload to submit your solution
- View test results


## 📋 Development Workflow

1. **Plan Your JSON DSL Format**
   - Decide how to represent receipt elements in JSON
   - Consider what properties each element needs
   - Think about extensibility and clarity

2. **Build the Visual Designer UI**
   - Start with basic element addition
   - Add property editing capabilities
   - Implement JSON generation

3. **Write JavaScript Interpreter**
   - Implement in `src/interpreter.ts`
   - Parse your JSON and render with `HTMLCanvasEpsonPrinter`
   - This gives you immediate visual feedback!

4. **Connect Preview System**
   - Wire up the Preview tab to use your JS interpreter
   - See your receipts rendered in real-time
   - Debug and refine your JSON structure

5. **Write the Kotlin Interpreter**
   - Use the same JSON format as your JS interpreter
   - Map elements to printer commands
   - Test your JSON using the JavaScript preview (no local Kotlin compilation)
   - Submit to server to test actual Kotlin execution

6. **Submit Your Solution**
   - Navigate to the "Submit" tab (already built!)
   - Enter your team name
   - Paste your complete Kotlin interpreter code
   - Click upload to submit
   - View test results

7. **Judging Phase**
   - Your interpreter runs on real hardware
   - Judges test with various JSON inputs
   - Live demonstration of your designer

## 🏆 Evaluation Criteria

- **Creativity** (25%): Unique DSL design and features
- **Completeness** (25%): Full implementation of both parts
- **Robustness** (25%): Error handling and edge cases
- **Print Quality** (25%): How well it works on real hardware

See `docs/judging-criteria.md` for full details.

## 💡 Tips for Success

1. **Build the JS Interpreter First** - This is your ONLY local testing method (no local Kotlin compilation)
2. **Start with a Simple DSL** - Get basic text working before adding complex features  
3. **Test Your JSON Frequently** - Use the JavaScript Preview tab to see your receipts rendered
4. **Keep Both Interpreters in Sync** - JS and Kotlin must handle the same JSON format
5. **Understand the Limitations** - JavaScript preview is for testing JSON; Kotlin only runs on the server
6. **Read the Printer API Docs** - Understand what commands are available in `docs/epson-api-reference.md`
7. **Handle Edge Cases** - Empty receipts, missing properties, invalid data
8. **Think Like a Designer** - What would make receipt creation intuitive for non-programmers?
9. **Be Creative with Features** - Consider templates, styles, dynamic content, loyalty programs

## 🔧 Available Tools & APIs

### Frontend
- `HTMLCanvasEpsonPrinter` - Canvas-based printer for previews
- `src/lib/api.ts` - API client for server communication
- `src/interfaces/` - TypeScript interfaces for printer operations

### Backend
- `EpsonPrinter` interface - What your interpreter will use
- Server endpoints for submission and testing

## ⚠️ Important Requirements

- **You must build the UI from scratch** - The provided components are empty shells
- **You must design your own JSON format** - There's no predefined schema
- **You must write the Kotlin interpreter** - This is the core of the challenge
- **The UI currently shows TODO placeholders** - Replace them with your implementation
- **Real printer testing happens during judging only** - Make sure your code is robust!

## 🆘 Need Help?

- Check the `docs/` folder for specifications
- Look at `src/interfaces/` for available printer operations
- Ask organizers for clarification

Good luck! May the best receipt designer win! 🏆