const path = require('path');
const webpack = require('webpack');

const config = {
    entry: "./app/index.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].bundle.js"
    }
};


module.exports = config;



