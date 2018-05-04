var webpack = require("webpack");
var path = require("path");

module.exports = {
    entry: {
        app:  ['./client/Client.jsx'],
        vendor: [
            'react', 'react-dom', 'react-router-dom', 'react-bootstrap', 'react-router-bootstrap',
            'whatwg-fetch', 'babel-polyfill',
        ],
    },
    output: {
        path: __dirname + './public',
        filename: 'app.bundle.js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' })
    ],
  
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react','es2015']
                }
            },
        ]
    },
    devServer: {
        port: 8000,
        contentBase: 'public',
        proxy: {
            '**': {
                target: 'http://localhost:3000'
            },
            historyApiFallback: true,
        }
    },
    devtool: 'source-map'
};