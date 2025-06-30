# ReceiptCraft

## Purpose

This project is a tool for designing and customizing receipt layouts through an intuitive web interface.

Participants will build a simple web app that allows a non-technical user to define how a store receipt should look and preview the result. The main output should be structured data that represents the layout.

This project does not focus on printing or printer APIs—just on creating the layout and capturing it in a way that could be used elsewhere.

## Hackathon Prompt

**Problem**  
Brands want control over how their receipts look.  Today, the POS development team must take requirements from the brand and implement them in the POS software.  This is time-consuming and error-prone. 

**Your Task**  
Build a browser-based tool that lets someone define the layout of a receipt and preview it. How the user builds the receipt and how you structure the data are both up to you.

The goal is not to be exhaustive or pixel-perfect—focus on a clear approach that allows the receipt to be defined and understood.

## Getting Started

1. Clone the repo:
   ```bash
   git clone https://github.com/gibels-and-bits/receiptCraft.git
   cd receiptCraft
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser to:
   ```
   http://localhost:3000
   ```

You’ll now be in a live development environment. Changes you make in the source files will be reflected immediately in the browser.

## Next.js Basics

This project uses [Next.js](https://nextjs.org), a web framework built on top of React. Here are a few basics that may help if you’re new:

### Directory Structure

- `src/app/page.tsx`  
  This is the main page of your app (equivalent to `index.html` in other tools).
  
- `src/components/`  
  Place any reusable UI components here if you choose to break things up.

- `public/`  
  You can place static assets here (like images or logos), and reference them in your app.

### Routing

With the **App Router**, each folder inside `src/app` becomes a route.

- `src/app/page.tsx` → `/`
- `src/app/editor/page.tsx` → `/editor`
- `src/app/preview/page.tsx` → `/preview`

If you only use `page.tsx` in the root, your app will just live at `/`.

### Components

Next.js uses React components. Here's a minimal example:

```tsx
// src/app/page.tsx
export default function Page() {
  return <div>Hello world</div>
}
```

You can use React hooks like `useState` to manage data:

```tsx
'use client'
import { useState } from 'react'

export default function Page() {
  const [text, setText] = useState('')

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <p>Preview: {text}</p>
    </div>
  )
}
```

> Tip: All components that use browser-side interactivity (state, events) need `"use client"` at the top.

## Build and Run Loop

While working locally, you’ll mostly use:

- `npm run dev` — starts the live development server  
- Edit files in `src/app/`  
- Refresh the browser as needed (Next.js will usually hot-reload automatically)

If you want to build the app for production (not required for the hackathon):

```bash
npm run build
npm run start
```

But for hackathon purposes, you can just stick with `npm run dev`.

## Notes

- There is no UI or layout code provided—part of the challenge is deciding how a user might define a receipt visually or structurally.
- You are free to approach this however you like—drag-and-drop, form-based input, structured text, etc.
- There is no requirement to persist data or handle edge cases.

