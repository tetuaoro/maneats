const url = "https://jblt.rao-nagos.pf"

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: url,
  generateRobotsTxt: true,
  changefreq: "monthly",
  exclude: ["/panier", "/produits/sitemap.xml"],
  transform: async (_config, path) => {
    const n = path.split("/").filter((f) => f.length > 0)
    return {
      loc: path,
      priority: 1 - n.length * 0.1,
      lastmod: new Date().toISOString(),
    }
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/panier",
      },
    ],
    additionalSitemaps: [url + "/produits/sitemap.xml"],
  },
}

module.exports = config
