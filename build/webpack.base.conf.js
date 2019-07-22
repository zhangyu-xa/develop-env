/**
 * Created by Zhangyu on 2018/4/20.
 */
const Utils = require("./utils");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry: {app: "./src/index.ts"},
	output: {
		publicPath: "",
		filename: "[name].js",
		path: Utils.resolve("dist")
	},
	plugins: [
		new webpack.DefinePlugin({
			version: JSON.stringify("0.0.1")
		}),
		new HtmlWebpackPlugin({
			filename: "index.html",
			template: "./index.html"
		}),
		new ExtractTextPlugin("app.css")
	],
	resolve: {
		//定义别名
		alias: {},
		//后缀名自动补全
		extensions: [".js", ".ts", ".json", ".css", ".tsx"],
		//依赖查找位置定义
		modules: [
			Utils.resolve("node_modules"),
			Utils.resolve("src")
		]
	},
	module: {
		rules: [{
				test: /\.tsx?$/,
				loader: "awesome-typescript-loader"
			}, {
				test: /\.js$/,
				include: [
					Utils.resolve("src")
				],
				use: "babel-loader"
			}]
	}
};