const {smart} = require("webpack-merge");
const baseConf = require("./webpack.base.conf");

module.exports = smart(baseConf, {
	mode: "production"
});