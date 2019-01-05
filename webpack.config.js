/*
 * Copyright (c) 2018 LEEDIUM.
 * This file is subject to the terms and conditions
 * defined in file 'LICENSE.txt', which is part of this
 * source code package.
 */

/**
 * @project occ-react-component
 * @file webpack.config.js
 * @company leedium
 * @createdBy davidlee
 * @contact david@leedium.com
 * @dateCreated 03/01/2019
 * @description  This configuration file splits modules defined by you into a bundle
 * that your occ-react-components can use as dependencies
 * https://github.com/leedium/occ-react-component
 *
 *
 */

const path = require("path");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const webpack = require("webpack");

const OCC_GLOBAL_FILE_NAME = "z4ma.globals.min.js";

module.exports = (env, argv) => ({
  entry:
    argv.mode === "production"
      ? {
          "vendor-prod": [
            "react",
            "react-hot-loader",
            "react-dom",
            "styled-components"
          ]
        }
      : {
          "vendor-dev": [
            "react",
            "react-hot-loader",
            "react-dom",
            "styled-components"
          ]
        },
  devtool: argv.mode === "production" ? "none" : "eval-source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ]
  },
  resolve: {
    modules: ["node_modules"],
    extensions: [".js", ".json"],
    alias: {
      "styled-components": path.resolve(
        __dirname,
        "node_modules",
        "styled-components"
      )
    }
  },
  stats: {
    colors: true,
    reasons: false,
    chunks: true
  },
  output: {
    path: path.resolve(__dirname, "./vendorDLL"),
    filename: "[name].dll.js",
    library: `/file/globals/${OCC_GLOBAL_FILE_NAME}`,
    libraryTarget: "amd"
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new webpack.DllPlugin({
      name: "[name]",
      path: `./vendorManifest/[name].json`
    })
  ],
  optimization: {
    minimize: argv.mode !== "production",
    splitChunks: {
      chunks: "all",
      maxInitialRequests: Infinity,
      minSize: 0,
      minChunks: 50
      // cacheGroups: {
      //     sharedBundles: {
      //         test: /[\\/]node_modules[\\/]/,
      //         name(module) {
      //             const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
      //             return `npm.${packageName.replace('@','')}`;
      //         }
      //     }
      // }
    }
  }
});
