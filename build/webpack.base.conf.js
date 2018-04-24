/**
 * Created by Zhangyu on 2018/4/20.
 */
const Utils = require("./utils");
const ConfRules = require("./modules/rules");
const ConfPlugin = require("./modules/plugins");
const ConfResolve = require("./modules/resolve");

module.exports = {
	entry: {app: "./src/index.js"},
	output: {
		filename: "[name].js",
		path: Utils.resolve("dist")
	},
	plugins: ConfPlugin,
	module: {
		rules: ConfRules
	},
	resolve: ConfResolve
};