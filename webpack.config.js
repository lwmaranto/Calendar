"use strict";
module.exports = {
  entry: "./app/app",
  mode: "development",
  output: {
    path: __dirname,
    filename: "./public/bundle.js",
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};
