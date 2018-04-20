/**
 * Created by Zhangyu on 2018/4/20.
 */
const path = require("path");

module.exports = {
	/**
	 * 格式化工程中的路径
	 * @param dir - 待格式化的路径
	 * @returns {string|*}
	 */
	resolve (dir) {
		return path.join(__dirname, "..", dir)
	}
};