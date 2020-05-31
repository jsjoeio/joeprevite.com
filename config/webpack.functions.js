// required to get firebase-sdk imported into netlify functions
// see: https://github.com/netlify/netlify-lambda/issues/112#issuecomment-488644361
const nodeExternals = require('webpack-node-externals')
const dotEnv = require('dotenv-webpack')

module.exports = {
  externals: [nodeExternals()],
  plugins: [new dotEnv()],
}
