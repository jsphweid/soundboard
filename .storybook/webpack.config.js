const path = require('path')

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('awesome-typescript-loader')
      },
      // Optional
      {
        loader: require.resolve('react-docgen-typescript-loader')
      }
    ]
  })
  config.module.rules[2].use[1].options = {
    ...config.module.rules[2].use[1].options,
    modules: true,
    camelCase: true,
    sourceMap: true
  }

  config.resolve.extensions.push('.ts', '.tsx')
  return config
}
