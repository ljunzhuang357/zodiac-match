import { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog";
import { animals } from "@/data/zodiac";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://zodiacmatch.xyz";

  const blogEntries = blogPosts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const staticPages = ["/about", "/contact", "/privacy"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // 66 unique pairing pages
  const pairingPages = [];
  for (let i = 0; i < animals.length; i++) {
    for (let j = i + 1; j < animals.length; j++) {
      pairingPages.push({
        url: `${base}/compatibility/${animals[i].name.toLowerCase()}-${animals[j].name.toLowerCase()}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      });
    }
  }

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${base}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...blogEntries,
    ...staticPages,
    ...pairingPages,
  ];
}
