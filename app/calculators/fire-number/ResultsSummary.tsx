export function ResultsSummary({ fireNumber }: { fireNumber: number }) {
  if (!fireNumber) return null;

  return (
    <div
      style={{
        marginTop: 32,
        paddingTop: 16,
        borderTop: "1px solid rgba(54,101,107,0.25)",
        color: "#36656B",
      }}
    >
      <div
        style={{
          fontSize: 13,
          opacity: 0.7,
          marginBottom: 4,
        }}
      >
        Your FIRE number
      </div>

      <div
        style={{
          fontSize: 32,
          fontWeight: 600,
          letterSpacing: "-0.3px",
        }}
      >
        ${Math.round(fireNumber).toLocaleString()}
      </div>
    </div>
  );
}
