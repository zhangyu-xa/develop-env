const Utils = require("./utils");
const webpack = require("webpack");
const {smart} = require("webpack-merge");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const baseConf = require("./webpack.base.conf");
const confDevServer = require("./devserver");

module.exports = smart(baseConf, {
	mode: "development",
	devServer: confDevServer,
	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin()
	],
	module: {
		rules: [{
			test: /\.css$/,
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
			test: /\.(png|jpe?g|gif|svg|webp)$/i,
			use: [{
				loader: "file-loader",
				options: {}
			}]
		}]
	}
});

