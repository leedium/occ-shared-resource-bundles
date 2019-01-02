const path = require('path');
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const webpack = require('webpack');

const config = {
    entry: {
        "file": [
            './app/index.js'
        ]
    },
    // entry: {
    //     "sharedBundles": [
    //         'react',
    //         'react-dom',
    //         'styled-components'
    //     ]
    // },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
        ]
    },
    output: {
        path: path.resolve(__dirname, './vendorBundle/global'),
        filename: "[name].dll.js",
        library: "/file/globals/z4ma.globals.min.js",
        libraryTarget: "amd"
    },
    plugins: [
        new BundleAnalyzerPlugin(),
        new webpack.DllPlugin({
            name: '[name]',
            path: './build/library/[name].json'
        })
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
            minChunks: 10
        }
    }
};

module.exports = config;



