# 🧾 ReceiptCraft: A Byte AI Hackathon for the Vibes

In this exercise, you’ll build a browser-based receipt designer that allows non-technical users to define how receipts should look—text, barcodes, images, dynamic fields, and more.

This feature would allow brand data managers to define their own store receipts without waiting for a new BytePOS build. It lays the groundwork for a no-code tool that outputs a portable format we could send directly to devices in the field.

We’ll be "vibe coding" the solution using a preconfigured template, which makes a few intentional choices to keep you focused on what matters—or at least what’s fun.

---

## The Task

BytePOS currently generates receipts through a Kotlin-based DSL interpreted into commands for Epson printers. But each change requires engineering effort and redeploying binaries.

Your mission is to flip that model: make a tool that allows **non-engineers to author receipts visually**. That tool should:

- Let users compose a receipt using visual building blocks (text, barcodes, images, etc.)
- Show a real-time preview of how the receipt will look when printed
- Optionally: convert that layout into a portable DSL and render it using a mock printer interface

The goal is to separate receipt design from deployment so that brands can customize their own layouts at any time.

---

## Tech Stack: Why Next.js?

This project uses **Next.js** with the **App Router**, **TypeScript**, and Tailwind CSS.

We chose Next.js because:
- It works well with agentic tools (in my limited experience)
- It supports a clean file-based routing model for rapid prototyping
- It provides hot-reloading and an embedded server for instant iteration
- It encourages good architectural separation between layout, state, and view logic

You don’t need to be an expert in the Next.js ecosystem. If something’s unfamiliar, ask Claude or experiment freely.

---

## Choose Your Path

### 🍗 Regular Recipe

Build the **visual layout editor** and an in-browser preview. Define a way for non-technical users to build receipts visually—drag and drop, toggle switches, freeform JSON, whatever you think works.

There should be a way to switch between edit and preview mode.

**Ideal for:**
- Participants newer to frontend engineering
- Those who want to prioritize UI and design polish
- Quickly building something visual and usable

---

### 🍗 Extra Crispy

Take it a step further:

- Design a **custom DSL** to represent your layout
- Write a **compiler** to generate that DSL from your editor state
- Write an **interpreter** that renders the DSL using a mock Epson printer API

**Ideal for:**
- Participants interested in structured data formats and reusable abstractions
- Engineers excited about seeing their logic shipped in future BytePOS builds 😉

---

## What You'll Build

| Component                | Regular Recipe | Extra Crispy |
|--------------------------|----------------|---------------|
| Visual layout editor     | ✅             | ✅             |
| Layout model in React    | ✅             | ✅             |
| Receipt preview in React | ✅             | (optional)     |
| DSL format               | ❌             | ✅             |
| `compile()` function     | ❌             | ✅             |
| `interpret()` function   | ❌             | ✅             |

---
## Some (Maybe) Helpful Notes & Direction
### Dynamic Fields

Receipts aren't static—they adapt per store, per transaction. Your tool should support **tokens** like:

- `{store_name}`
- `{cashier_name}`
- `{timestamp}`
- `{order_number}`
- `{subtotal}`
- `{item_list}`

These tokens represent runtime data. You can render them as-is or fill them with mock data in your preview.

*ponderin' question* - How you gonna make sure these are in sync with the POS capabilities?

---

### Understanding the Compiler and Interpreter

In **Extra Crispy Mode**, you’ll implement two functions:

#### `compile(layout: LayoutModel): MyDSL`

Converts the internal layout model into a portable DSL. This DSL could be sent over the wire to a POS device.

**Input:**
- `layout`: array of elements or a structured layout tree

**Output:**
- `MyDSL`: your custom format—could be JSON, an array of commands, or something weird and creative

---

#### `interpret(printer: EpsonMockPrinter, dsl: MyDSL): void`

Takes the DSL and issues method calls to the provided printer mock.

**Input:**
- `printer`: instance of `EpsonMockPrinter`
- `dsl`: output from your `compile()` function

**Expected behavior:**
- Walk through the DSL and call printer methods like:

```ts
printer.addText("...")
printer.addBarcode("...")
printer.addFeedLine(1)
printer.cutPaper()
```

> Rendering logic is handled for you—the printer mock takes care of visualization.

---

### EpsonMockPrinter API

The `EpsonMockPrinter` mirrors the Android Epson SDK 1:1.

It includes methods like:

```ts
printer.addText("Welcome to Taco Bell")
printer.addBarcode("1234567890", BarcodeType.CODE39, ...)
printer.addFeedLine(1)
printer.cutPaper()
```

This means: if your interpreter works here, it can be re-implemented in Kotlin for the real printer integration with minimal changes.

---

## 🏁 Getting Started

1. Clone the starter repo:
   ```bash
   git clone https://github.com/your-org/receiptcraft-starter.git
   cd receiptcraft-starter
   npm install
   npm run dev
   ```

2. Visit [http://localhost:3000](http://localhost:3000) in your browser

3. Choose your path: 🍔 Regular or 🍗 Extra Crispy  
   Stub files for both are included.

---

## What's Provided in the Starter Repo

| File / Folder         | Description |
|------------------------|-------------|
| `app/page.tsx`         | Entry page using Next.js App Router |
| `EpsonMockPrinter.ts`  | Mock printer with Epson-style API |
| `compile.ts`           | Optional compiler stub |
| `interpreter.ts`       | Optional interpreter stub |
| `components/`          | Optional helpers for layout rendering |
| `types.ts`             | Shared layout/DSL types (extend freely) |

---

## Stretch Goals

Want to go above and beyond?

- Implement drag-and-drop layout editing
- Provide preset templates (Taco Bell, KFC, etc.)
- Add layout validation rules
- Allow export/import of layouts
- Simulate different paper widths or printer behaviors
- Let users theme or brand receipts
- Implement cascading layouts from full org down to 1 store
- Add multilingual support

---

## Node.js + Next.js Basics

### Dev Commands

```bash
npm install      # Install dependencies
npm run dev      # Start dev server
```

### Project Structure

- `app/`: Page routes (using App Router)
- `components/`: Your React UI blocks
- `public/`: Static files (e.g., logos, images)
- `styles/`: Global CSS (Tailwind setup included)

### Add a Component

```tsx
// components/ReceiptItem.tsx
'use client';

export default function ReceiptItem({ text }: { text: string }) {
  return <p className="text-sm font-mono">{text}</p>;
}
```

Use it like:

```tsx
import ReceiptItem from "@/components/ReceiptItem"

<ReceiptItem text="Thanks for your order!" />
```

*use client is required at the top of any component file that relies on browser interactivity (e.g. event handlers, state, effects) when using Next.js App Router.*

---

## You're On Your Own

Trust your instincts, find your flow state, and vibe. Whether you stick with the Regular recipe or go Extra Crispy, there’s something valuable to learn—about what these systems are great at, and where they fall short.

