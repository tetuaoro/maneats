import { useEffect, useState } from "react"
import { EmbeddedPost, useFacebook } from "react-facebook"
import { fbId } from "@libs/app"

const Component = () => {
  const { init } = useFacebook()

  const [urls] = useState<string[]>([])

  const effect_fb = async () => {
    try {
      const api = await init()
      if (!api) return

      const FB = await api.getFB()
      if (!FB) return

      FB.api("/" + fbId + "/published_posts", "GET", {}, (response: any) => console.log("response_published_posts", response))
    } catch (_) {}
  }

  useEffect(() => {
    effect_fb()
  }, [])

  return <section className="py-3 py-sm-5">{urls.length > 0 && urls.map((url, k) => <EmbeddedPost key={k} href={url} />)}</section>
}

export default Component
