const path = require("path");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base.js");

// module.exports = {
const config = {
  entry: "./src/client/client.js",

  //tell webpack where to put output file generated
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
  },

  //tell webpack to run babel on every file. keep the config the same between client/server webpack files.
};

module.exports = merge(baseConfig, config);
