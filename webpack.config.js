const { resolve } = require("path");
const webpack = require("webpack");

module.exports = {

    entry: {
        app: "./src/js/app.js",
        vendors: ["jquery"]
    },

    output: {
        path: resolve(__dirname, "src/dev/"),
        filename: "[name].js"
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["es2015"]
                    }
                }
            },
            {
                test: /\.hbs$/,
                exclude: /node_modules/,
                use: {
                    loader: "handlebars-loader"
                }
            }
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendors"
        })
    ]

};