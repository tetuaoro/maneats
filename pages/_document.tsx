import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon image_src" href="/apple-touch-icon.png" />
        <link rel="preload" href="/images/motif.png" as="image" />
        <link rel="preload" href="/fonts/conthrax-sb.ttf" as="font" type="font/ttf" crossOrigin="" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
