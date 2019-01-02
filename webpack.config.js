const path = require('path');
const webpack = require('webpack');

const config = {
    entry: {
        "sharedBundles": [
            'react',
            'react-dom',
            'styled-components'
        ]
    },
    module: {
        rules: [
            {
                test: /\.js|jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.less', '.css'],
        modules: [__dirname, 'node_modules']
    },
    output: {
        path: path.resolve(__dirname, './vendorBundle/global'),
        filename: "[name].dll.js",
        library: `/file/globals/z4ma.globals.min.js`,
        libraryTarget: "amd"
    },
    plugins: [
        new webpack.DllPlugin({
            name: '[name]',
            path: './build/library/[name].json'
        })
    ]
    // plugins:[
    //     new webpack.HashedModuleIdsPlugin()
    // ],
    // optimization: {
    //     splitChunks: {
    //         chunks: 'all',
    //         maxInitialRequests: Infinity,
    //         minSize: 0,
    //         minChunks: 10,
    //         name: '/file/globals/z4ma.globals.min.js',
    //         cacheGroups: {
    //             sharedBundles: {
    //                 // test: /[\\/]node_modules[\\/]/,
    //                 test: /[\\/]node_modules[\\/](react|react-dom|styled-components)[\\/]/,
    //                 // name(module) {
    //                 //     const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
    //                 //     return `npm.${packageName.replace('@','')}`;
    //                 // }
    //             }
    //         }
    //     }
    // }
};

module.exports = config;



