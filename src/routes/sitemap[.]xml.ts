import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { items } from "@/data/peptides";
import { BRAND, POLICY_LINKS } from "@/lib/compliance";

const BASE_URL = BRAND.domain;

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticPaths = [
          "/", "/catalog", "/research-library", "/faq", "/contact",
          ...POLICY_LINKS.map((p) => p.to),
        ];
        const dynamic = items.map((p) => `/peptides/${p.slug}`);
        const urls = [...staticPaths, ...dynamic].map(
          (p) => `  <url><loc>${BASE_URL}${p}</loc><changefreq>weekly</changefreq></url>`,
        );
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
