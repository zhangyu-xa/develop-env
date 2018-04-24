/**
 * Created by Zhangyu on 2018/4/23.
 */
const Utils = require("../utils");

module.exports = {
	alias: {
		//别名
		component: Utils.resolve("src/component")
	},
	extensions: [".js", ".vue", ".json"]
}