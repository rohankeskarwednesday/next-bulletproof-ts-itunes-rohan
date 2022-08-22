module.exports = {
  plugins: [
    "postcss-flexbugs-fixes",
    [
      "postcss-preset-env",
      {
        autoprefixer: {
          flexbox: "no-2009",
        },
        stage: 3,
        features: {
          "custom-properties": false,
        },
      },
    ],
    [
      "@fullhuman/postcss-purgecss",
      {
        content: [
          "./containers/**/*.{js,jsx,ts,tsx}",
          "./features/**/*.{js,jsx,ts,tsx}",
          "./pages/**/*.{js,jsx,ts,tsx}",
        ],
        // defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
        defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
        safelist: ["html", "body"],
      },
    ],
  ],
};
