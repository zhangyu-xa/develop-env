/**
 * Created by Zhangyu on 2018/4/23.
 */
const Utils = require("../utils");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = [
	new HtmlWebpackPlugin({
		filename: "index.html",
		template: "./index.html"
	}),
	new ExtractTextPlugin("app.css")
];