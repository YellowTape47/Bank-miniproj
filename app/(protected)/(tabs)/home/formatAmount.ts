export function formatAmountInput(text: string): string {
  // Keep only digits and dots
  let cleaned = text.replace(/[^0-9.]/g, "");

  // If more than one dot, keep only the first
  const dotIndex = cleaned.indexOf(".");
  if (dotIndex !== -1) {
    const beforeDot = cleaned.slice(0, dotIndex);
    const afterDot = cleaned.slice(dotIndex + 1).replace(/\./g, "");
    cleaned = beforeDot + "." + afterDot;
  }

  // Split into integer and decimal
  const [intPart, decimalPart] = cleaned.split(".");

  // Format integer part
  const formattedInt = intPart ? Number(intPart).toLocaleString("en-US") : "";

  // Limit decimal digits
  const limitedDecimal = decimalPart ? decimalPart.slice(0, 3) : "";

  // Combine back
  return cleaned.includes(".")
    ? `${formattedInt}.${limitedDecimal}`
    : formattedInt;
}
