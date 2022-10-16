import { NetworkFirst } from "workbox-strategies"
import { CacheableResponsePlugin } from "workbox-cacheable-response"
import { registerRoute, NavigationRoute } from "workbox-routing"
import { cleanupOutdatedCaches, precacheAndRoute } from "workbox-precaching"
import { offlineFallback } from "workbox-recipes"

cleanupOutdatedCaches()
let WB_MANIFEST = self.__WB_MANIFEST

if (Array.isArray(WB_MANIFEST)) {
  WB_MANIFEST = WB_MANIFEST.filter((wbm) => {
    const { url } = wbm
    if (url && typeof url === "string") return url.match(/_next\/static/)
  })
  WB_MANIFEST.push({ url: "/site.webmanifest", revision: Date.now() })
}

precacheAndRoute(WB_MANIFEST || [])

const cacheableOk = new CacheableResponsePlugin({
  statuses: [0, 200],
})

const navigationRoute = new NavigationRoute(
  new NetworkFirst({
    cacheName: "navigations",
    plugins: [cacheableOk],
  })
)

registerRoute(navigationRoute)

offlineFallback({ pageFallback: "/offline" })
