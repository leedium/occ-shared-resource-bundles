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
const package = require("./package");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const webpack = require("webpack");

const OCC_GLOBAL_FILE_NAME_PROD = `vendor-prod.${package.version}.dll.min.js`;
const OCC_GLOBAL_FILE_NAME_DEV = `vendor-dev.${package.version}.dll.min.js`;

module.exports = (env, argv) => ({
  entry:
    argv.mode === "production"
      ? {
          "vendor-prod": [
            "axios",
            "react",
            "react-hot-loader",
            "react-dom",
            "styled-components",
            "classnames"
          ]
        }
      : {
          "vendor-dev": [
            "axios",
            "react",
            "react-hot-loader",
            "react-dom",
            "styled-components",
            "classnames"
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
    filename: `[name].${package.version}.dll.js`,
    library: `/file/globals/${argv.mode === "production" ? OCC_GLOBAL_FILE_NAME_PROD : OCC_GLOBAL_FILE_NAME_DEV}`,
    libraryTarget: "amd"
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new webpack.DllPlugin({
      name: "[name]",
      path: `./vendorManifest/[name].${package.version}.json`
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
