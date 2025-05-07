import { MetadataRoute } from "next";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/admin/*", "/(auth)", "/(auth)/*"],
    },
    sitemap: "https://artisansync.com/sitemap.xml",
    host: "https://artisansync.com",
  };
}
