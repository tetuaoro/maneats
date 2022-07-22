const withWorkbox = require("next-with-workbox")

/** @type {import('next').NextConfig} */
const nextConfig = withWorkbox({
  workbox: {
    dest: "public",
    swDest: "sw.js",
    swSrc: "worker.js",
    force: true,
  },
  reactStrictMode: true,
})

module.exports = nextConfig
