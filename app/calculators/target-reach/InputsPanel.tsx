import { formatCurrencyInput, formatPercentInput } from "@/lib/formatters";

export function InputsPanel({
  target,
  setTarget,
  current,
  setCurrent,
  contribution,
  setContribution,
  returnRate,
  setReturnRate,
}: any) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: 12,
      }}
    >
      <Input
        label="Target amount"
        value={target}
        onChange={setTarget}
        formatter={formatCurrencyInput}
        placeholder="1,500,000"
      />

      <Input
        label="Current savings"
        value={current}
        onChange={setCurrent}
        formatter={formatCurrencyInput}
        placeholder="250,000"
      />

      <Input
        label="Monthly contribution"
        value={contribution}
        onChange={setContribution}
        formatter={formatCurrencyInput}
        placeholder="2,000"
      />

      <Input
        label="Annual return (%)"
        value={returnRate}
        onChange={setReturnRate}
        formatter={formatPercentInput}
        placeholder="7.00"
      />
    </div>
  );
}

function Input({ label, value, onChange, formatter, placeholder }: any) {
  return (
    <div>
      <label style={{ fontSize: 12, opacity: 0.8 }}>{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(formatter(e.target.value))}
        placeholder={placeholder}
        style={{
          marginTop: 4,
          padding: "8px 10px",
          borderRadius: 8,
          border: "none",
          fontSize: 14,
          background: "#fff",
          color: "#36656B",
          width: "100%",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}
