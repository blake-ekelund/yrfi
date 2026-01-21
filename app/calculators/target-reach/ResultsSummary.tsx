export function ResultsSummary({
  results,
  target,
}: {
  results: any[];
  target: number;
}) {
  if (!results.length) return null;

  const final = results[results.length - 1];

  return (
    <div
      style={{
        marginTop: 24,
        paddingTop: 16,
        borderTop: "1px solid rgba(54,101,107,0.25)",
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: 16,
      }}
    >
      <Metric label="Years to target" value={final.year} suffix=" years" />
      <Metric label="Target amount" value={target} currency />
      <Metric label="Contributions" value={final.contributions} currency />
      <Metric
        label="Interest earned"
        value={final.interestEarned}
        currency
        highlight
      />
    </div>
  );
}

function Metric({ label, value, currency, suffix, highlight }: any) {
  return (
    <div>
      <div style={{ fontSize: 13, opacity: 0.7 }}>{label}</div>
      <div
        style={{
          fontSize: highlight ? 22 : 18,
          fontWeight: highlight ? 600 : 400,
        }}
      >
        {currency ? `$${value.toLocaleString()}` : value}
        {suffix}
      </div>
    </div>
  );
}
