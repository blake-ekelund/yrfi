export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  publishedAt: string;
  author: string;
  views: number;
  published: boolean;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "the-hidden-cost-of-1-percent",
    title: "The hidden cost of 1%",
    description:
      "Why a seemingly small management fee can quietly erase years of financial progress.",
    tags: ["fees", "investing"],
    publishedAt: "2026-01-23",
    author: "Blake",
    views: 0,
    published: false,
  },
];

export function getPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
