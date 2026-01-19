"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { blogPosts, BlogPost } from "./posts";

/* ---------------------------------------------
   BLOG PAGE
--------------------------------------------- */

export default function BlogPage() {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    blogPosts.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet).sort();
  }, []);

  const filteredPosts = useMemo(() => {
    return blogPosts
      .slice()
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() -
          new Date(a.publishedAt).getTime()
      )
      .filter((post) => {
        const matchesTag =
          !activeTag || post.tags.includes(activeTag);

        const matchesSearch =
          post.title.toLowerCase().includes(search.toLowerCase()) ||
          post.description.toLowerCase().includes(search.toLowerCase());

        return matchesTag && matchesSearch;
      });
  }, [search, activeTag]);

  return (
    <main
      style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: "60px 20px",
        color: "#36656B",
        boxSizing: "border-box",
      }}
    >
      {/* HEADER */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ marginBottom: 40 }}
      >
        <h1 style={{ marginBottom: 12 }}>Writing</h1>
        <p style={{ maxWidth: 520, lineHeight: 1.6 }}>
          Clear explanations of the mechanics behind personal finance —
          written to reduce confusion, not add noise.
        </p>
      </motion.section>

      {/* CONTROLS */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          marginBottom: 40,
        }}
      >
        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search posts"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px 12px",
            borderRadius: 10,
            border: "1px solid #E5E5E5",
            fontSize: 14,
            minWidth: 220,
            background: "#FFFFFF",
            color: "#36656B",
            outline: "none",
          }}
        />

        {/* TAG FILTER */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <TagButton
            label="All"
            active={!activeTag}
            onClick={() => setActiveTag(null)}
          />
          {allTags.map((tag) => (
            <TagButton
              key={tag}
              label={tag}
              active={activeTag === tag}
              onClick={() => setActiveTag(tag)}
            />
          ))}
        </div>
      </div>

      {/* POSTS GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 24,
        }}
      >
        {filteredPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}

        {filteredPosts.length === 0 && (
          <div style={{ opacity: 0.7 }}>
            No posts match your filters.
          </div>
        )}
      </div>
    </main>
  );
}

/* ---------------------------------------------
   BLOG CARD
--------------------------------------------- */

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      style={{ textDecoration: "none", color: "#36656B" }}
    >
      <article
        style={{
          background: "#F0F8A4",
          padding: 24,
          borderRadius: 16,
          height: "100%",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <h3 style={{ margin: 0 }}>{post.title}</h3>

        <div style={{ fontSize: 12, opacity: 0.75 }}>
          {post.author} ·{" "}
          {new Date(post.publishedAt).toLocaleDateString()} ·{" "}
          {post.views.toLocaleString()} views
        </div>

        <p style={{ margin: "4px 0", lineHeight: 1.6, opacity: 0.9 }}>
          {post.description}
        </p>

        <div
          style={{
            fontSize: 12,
            opacity: 0.7,
            marginTop: "auto",
          }}
        >
          {post.tags.join(" · ")}
        </div>
      </article>
    </Link>
  );
}

/* ---------------------------------------------
   TAG BUTTON
--------------------------------------------- */

function TagButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        background: active ? "#36656B" : "#FFFFFF",
        color: active ? "#F0F8A4" : "#36656B",
        border: "1px solid #E5E5E5",
        borderRadius: 999,
        padding: "6px 12px",
        fontSize: 13,
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}
