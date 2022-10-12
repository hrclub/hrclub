const path = require("path");
const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  i18n,
  webpack(config, options) {
    if (config.mode === "development") {
      const { I18NextHMRPlugin } = require("i18next-hmr/plugin");

      config.plugins.push(
        new I18NextHMRPlugin({
          localesDir: path.resolve(__dirname, "public/locales"),
        })
      );
    }

    return config;
  },
};
