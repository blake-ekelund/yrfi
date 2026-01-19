export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  publishedAt: string;
  author: string;
  views: number;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "the-hidden-cost-of-1-percent",
    title: "The hidden cost of 1%",
    description:
      "Why a seemingly small management fee can quietly erase years of financial progress.",
    tags: ["fees", "investing"],
    publishedAt: "2024-01-15",
    author: "Blake",
    views: 1243,
  },
  {
    slug: "what-a-fire-number-really-means",
    title: "What a FIRE number really means",
    description:
      "Why it’s a reference point, not a promise — and how to think about it responsibly.",
    tags: ["retirement"],
    publishedAt: "2024-01-08",
    author: "Blake",
    views: 982,
  },
  {
    slug: "compound-interest-feels-broken-at-first",
    title: "Why compound interest feels broken at first",
    description:
      "The psychological trap that causes people to quit before compounding does its work.",
    tags: ["investing"],
    publishedAt: "2023-12-20",
    author: "Blake",
    views: 1640,
  },
];

// ✅ THIS MUST BE EXPORTED
export function getPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
