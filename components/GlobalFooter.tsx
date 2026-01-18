export default function GlobalFooter() {
  return (
    <footer
      style={{
        background: "#36656B",
        color: "#F0F8A4",
        padding: "24px 20px",
        marginTop: 60,
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
          fontSize: 14,
          opacity: 0.9,
        }}
      >
        <div style={{ display: "flex", gap: 18 }}>
          <a href="/terms" style={{ color: "#F0F8A4" }}>
            Terms
          </a>
          <a href="/privacy" style={{ color: "#F0F8A4" }}>
            Privacy
          </a>
        </div>

        <div>© 2026 yrfi.io</div>
      </div>
    </footer>
  );
}
