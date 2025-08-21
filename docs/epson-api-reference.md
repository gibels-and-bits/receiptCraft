# Epson Printer API Reference

This document describes the Kotlin interface for the Epson printer that your interpreter will use.

## EpsonPrinter Interface

```kotlin
interface EpsonPrinter {
    fun addText(text: String, style: TextStyle? = null)
    fun addBarcode(data: String, type: BarcodeType, options: BarcodeOptions? = null)
    fun addQRCode(data: String, options: QRCodeOptions? = null)
    fun addImage(imageData: String, options: ImageOptions? = null)
    fun addFeedLine(lines: Int)
    fun cutPaper()
    fun addTextStyle(style: TextStyle)
    fun addTextAlign(alignment: Alignment)
    fun addTextFont(font: Font)
}
```

## Core Methods

### addText
Prints text with optional styling.

```kotlin
printer.addText("Hello World", TextStyle(bold = true, size = TextSize.LARGE))
```

### addBarcode
Generates and prints a barcode.

```kotlin
printer.addBarcode(
    data = "123456789",
    type = BarcodeType.CODE39,
    options = BarcodeOptions(height = 50, width = BarcodeWidth.MEDIUM)
)
```

### addQRCode
Generates and prints a QR code.

```kotlin
printer.addQRCode(
    data = "https://example.com",
    options = QRCodeOptions(size = 3, errorCorrection = QRErrorCorrection.MEDIUM)
)
```

### addImage
Prints an image from base64 encoded data.

```kotlin
printer.addImage(
    imageData = "base64_string_here",
    options = ImageOptions(width = 384, alignment = Alignment.CENTER)
)
```

### addFeedLine
Advances the paper by the specified number of lines.

```kotlin
printer.addFeedLine(2)  // Add 2 blank lines
```

### cutPaper
Cuts the paper. Always call this at the end of your receipt.

```kotlin
printer.cutPaper()
```

## Enumerations

### BarcodeType
```kotlin
enum class BarcodeType {
    UPC_A, UPC_E, EAN13, EAN8, 
    CODE39, ITF, CODABAR, CODE93, CODE128,
    GS1_128, GS1_DATABAR_OMNIDIRECTIONAL,
    GS1_DATABAR_TRUNCATED, GS1_DATABAR_LIMITED,
    GS1_DATABAR_EXPANDED
}
```

### TextSize
```kotlin
enum class TextSize {
    SMALL, NORMAL, LARGE, XLARGE
}
```

### Alignment
```kotlin
enum class Alignment {
    LEFT, CENTER, RIGHT
}
```

### Font
```kotlin
enum class Font {
    FONT_A, FONT_B, FONT_C
}
```

### BarcodeWidth
```kotlin
enum class BarcodeWidth {
    THIN, MEDIUM, THICK
}
```

### QRErrorCorrection
```kotlin
enum class QRErrorCorrection {
    LOW, MEDIUM, QUARTILE, HIGH
}
```

## Data Classes

### TextStyle
```kotlin
data class TextStyle(
    val bold: Boolean = false,
    val size: TextSize = TextSize.NORMAL,
    val underline: Boolean = false,
    val reverse: Boolean = false
)
```

### BarcodeOptions
```kotlin
data class BarcodeOptions(
    val width: BarcodeWidth = BarcodeWidth.MEDIUM,
    val height: Int = 50,
    val hri: Boolean = true  // Human Readable Interpretation
)
```

### QRCodeOptions
```kotlin
data class QRCodeOptions(
    val size: Int = 3,
    val errorCorrection: QRErrorCorrection = QRErrorCorrection.MEDIUM
)
```

### ImageOptions
```kotlin
data class ImageOptions(
    val width: Int = 384,
    val alignment: Alignment = Alignment.CENTER,
    val dithering: Boolean = true
)
```

## Usage Example

```kotlin
fun interpret(jsonString: String, printer: EpsonPrinter) {
    // Header
    printer.addTextAlign(Alignment.CENTER)
    printer.addText("BYTE BURGERS", TextStyle(bold = true, size = TextSize.XLARGE))
    printer.addFeedLine(1)
    
    // Body
    printer.addTextAlign(Alignment.LEFT)
    printer.addText("Order #12345")
    printer.addFeedLine(1)
    
    // Items
    printer.addText("1x Burger.........$8.99")
    printer.addText("1x Fries..........$3.99")
    printer.addText("1x Soda...........$2.99")
    printer.addFeedLine(1)
    
    // Total
    printer.addText("Total: $15.97", TextStyle(bold = true))
    printer.addFeedLine(2)
    
    // Barcode
    printer.addBarcode("ORD12345", BarcodeType.CODE128, null)
    printer.addFeedLine(2)
    
    // QR Code
    printer.addQRCode("https://byteburgers.com/order/12345", null)
    printer.addFeedLine(2)
    
    // Footer
    printer.addTextAlign(Alignment.CENTER)
    printer.addText("Thank you!", TextStyle(size = TextSize.SMALL))
    printer.addFeedLine(3)
    
    // Cut
    printer.cutPaper()
}
```

## Important Notes

1. **Default Values**: Most options have sensible defaults. You can pass `null` for options to use defaults.

2. **Text Encoding**: The printer supports UTF-8 text encoding.

3. **Image Format**: Images must be base64 encoded. The printer handles conversion internally.

4. **Paper Width**: Standard receipt paper is 384 pixels wide (58mm or 80mm paper).

5. **Error Handling**: The printer will throw exceptions for invalid operations. Always wrap in try-catch.

6. **Threading**: Printer operations are synchronous. Don't call from the UI thread in Android.