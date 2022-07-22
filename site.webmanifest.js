const { writeFileSync } = require("fs")

const config = {
  lang: "fr",
  id: "maneats15072022",
  name: "Manea tahiti services",
  short_name: "Manea",
  description: "Entreprise proposant ses services de coursier et de livraison à domicile, à Tahiti et dans les îles.",
  start_url: "/",
  icons: [
    { src: "/icons/android_chrome_x96.png", sizes: "96x96", type: "image/png" },
    { src: "/icons/android_chrome_x128.png", sizes: "128x128", type: "image/png" },
    { src: "/icons/android_chrome_x144.png", sizes: "144x144", type: "image/png" },
    { src: "/icons/android_chrome_x192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
    { src: "/icons/android_chrome_x384.png", sizes: "384x384", type: "image/png", purpose: "maskable" },
    { src: "/icons/android_chrome_x512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
  ],
  theme_color: "#000000",
  background_color: "#000000",
  display: "standalone",
}

writeFileSync("./public/site.webmanifest", JSON.stringify(config))
