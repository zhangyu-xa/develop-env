/**
 * Created by Zhangyu on 2018/4/20.
 */
const utils = require("./utils");

module.exports = {
	entry: {app: "./src/index.js"},
	output: {
		filename: "[name].js",
		path: utils.resolve("dist")
	},
	module: {
		rules: [{
			test: /\.jsx?/,
			include: [
				utils.resolve("src")
			],
			use: "babel-loader"
		}]
	}
};