const withWorkbox = require("next-with-workbox")

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

const development = process.env.NODE_ENV === "development"

console.log("mode NODE_ENV", development)
module.exports = withWorkbox({ ...nextConfig, workbox: { force: development, maximumFileSizeToCacheInBytes: 10 * 1024 * 1024 } })

// module.exports = nextConfig
