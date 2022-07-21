const withWorkbox = require("next-with-workbox");

/** @type {import('next').NextConfig} */
const nextConfig = withWorkbox({
  workbox: {
    swSrc: "worker.js",
  },
  reactStrictMode: true,
})

module.exports = nextConfig
