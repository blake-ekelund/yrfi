import Link from "next/link";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export default function Breadcrumbs({
  items,
}: {
  items: BreadcrumbItem[];
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      style={{
        fontSize: 13,
        opacity: 0.75,
        marginBottom: 12,
      }}
    >
      {items.map((item, idx) => (
        <span key={idx}>
          {item.href ? (
            <Link
              href={item.href}
              style={{
                color: "#36656B",
                textDecoration: "underline",
              }}
            >
              {item.label}
            </Link>
          ) : (
            <span>{item.label}</span>
          )}

          {idx < items.length - 1 && " / "}
        </span>
      ))}
    </nav>
  );
}
