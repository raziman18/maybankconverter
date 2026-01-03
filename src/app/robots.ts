import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                crawlDelay: 1,
            },
            {
                userAgent: "Googlebot",
                allow: "/",
                disallow: "/api/",
            },
            {
                userAgent: "Bingbot",
                allow: "/",
                disallow: "/api/",
            },
        ],
        sitemap: "https://maybankconverter.raziman.online/sitemap.xml",
        host: "https://maybankconverter.raziman.online",
    };
}
