/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
};
const withPlugins = require("next-compose-plugins");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const withPwa = require("next-pwa")({
  pwa: {
    dest: "public",
    disable: process.env.NODE_ENV === "development",
  },
});
const withLess = require("next-with-less")({
  lessLoaderOptions: {
    /* ... */
  },
});

module.exports = withPlugins([
  [withBundleAnalyzer],
  [withPwa],
  [withLess],
  nextConfig,

  // your other plugins here
]);
