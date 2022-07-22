import { cacheNames } from "workbox-core"
import { registerRoute } from "workbox-routing"
import { CacheFirst, NetworkFirst } from "workbox-strategies"
import { CacheableResponsePlugin } from "workbox-cacheable-response"
import { precacheAndRoute, cleanupOutdatedCaches } from "workbox-precaching"
import { ExpirationPlugin } from "workbox-expiration"
import { offlineFallback } from "workbox-recipes"

cleanupOutdatedCaches()

// eslint-disable-next-line no-restricted-globals,no-underscore-dangle
precacheAndRoute(self.__WB_MANIFEST)

const cacheableOk = new CacheableResponsePlugin({
  statuses: [0, 200],
})

const expiration = new ExpirationPlugin({
  maxEntries: 50,
  maxAgeSeconds: 60 * 60 * 24 * 7 /* 1 week */,
  purgeOnQuotaError: true,
})

/**
 *
 * @param {Object} params
 * @param {URL} params.url
 */
const matchPreCache = ({ url }) => {
  const middleware = url.pathname.includes("middleware-build-manifest")
  const publicFiles = url.pathname.startsWith("/fonts") || url.pathname.startsWith("/icons") || url.pathname.startsWith("/images")
  const nextFiles = url.pathname.includes("media") || url.pathname.includes("static")

  return !middleware && (publicFiles || nextFiles)
}

registerRoute(
  matchPreCache,
  new CacheFirst({
    cacheName: cacheNames.precache,
    plugins: [expiration, cacheableOk],
  }),
  "GET"
)

/**
 *
 * @param {Object} params
 * @param {URL} params.url
 */
const matchRuntime = () => {
  return !matchPreCache()
}

registerRoute(
  matchRuntime,
  new NetworkFirst({
    cacheName: cacheNames.runtime,
    plugins: [cacheableOk],
  })
)

offlineFallback()
