'use client';

export default function Rules() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          🏆 Receipt Printer Hackathon Rules
        </h1>
        <p className="text-gray-400 text-lg">Build a drag-and-drop receipt designer, JSON DSL, and Kotlin interpreter</p>
      </div>

      {/* Competition Format */}
      <section className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <h2 className="text-2xl font-bold mb-4 text-blue-400">📋 Competition Format</h2>
        <div className="space-y-3 text-gray-300">
          <p>Teams will build three integrated components:</p>
          <ol className="list-decimal list-inside space-y-2 ml-4">
            <li><strong className="text-white">Drag-and-Drop UI:</strong> Visual receipt designer with draggable sections</li>
            <li><strong className="text-white">JSON DSL:</strong> Intermediate format representing the receipt design</li>
            <li><strong className="text-white">Kotlin Interpreter:</strong> Converts JSON + Order data into printer commands</li>
          </ol>
          <div className="mt-4 p-4 bg-slate-900 rounded-lg border border-slate-600">
            <p className="text-sm"><strong className="text-yellow-400">Important:</strong> Your interpreter receives both your JSON design AND an Order object with real data for each round!</p>
          </div>
        </div>
      </section>

      {/* Rounds */}
      <section className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <h2 className="text-2xl font-bold mb-4 text-blue-400">🎯 Competition Format</h2>
        <div className="space-y-4">
          <div className="bg-slate-900 p-4 rounded-lg border border-slate-600">
            <p className="text-gray-300">
              The competition consists of <strong className="text-white">6 progressive rounds</strong>, each introducing new complexity.
            </p>
            <p className="text-gray-300 mt-2">
              <strong className="text-yellow-400">Important:</strong> Specific scenarios will be revealed during the competition! 
              Speed matters - the first team to successfully print each scenario earns bonus points.
            </p>
          </div>
          
          <div className="grid gap-3">
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-600">
              <h3 className="font-bold text-green-400 mb-1">Round 0: System Check</h3>
              <p className="text-gray-400 text-sm">Verify your drag-drop UI → JSON → Kotlin pipeline works</p>
            </div>
            
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-600">
              <h3 className="font-bold text-blue-400 mb-1">Rounds 1-5: Progressive Challenges</h3>
              <p className="text-gray-400 text-sm">
                Real-world scenarios will be announced live. Examples might include:
              </p>
              <ul className="text-gray-500 text-xs mt-2 space-y-1 ml-4">
                <li>• "A coffee shop regular picking up their usual morning order"</li>
                <li>• "Happy hour at a restaurant with special promotions"</li>
                <li>• "A loyalty member redeeming points for their birthday"</li>
                <li>• "Group dinner with separate checks"</li>
                <li>• "Corporate catering with special requirements"</li>
              </ul>
            </div>
          </div>
          
          <div className="p-4 bg-yellow-900/20 rounded-lg border border-yellow-600/50">
            <p className="text-sm text-yellow-300">
              <strong>Strategy Tip:</strong> Build a flexible system! You'll need to quickly adapt your receipt 
              design as new scenarios are revealed. The Order object will contain different fields in each round.
            </p>
          </div>
        </div>
      </section>

      {/* Order Schema */}
      <section className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <h2 className="text-2xl font-bold mb-4 text-blue-400">📊 Order Object Schema</h2>
        <div className="bg-slate-900 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <pre className="text-gray-300">{`interface Order {
  // Basic fields (Round 1+)
  orderId: string           // "A-0042"
  storeNumber: string       // "001"
  storeName: string         // "BYTE BURGERS"
  timestamp: number         // Unix timestamp
  
  // Items array
  items: OrderItem[]        // Array of items
  
  // Totals (pre-calculated)
  subtotal: number          // 27.95
  taxRate: number           // 0.08
  taxAmount: number         // 2.24
  totalAmount: number       // 30.19
  
  // Promotions (Round 2+)
  itemPromotions?: ItemPromotion[]
  orderPromotions?: OrderPromotion[]
  
  // Customer (Round 3+)
  customerInfo?: CustomerInfo
  paymentMethod?: string    // "VISA ****1234"
  
  // Split Payment (Round 5+)
  splitPayments?: SplitPayment[]
  tableInfo?: TableInfo
}

interface OrderItem {
  name: string              // "Cheeseburger"
  quantity: number          // 2
  unitPrice: number         // 8.99
  totalPrice: number        // 17.98
  sku?: string              // "BURG-001"
  category?: string         // "BURGERS"
  modifiers?: string[]      // ["Medium Rare", "Extra Cheese"]

interface ItemPromotion {
  itemSku: string           // "COFF-002"
  promotionName: string     // "Buy One Get One 50% Off"
  discountAmount: number    // 3.00
}

interface OrderPromotion {
  promotionName: string     // "Morning Rush Special"
  discountAmount: number    // 2.00
  promotionType: string     // "PERCENTAGE" or "FIXED"
}

interface CustomerInfo {
  customerId: string        // "CUST-8826"
  name: string              // "John Doe"
  memberStatus?: string     // "GOLD", "PLATINUM", etc.
  loyaltyPoints?: number    // 1247
  memberSince?: string      // "2019-03-15"
}

interface SplitPayment {
  payerName: string         // "Alice Chen"
  amount: number            // 156.43
  method: string            // "VISA ****7823"
  tip?: number              // 25.00
  items?: string[]          // ["Wagyu Steak", "Truffle Fries"]
}

interface TableInfo {
  tableNumber: string       // "12"
  serverName: string        // "Jennifer K."
  guestCount: number        // 3
  serviceRating?: number    // 5
}`}</pre>
        </div>
      </section>

      {/* Scoring */}
      <section className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <h2 className="text-2xl font-bold mb-4 text-blue-400">🎖️ Scoring Criteria</h2>
        <div className="space-y-4">
          <div className="bg-slate-900 p-4 rounded-lg border border-slate-600">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-green-400">Correctness</h3>
              <span className="text-2xl font-bold text-green-400">40%</span>
            </div>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• All required fields are displayed</li>
              <li>• Data is accurate (no missing items, wrong prices)</li>
              <li>• Proper handling of optional fields when present</li>
            </ul>
          </div>
          
          <div className="bg-slate-900 p-4 rounded-lg border border-slate-600">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-blue-400">Layout & Design</h3>
              <span className="text-2xl font-bold text-blue-400">40%</span>
            </div>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Visual appeal and readability</li>
              <li>• Proper alignment and spacing</li>
              <li>• Creative use of printer features (bold, sizes, alignment)</li>
              <li>• Professional appearance</li>
            </ul>
          </div>
          
          <div className="bg-slate-900 p-4 rounded-lg border border-slate-600">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-yellow-400">Speed</h3>
              <span className="text-2xl font-bold text-yellow-400">20%</span>
            </div>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• First team to successfully print correct receipt</li>
              <li>• Bonus points for top 3 fastest teams</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Tips & Strategy */}
      <section className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <h2 className="text-2xl font-bold mb-4 text-blue-400">💡 Tips & Strategy</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-slate-900 p-4 rounded-lg border border-slate-600">
            <h3 className="font-bold text-purple-400 mb-2">UI Design Tokens</h3>
            <p className="text-gray-300 text-sm mb-2">Consider these draggable elements:</p>
            <ul className="text-gray-400 text-xs space-y-1">
              <li>• Store Header (name, order ID)</li>
              <li>• Items List (with prices)</li>
              <li>• Promotions Section</li>
              <li>• Customer Info Block</li>
              <li>• Totals Section</li>
              <li>• Footer (thank you, QR code)</li>
            </ul>
          </div>
          
          <div className="bg-slate-900 p-4 rounded-lg border border-slate-600">
            <h3 className="font-bold text-purple-400 mb-2">Interpreter Strategy</h3>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Check if Order is null (Round 0)</li>
              <li>• Use optional chaining for new fields</li>
              <li>• Make layout flexible, not hardcoded</li>
              <li>• Test with different text lengths</li>
              <li>• Remember to reset text styles!</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-yellow-900/20 rounded-lg border border-yellow-600/50">
          <p className="text-sm text-yellow-300">
            <strong>Pro Tip:</strong> Your interpreter gets BOTH your JSON design (layout) AND the Order object (data). 
            Use the JSON to define WHERE things go, and the Order to provide WHAT to display!
          </p>
        </div>
      </section>

      {/* Example Mapping */}
      <section className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <h2 className="text-2xl font-bold mb-4 text-blue-400">🔗 Example: Token to Order Mapping</h2>
        <div className="bg-slate-900 p-4 rounded-lg font-mono text-sm">
          <pre className="text-gray-300">{`// Your JSON design might have:
{
  "sections": [
    { "type": "header", "template": "storeName" },
    { "type": "items", "showCategory": true },
    { "type": "customer", "fields": ["name", "status"] }
  ]
}

// In your interpreter:
when (section.type) {
  "header" -> {
    printer.addText(order.storeName, TextStyle(size = TextSize.LARGE))
    printer.addText("Order #" + order.orderId)
  }
  "items" -> {
    order.items.forEach { item ->
      if (section.showCategory) {
        printer.addText("[\${item.category}]", TextStyle(bold = true))
      }
      printer.addText("\${item.name} x\${item.quantity}")
    }
  }
  "customer" -> {
    order.customerInfo?.let { customer ->
      section.fields.forEach { field ->
        when (field) {
          "name" -> printer.addText("Customer: \${customer.name}")
          "status" -> printer.addText("Status: \${customer.memberStatus}")
        }
      }
    }
  }
}`}</pre>
        </div>
      </section>

      {/* Good Luck */}
      <section className="bg-gradient-to-r from-purple-900 to-blue-900 rounded-lg p-6 text-center">
        <h2 className="text-3xl font-bold mb-2">🚀 Good Luck!</h2>
        <p className="text-gray-300">May the best receipt win! Remember: Flexible interpreters adapt to any Order.</p>
      </section>
    </div>
  );
}