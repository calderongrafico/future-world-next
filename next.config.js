/** @type {import('next').NextConfig} */

const path = require("path");

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "src/sass")],
    prependData: `@import "main.sass"`,
  },

  images: {
    // domains: ["cdn.shopify.com"], DEPRECATED
    remotePatterns: [{ hostname: "cdn.shopify.com", protocol: "https" }],
  },
};

module.exports = nextConfig;
