export function ResultsSummary({ results }: { results: any[] }) {
  if (!results.length) return null;

  const starting = results[0].startingValue;
  const contributions = results[results.length - 1].contributions;
  const interest = results[results.length - 1].interestEarned;
  const ending = results[results.length - 1].endingValue;

  return (
    <div
      style={{
        marginTop: 32,
        paddingTop: 16,
        borderTop: "1px solid rgba(54,101,107,0.25)",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: 16,
      }}
    >
      <Metric label="Starting portfolio" value={starting} />
      <Metric label="Contributions" value={contributions} />
      <Metric label="Interest earned" value={interest} />
      <Metric label="Ending value" value={ending} highlight />
    </div>
  );
}

function Metric({ label, value, highlight }: any) {
  return (
    <div>
      <div style={{ fontSize: 13, opacity: 0.7 }}>{label}</div>
      <div
        style={{
          fontSize: highlight ? 22 : 18,
          fontWeight: highlight ? 600 : 400,
        }}
      >
        ${Math.round(value).toLocaleString()}
      </div>
    </div>
  );
}
