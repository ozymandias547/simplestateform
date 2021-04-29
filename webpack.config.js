const path = require("path")

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: './src/index.js',

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ]
  },
  output: {
    filename: "index.js",
    publicPath: "./",
    libraryTarget: "umd",
    globalObject: "this",
    path: path.resolve(__dirname, "./dist")
  },
  mode : devMode ? 'development' : 'production'
}
