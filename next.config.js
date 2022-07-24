const { join } = require("path")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const { InjectManifest } = require("workbox-webpack-plugin")

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

const withWorkbox = (nextConfig = {}) => {
  return {
    ...nextConfig,
    webpack(config, options) {
      if (typeof nextConfig.webpack === "function") {
        config = nextConfig.webpack(config, options)
      }

      const {
        dev,
        isServer,
        config: { workbox: { dest = "public", force = false, modifyURLPrefix = {}, swDest = "sw.js", swSrc = false, ...workboxOptions } = {} },
      } = options

      if (isServer) {
        return config
      }

      if (dev && !force) {
        console.log("> Progressive Web App is disabled")
        return config
      }

      const swDestPath = join(options.dir, dest, swDest)

      console.log("> Progressive web app is enabled using Workbox")
      console.log(`> Service worker destination path: "${swDestPath}"`)

      config.plugins.push(
        new CleanWebpackPlugin({
          cleanOnceBeforeBuildPatterns: [swDestPath, `${swDestPath}.map`],
        })
      )

      if (swSrc) {
        const swSrcPath = join(options.dir, swSrc)
        console.log(`> Service worker source path: "${swSrcPath}"`)
        console.log('> Using "WorkboxPlugin.InjectManifest" plugin')
        config.plugins.push(
          new InjectManifest({
            swDest: swDestPath,
            swSrc: swSrcPath,
            maximumFileSizeToCacheInBytes: 9765 * 1024,
          })
        )
      }

      console.log("> Progressive web app configuration complete")
      return config
    },
  }
}

const development = process.env.NODE_ENV !== "production"
module.exports = withWorkbox({ ...nextConfig, workbox: { swSrc: "worker.js", force: development } })

// module.exports = nextConfig
