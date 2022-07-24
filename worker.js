import { NetworkFirst, CacheFirst } from "workbox-strategies"
import { registerRoute, NavigationRoute, Route } from "workbox-routing"
self.__WB_MANIFEST

const navigationRoute = new NavigationRoute(
  new NetworkFirst({
    cacheName: "navigations",
  })
)

const assetRoute = new Route(
  ({ request }) => {
    const { destination: dst } = request
    return dst.match("image|style|script|font")
  },
  new CacheFirst({
    cacheName: "assets",
  })
)

registerRoute(navigationRoute)
registerRoute(assetRoute)
registerRoute(
  ({ request }) => {
    return request.destination === "document"
  },
  new CacheFirst({
    cacheName: "doument",
  })
)
