export default function CalculatorLinks({
  current,
}: {
  current: string;
}) {
  const calculators = [
    { key: "compound-interest", label: "Compound Interest", href: "/calculators/compound-interest" },
    { key: "target-reach", label: "Target Reach", href: "/calculators/target-reach" },
  ];

  const visible = calculators.filter(
    (c) => c.key !== current
  );

  if (visible.length === 0) return null;

  return (
    <div
      style={{
        marginTop: 80,
        paddingTop: 24,
        borderTop: "1px solid #E5E5E5",
      }}
    >
      <div style={{ fontSize: 14, opacity: 0.8, marginBottom: 12 }}>
        Other calculators
      </div>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        {visible.map((calc) => (
          <li key={calc.key}>
            <a
              href={calc.href}
              style={{
                color: "#36656B",
                textDecoration: "underline",
                fontSize: 14,
              }}
            >
              {calc.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
