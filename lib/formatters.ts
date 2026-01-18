// lib/formatters.ts

// Remove everything except digits
export function parseNumber(value: string): number {
  return Number(value.replace(/[^\d]/g, ""));
}

// Currency formatter: #,###,###
export function formatCurrencyInput(value: string): string {
  const digits = value.replace(/[^\d]/g, "");
  if (!digits) return "";
  return Number(digits).toLocaleString("en-US");
}

// Percentage formatter: #,###.##
export function formatPercentInput(value: string): string {
  // Allow digits and one decimal
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
