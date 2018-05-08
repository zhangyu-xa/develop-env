const Utils = require("./utils");
const {smart} = require("webpack-merge");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const baseConf = require("./webpack.base.conf");

module.exports = smart(baseConf, {
	mode: "production",
	plugins: [],
	module: {
		rules: [{
			test: /\.css$/,
			include: [
				Utils.resolve("src")
			],
			use: ExtractTextPlugin.extract({
				fallback: "style-loader",
				use: [{
					loader: "css-loader",
					options: {minimize: true}
				},
					"less-loader"
				]
			})
		}, {
			test: /\.less$/,
			include: [
				Utils.resolve("src")
			],
			use: ExtractTextPlugin.extract({
				fallback: "style-loader",
				use: [{
					loader: "css-loader",
					options: {minimize: true}
				},
					"less-loader"
				]
			})
		}, {
			test: /\.(png|jpe?g|gif|svg|webp)$/i,
			use: [/*{
				loader: "url-loader",
				options: {
					limit: 8192
				}
			},*/ {
				loader: "file-loader",
				options: {}
			}, {
				loader: "image-webpack-loader",
				options: {
					mozjpeg: {
						progressive: true,
						quality: 65
					},
					optipng: {enabled: false},
					pngquant: {
						quality: "65-90",
						speed: 4
					},
					gifsicle: {
						interlaced: false
					},
					webp: {
						quality: 75
					}
				}
			}]
		}]
	}
});