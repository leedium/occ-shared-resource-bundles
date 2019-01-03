const path = require('path');
const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer");
const webpack = require('webpack');

const config = {
    entry: {
        "vendor": [
            // './app/index.js'
            // 'react',
            // 'react-hot-loader',
            // 'react-dom',
            'styled-components',
        ]
    },
    // devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    resolve: {
        modules: ["node_modules"],
        extensions: [".js", ".json"],
        alias: {
            'styled-components': path.resolve(__dirname,'node_modules', 'styled-components')
        }
    },
    stats: {
        // all: true,
        colors: true,
        reasons: true,
        chunks: true,
        // moduleTrace: true
    },
    output: {
        path: path.resolve(__dirname, './vendorBundle/global'),
        filename: "[name].dll.js",
        library: "/file/globals/z4ma.globals.min.js",
        libraryTarget: "amd"
    },
    // externals: {
    //     "styled-components": {
    //         commonjs: "styled-components",
    //         commonjs2: "styled-components",
    //         amd: "styled-components",
    //     }
    // },
    plugins: [
        new BundleAnalyzerPlugin(),
        new webpack.DllPlugin({
            name: '[name]',
            path: './build/library/[name].json'
        })
    ],
    optimization: {
        // runtimeChunk:{
        //     name:"sharedBundles"
        // },
        minimize: false,
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
            minChunks: 50,
            // cacheGroups: {
            //     sharedBundles: {
            //         test: /[\\/]node_modules[\\/]/,
            //         name(module) {
            //             const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            //             return `npm.${packageName.replace('@','')}`;
            //         }
            //     }
            // }
        },

    }
};

module.exports = config;



