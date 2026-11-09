import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://terros.hr";
  const now = new Date();
  const serviceSlugs = [
    "strojni-iskop",
    "prijevoz-materijala",
    "odvoz-otpada",
    "oblikovanje-terena",
  ];

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/usluge`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...serviceSlugs.map((slug) => ({
      url: `${baseUrl}/usluge/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
