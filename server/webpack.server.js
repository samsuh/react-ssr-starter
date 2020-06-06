const path = require("path");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base.js");
const webpackNodeExternals = require("webpack-node-externals");

// module.exports = { // no longer immediately exporting, but this will merge with the baseConfig and be exported later

const config = {
  // inform webpack we're building a bundle for nodeJS rather than for browser (default behavior)
  // will try not to include native modules
  target: "node",

  //tell webpack the root file/ entry point for server app
  entry: "./src/index.js",

  //tell webpack where to put output file generated
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
  },

  externals: [webpackNodeExternals()],
};

//tell webpack to run babel on every file
module.exports = merge(baseConfig, config);
