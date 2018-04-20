/**
 * Created by Zhangyu on 2018/4/20.
 */
const Utils = require("./utils");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: {app: "./src/index.js"},
	output: {
		filename: "[name].js",
		path: Utils.resolve("dist")
	},
	plugins:[
		new HtmlWebpackPlugin({
			filename: "index.html",
			template: "./index.html"
		})
	],
	module: {
		rules: [{
			test: /\.jsx?/,
			include: [
				Utils.resolve("src")
			],
			use: "babel-loader"
		}]
	}
};