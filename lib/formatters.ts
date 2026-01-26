// lib/formatters.ts

// -----------------------------
// Parsing (KEEP AS-IS)
// -----------------------------

// Remove everything except digits
export function parseNumber(value: string): number {
  return Number(value.replace(/[^\d]/g, ""));
}

// -----------------------------
// Input formatting (for UI)
// -----------------------------

// Currency input formatter: 123456 -> 123,456
export function formatCurrencyInput(value: string): string {
  const digits = value.replace(/[^\d]/g, "");
  if (!digits) return "";
  return Number(digits).toLocaleString("en-US");
}

// Percentage input formatter: 6.756 -> 6.75
export function formatPercentInput(value: string): string {
  let cleaned = value.replace(/[^\d.]/g, "");

  const parts = cleaned.split(".");
  if (parts.length > 2) {
    cleaned = parts[0] + "." + parts.slice(1).join("");
  }

  let [int, dec] = cleaned.split(".");
  int = int.replace(/^0+(?=\d)/, "");

  const formattedInt = int
    ? Number(int).toLocaleString("en-US")
    : "";

  if (dec !== undefined) {
    return `${formattedInt}.${dec.slice(0, 2)}`;
  }

  return formattedInt;
}

// -----------------------------
// Display formatting (NEW, SAFE)
// -----------------------------

// Currency display formatter: 250000 -> $250,000
export function formatCurrency(value: number): string {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}
