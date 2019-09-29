const utils = require("./utils");
const webpack = require("webpack");
const {smart} = require("webpack-merge");
const baseConf = require("./webpack.base.conf");

module.exports = smart(baseConf, {
	mode: "development",
	devtool: 'cheap-module-source-map',
	output: {
		publicPath: utils.getPublicPath(),
		// This does not produce a real file. It's just the virtual path that is
		// served by WebpackDevServer in development. This is the JS bundle
		// containing code from all our entry points, and the Webpack runtime.
		filename: "static/js/[name].js",
		// There are also additional JS chunk files if you use code splitting.
		chunkFilename: "static/js/[name].chunk.js",
		// Add /* filename */ comments to generated require()s in the output.
		pathinfo: true
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
	module: {
		rules: []
	}
});

