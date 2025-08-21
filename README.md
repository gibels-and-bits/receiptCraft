# 🧾 Receipt Designer Challenge: Full-Stack Edition

Build a visual receipt designer that compiles to JSON, then write a Kotlin interpreter to print it on real hardware!

## 🎯 The Challenge

You have **TWO main tasks**:

### 1. Frontend (JavaScript/TypeScript)
Build a **visual receipt designer** from scratch that:
- Allows non-technical users to design receipts visually
- Supports various element types (text, barcodes, QR codes, images, etc.)
- Generates a JSON DSL from the design
- Provides a preview of the receipt

### 2. Backend (Kotlin)
Write an **interpreter** that:
- Parses your custom JSON DSL format
- Processes each element type
- Sends commands to a receipt printer
- Handles errors gracefully

### 3. Integration
- Upload your Kotlin interpreter through the web UI
- Test with the mock printer
- During judging: Your code runs on **real hardware**!

## 🚀 Getting Started

### Frontend Development
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

**What's provided:**
- Basic app structure with tabs (Design, Preview, Submit)
- HTMLCanvasEpsonPrinter for rendering previews
- API client functions in `src/lib/api.ts`
- Printer interfaces in `src/interfaces/`

**What YOU need to build:**
- The entire receipt designer interface (it's currently just TODOs!)
- JSON DSL generation from your design
- Preview rendering using the canvas printer
- Kotlin code submission interface

### Kotlin Development
Check the `kotlin-examples/` folder:
- `InterpreterTemplate.kt` - Starting point for your interpreter
- `MockEpsonPrinter.kt` - Test locally without hardware
- `TestRunner.kts` - Script to test your interpreter
- Sample JSON files for testing

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

### In `src/components/ReceiptDesigner.tsx`
Build your visual receipt designer:
- Element palette (text, barcode, QR, etc.)
- Drag-and-drop or click-to-add interface
- Properties panel for editing elements
- JSON generation from your design
- Call `onJsonUpdate()` when design changes

### In `src/components/KotlinSubmission.tsx`
Build the submission interface:
- Team name input
- Kotlin code editor
- Upload button (use API from `src/lib/api.ts`)
- Test print functionality
- Status/response display

### In `src/app/page.tsx` (Preview Tab)
Implement the preview functionality:
- Add a canvas element
- Parse your JSON DSL
- Use HTMLCanvasEpsonPrinter to render
- Show visual receipt preview

### In `kotlin-examples/InterpreterTemplate.kt`
Write your Kotlin interpreter:
- Parse your custom JSON format
- Handle all element types
- Call appropriate printer methods
- Error handling

## 📋 Submission Process

1. **Design** your JSON DSL format
2. **Build** the visual designer interface
3. **Generate** JSON from your design
4. **Write** Kotlin interpreter to process your JSON
5. **Test** locally with mock printer
6. **Upload** interpreter through the UI
7. **Demo** during judging on real hardware!

## 🏆 Evaluation Criteria

- **Creativity** (25%): Unique DSL design and features
- **Completeness** (25%): Full implementation of both parts
- **Robustness** (25%): Error handling and edge cases
- **Print Quality** (25%): How well it works on real hardware

See `docs/judging-criteria.md` for full details.

## 💡 Tips

1. **Start simple** - Get basic text working first
2. **Test often** - Use the mock printer extensively
3. **Check the docs** - Reference the API specifications
4. **Be creative** - Think beyond basic receipts!
5. **Handle errors** - Don't let one bad element break everything

## 🔧 Available Tools & APIs

### Frontend
- `HTMLCanvasEpsonPrinter` - Canvas-based printer for previews
- `src/lib/api.ts` - API client for server communication
- `src/interfaces/` - TypeScript interfaces for printer operations

### Backend
- `MockEpsonPrinter` - Console-based mock for testing
- `EpsonPrinter` interface - What your interpreter will use
- Server endpoints for submission and testing

## ⚠️ Important Notes

- This is a **blank canvas** - you build the functionality!
- The UI currently shows TODO placeholders - replace them with your implementation
- Test locally first, then with the server
- Real printer testing happens during judging only

## 🆘 Need Help?

- Check the `docs/` folder for specifications
- Review `kotlin-examples/` for starter code
- Look at `src/interfaces/` for available printer operations
- Ask organizers for clarification

Good luck! May the best receipt designer win! 🏆