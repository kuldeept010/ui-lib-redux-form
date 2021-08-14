const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  module: {
    rules: [
      // SCSS has different line endings than SASS
      // and needs a semicolon after the import.
      {
        test: /\.scss$/,
        use: [
          "css-loader",
          {
            loader: "sass-loader",
            // Requires sass-loader@^9.0.0
            options: {
              // This is the path to your variables
              additionalData: "@import './src/variables.scss';"
            }
          }
        ]
      }
    ]
  }
};
