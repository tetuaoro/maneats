const withWorkbox = require("next-with-workbox")

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = withWorkbox({ ...nextConfig, workbox: { force: true } })
