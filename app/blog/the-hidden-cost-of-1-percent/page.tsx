import { notFound } from "next/navigation";
import { getPostBySlug } from "../posts";
import ManagementFeeCalculator from "./components/ManagementFeeCalculator";

export default function BlogPostPage() {
  const post = getPostBySlug("the-hidden-cost-of-1-percent");

  if (!post) {
    notFound();
  }

  return (
    <main
      style={{
        maxWidth: 720,
        margin: "0 auto",
        padding: "80px 20px",
        color: "#36656B",
        boxSizing: "border-box",
        lineHeight: 1.7,
      }}
    >
      {/* HEADER */}
      <header style={{ marginBottom: 40 }}>
        <h1 style={{ marginBottom: 12 }}>{post.title}</h1>

        <div
          style={{
            fontSize: 14,
            opacity: 0.75,
          }}
        >
          {post.author} ·{" "}
          {new Date(post.publishedAt).toLocaleDateString()} ·{" "}
          {post.views.toLocaleString()} views
        </div>
      </header>

      {/* ARTICLE */}
      <article>
        <p>
          Management fees are one of the least visible — and most impactful —
          forces in long-term investing.
        </p>

        <p>
          A management fee is what you pay for professional oversight of your
          money. That can include portfolio construction, rebalancing, tax
          planning, and advice. In many cases, that help is genuinely valuable.
        </p>

        <p>
          The issue isn’t whether fees are “good” or “bad.” It’s how they’re
          charged.
        </p>

        <p>
          Many advisors charge a{" "}
          <strong>percentage of assets under management</strong>. Others charge
          a <strong>flat annual fee</strong>. Both models can make sense — but
          they behave very differently over time.
        </p>

        <p>
          A flat fee is predictable. It stays the same as your portfolio grows.
          A percentage-based fee grows automatically as your balance increases —
          even if the work being done doesn’t change.
        </p>

        <p>
          Over short periods, the difference can feel negligible. Over decades,
          it often isn’t.
        </p>

        {/* CALCULATOR */}
        <section style={{ margin: "48px 0" }}>
          <h2 style={{ marginBottom: 16 }}>
            Flat fee vs percentage-based fee
          </h2>

          <p style={{ marginBottom: 24 }}>
            The calculator below doesn’t judge either approach. It simply shows
            how each fee structure adds up over time.
          </p>

          <ManagementFeeCalculator />
        </section>

        <p>
          This doesn’t mean all percentage-based fees are wrong, or that flat
          fees are always better. Advisors provide different levels of service,
          expertise, and involvement.
        </p>

        <p>
          What matters is understanding what you’re paying, how that cost
          scales, and whether the value you receive grows alongside it.
        </p>

        <p>
          Fees are easiest to accept when they’re invisible. They’re hardest to
          undo once time has passed.
        </p>

        <p>
          Seeing the math early gives you the option to ask better questions —
          or make different choices — before the cost becomes irreversible.
        </p>
      </article>
    </main>
  );
}
