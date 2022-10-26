const { writeFileSync } = require("fs")
const { sitename, pwaId, description } = require("./app.info")

/** @type {WebManifest} */
const config = {
  lang: "fr",
  id: pwaId,
  name: sitename,
  short_name: "Manea",
  description,
  start_url: "/",
  icons: [
    { src: "/icons/android_x72.png", sizes: "72x72", type: "image/png" },
    { src: "/icons/android_x96.png", sizes: "96x96", type: "image/png" },
    { src: "/icons/android_x128.png", sizes: "128x128", type: "image/png" },
    { src: "/icons/android_x144.png", sizes: "144x144", type: "image/png" },
    { src: "/icons/android_x152.png", sizes: "152x152", type: "image/png" },
    { src: "/icons/android_x192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
    { src: "/icons/android_x384.png", sizes: "384x384", type: "image/png", purpose: "maskable" },
    { src: "/icons/android_x512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
  ],
  theme_color: "#000000",
  background_color: "#000000",
  display: "standalone",
  shortcuts: [
    {
      name: "Se connecter",
      short_name: "Connexion",
      description: "Gérer le site web depuis la page de gestion.",
      url: "/dashboard",
      icons: [{ src: "/icons/person-circle.png", sizes: "192x192", type: "image/png" }],
    },
    {
      name: "Demander un devis",
      short_name: "Devis",
      description: "Réaliser un devis afin d'estimer la facture finale.",
      url: "/#devis",
      icons: [{ src: "/icons/file-earmark.png", sizes: "192x192", type: "image/png" }],
    },
  ],
}

writeFileSync("./public/site.webmanifest", JSON.stringify(config))
console.log('> Destination path: "public/site.webmanifest"')
