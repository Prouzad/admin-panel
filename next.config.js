const nextTranslate = require('next-translate-plugin')
const { defaultLocale, locales } = require('./i18n.json')

const config = {
  reactStrictMode: false,
  i18n: {
    defaultLocale,
    locales,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            prettier: false,
            svgo: true,
            svgoConfig: {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: {
                      removeViewBox: false,
                    },
                  },
                },
              ],
            },
            titleProp: true,
          },
        },
      ],
    })
    return config
  },
}

module.exports = nextTranslate(config)
