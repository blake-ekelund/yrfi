export default function AboutPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "60px 20px",
        color: "#36656B",
      }}
    >
      <div
        style={{
          maxWidth: 720,
          margin: "0 auto",
          lineHeight: 1.6,
        }}
      >
        <h1 style={{ marginBottom: 24 }}>About</h1>

        <p style={{ marginBottom: 16 }}>
          I’m Blake, a VP of Finance with a long-standing interest in personal
          finance and how people actually experience money.
        </p>

        <p style={{ marginBottom: 16 }}>
          In my professional life, I work with financial models, forecasts, and
          systems that make complexity manageable. In personal finance, that
          same clarity is often missing. The result is that money feels opaque,
          stressful, or harder than it needs to be.
        </p>

        <p style={{ marginBottom: 16 }}>
          yrfi.io exists to change that.
        </p>

        <p style={{ marginBottom: 16 }}>
          The goal isn’t to give advice, sell products, or tell people what they
          “should” do. The goal is to make the mechanics visible, to turn
          abstract ideas like compounding, debt payoff, and time into something
          you can actually see and understand.
        </p>

        <p>
          When money becomes understandable, it becomes less scary. And when
          it’s less scary, people can make calmer, more intentional decisions.
          That’s what financial independence really starts with.
        </p>
      </div>
    </main>
  );
}
