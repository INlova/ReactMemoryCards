﻿/// <binding ProjectOpened='Watch - Development' />

const path = require("path");
const WebpackNotifierPlugin = require("webpack-notifier");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        app: ["./src/app.js", "./src/styles/main.scss"]
    },
    output: {
        filename: "[name].js",
        path: path.join(__dirname, "./dist")
    },
    resolve: {
        extensions: [".js", ".jsx", ".scss"]
    },
    devtool: "inline-source-map",
    devServer: {
        contentBase: ".",
        host: "localhost",
        port: 9000
    },
    module: {
        rules: [
			{
			    test: /\.jsx?$/,
			    exclude: /node_modules/,
			    loader: "babel-loader",
			    query: { presets: ["es2015", "react"] }
			},
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "sass-loader"],
                    publicPath: "./dist/"
                })
            }
        ]
    },
    plugins: [
            new ExtractTextPlugin({ filename: "main.css" }),
            new WebpackNotifierPlugin()
    ]
};