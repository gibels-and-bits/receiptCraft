# 🧾 Receipt Designer Challenge: Full-Stack Edition

**Your Mission:** Build a complete receipt design system!

1. **Create a visual UI designer** (JavaScript/TypeScript) 
2. **Write a Kotlin interpreter** that transforms your JSON → Printer Commands

Your Kotlin code will run on real receipt printer hardware during judging!

## 🎯 The Challenge

You have **TWO main tasks** to complete:

### 1. Build the Receipt Designer UI (Frontend - JavaScript/TypeScript)
**Create a visual receipt designer interface from scratch** that:
- Provides drag-and-drop or click-to-add functionality for receipt elements
- Allows users to add and configure: text, barcodes, QR codes, images, dividers, etc.
- Includes property panels for editing element attributes (size, style, alignment, etc.)
- Shows a live preview of the receipt design
- **Generates your custom JSON intermediate language**

Your design decisions for the JSON format are crucial - this is the contract between your UI and interpreter!

### 2. Write the Kotlin Interpreter (Backend)
**Implement an interpreter in Kotlin** that:
- Takes your JSON DSL as input
- Parses and validates the JSON structure
- Translates each element into printer commands
- Handles the provided EpsonPrinter interface correctly
- Manages errors gracefully without crashing
- **This interpreter will run on real hardware during judging!**

### 3. Submit Your Solution (Already Implemented ✅)
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
Navigate to `kotlin-examples/` folder:
- `InterpreterTemplate.kt` - Your starting template
- `MockEpsonPrinter.kt` - Local testing without hardware
- `TestRunner.kts` - Script to test your interpreter
- `sample-receipts/` - Example JSON files (create your own!)

Test locally:
```bash
cd kotlin-examples
kotlin TestRunner.kts
```

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
├── kotlin-examples/              # Kotlin starter code
│   ├── InterpreterTemplate.kt    # Your interpreter starting point
│   ├── MockEpsonPrinter.kt       # Mock printer for testing
│   └── sample-receipts/          # Example JSON files
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

### Task 2: Create the Preview System (`src/app/page.tsx` - Preview Tab)
**Implement live preview functionality:**
- Add a canvas element to render the receipt
- Parse your JSON DSL format
- Use the provided `HTMLCanvasEpsonPrinter` to render elements
- Show a visual representation of how the receipt will look

### Task 3: Write Your Kotlin Interpreter (`kotlin-examples/InterpreterTemplate.kt`)
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

### Optional: JavaScript Interpreter for Debugging
- You can optionally create a JavaScript version of your interpreter
- Use the `HTMLCanvasEpsonPrinter` for local testing
- This helps debug your JSON DSL before testing with Kotlin
- Located in `src/interpreter.ts` (currently has basic structure)

## 📋 Development Workflow

1. **Plan Your JSON DSL Format**
   - Decide how to represent receipt elements in JSON
   - Consider what properties each element needs
   - Think about extensibility and clarity

2. **Build the Visual Designer UI**
   - Start with basic element addition
   - Add property editing capabilities
   - Implement JSON generation

3. **Test with Preview**
   - Use the canvas printer to preview designs
   - Verify your JSON structure is correct
   - Iterate on your DSL design

4. **Write the Kotlin Interpreter**
   - Start with the template in `kotlin-examples/`
   - Parse your JSON format
   - Map elements to printer commands
   - Test with the mock printer locally

5. **Submit Your Solution**
   - Navigate to the "Submit" tab (already built!)
   - Enter your team name
   - Paste your complete Kotlin interpreter code
   - Click upload to submit
   - View test results

6. **Judging Phase**
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

1. **Start with a Simple DSL** - Get basic text working before adding complex features
2. **Test Your JSON Frequently** - Use console.log to verify your generated JSON structure
3. **Use the Mock Printer** - Test your Kotlin interpreter locally before uploading
4. **Read the Printer API Docs** - Understand what commands are available in `docs/epson-api-reference.md`
5. **Handle Edge Cases** - Empty receipts, missing properties, invalid data
6. **Think Like a Designer** - What would make receipt creation intuitive for non-programmers?
7. **Be Creative with Features** - Consider templates, styles, dynamic content, loyalty programs

## 🔧 Available Tools & APIs

### Frontend
- `HTMLCanvasEpsonPrinter` - Canvas-based printer for previews
- `src/lib/api.ts` - API client for server communication
- `src/interfaces/` - TypeScript interfaces for printer operations

### Backend
- `MockEpsonPrinter` - Console-based mock for testing
- `EpsonPrinter` interface - What your interpreter will use
- Server endpoints for submission and testing

## ⚠️ Important Requirements

- **You must build the UI from scratch** - The provided components are empty shells
- **You must design your own JSON format** - There's no predefined schema
- **You must write the Kotlin interpreter** - This is the core of the challenge
- **The UI currently shows TODO placeholders** - Replace them with your implementation
- **Test locally first** - Use mock printers before server submission
- **Real printer testing happens during judging only** - Make sure your code is robust!

## 🆘 Need Help?

- Check the `docs/` folder for specifications
- Review `kotlin-examples/` for starter code
- Look at `src/interfaces/` for available printer operations
- Ask organizers for clarification

Good luck! May the best receipt designer win! 🏆