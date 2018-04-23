/**
 * Created by Zhangyu on 2018/4/23.
 */
const Utils = require("../utils");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = [{
	test: /\.js$/,
	include: [
		Utils.resolve("src")
	],
	use: "babel-loader"
}, {
	test: /\.css$/,
	include: [
		Utils.resolve("src")
	],
	use: ExtractTextPlugin.extract({
		fallback: "style-loader",
		use: "css-loader"
	})
}, {
	test: /\.less$/,
	include: [
		Utils.resolve("src")
	],
	use: ExtractTextPlugin.extract({
		fallback: "style-loader",
		use: [
			"css-loader",
			"less-loader"
		]
	})
}, {
	test: /\.(png|jpg|gif)$/,
	use: [{
		loader: "file-loader",
		options: {}
	}]
}];