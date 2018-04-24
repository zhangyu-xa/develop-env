/**
 * Created by Zhangyu on 2018/4/23.
 */
const Utils = require("../utils");

module.exports = {
	//定义别名
	alias: {
		component: Utils.resolve("src/component")
	},
	//后缀名自动补全
	extensions: [".js", ".vue", ".json", ".css"],
	//依赖查找位置定义
	modules: [
		Utils.resolve("node_modules"),
		Utils.resolve("src")
	]
}