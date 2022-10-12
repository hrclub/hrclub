/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: "mn",
    locales: ["en", "mn"],
  },
  interpolation: {
    skipOnVariables: false,
  },
  reloadOnPrerender: process.env.NODE_ENV === "development",
};
