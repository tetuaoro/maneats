import { NetworkFirst, CacheFirst } from "workbox-strategies"
import { CacheableResponsePlugin } from "workbox-cacheable-response"
import { ExpirationPlugin } from "workbox-expiration"
import { registerRoute, NavigationRoute, Route } from "workbox-routing"
import { cleanupOutdatedCaches, precacheAndRoute } from "workbox-precaching"
import { offlineFallback } from "workbox-recipes"

cleanupOutdatedCaches()
let WB_MANIFEST = self.__WB_MANIFEST

if (Array.isArray(WB_MANIFEST)) {
  WB_MANIFEST = WB_MANIFEST.filter((wbm) => {
    const { url } = wbm
    if (url && typeof url === "string") return url.match(/_next\/static/)
  })
  WB_MANIFEST.push({ url: "/site.webmanifest", revision: null })
}

precacheAndRoute(WB_MANIFEST || [])

const cacheableOk = new CacheableResponsePlugin({
  statuses: [0, 200],
})

const expiration = new ExpirationPlugin({
  maxEntries: 50,
  maxAgeSeconds: 60 * 60 * 24 * 7 /* 1 week */,
  purgeOnQuotaError: true,
})

const navigationRoute = new NavigationRoute(
  new NetworkFirst({
    cacheName: "navigations",
    plugins: [cacheableOk],
  })
)

const assetRoute = new Route(
  ({ request }) => {
    const { destination: dst } = request
    return dst.match("image|style|script|font")
  },
  new CacheFirst({
    cacheName: "assets",
    plugins: [expiration, cacheableOk],
  })
)

registerRoute(navigationRoute)
registerRoute(assetRoute)

offlineFallback({ pageFallback: "/offline" })
