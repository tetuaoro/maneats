import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        <meta name="theme-color" content="#d4262f" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#d4262f" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preload" href="/images/motif_footer_white.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href="/fonts/conthrax-sb.ttf" as="font" type="font/ttf" crossOrigin="" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
