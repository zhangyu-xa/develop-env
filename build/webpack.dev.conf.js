const {smart} = require("webpack-merge");
const baseConf = require("./webpack.base.conf");
const confDevServer = require("./devserver");

module.exports = smart(baseConf, {
	mode: "development",
	devServer: confDevServer
});

