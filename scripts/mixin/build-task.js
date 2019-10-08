'use strick';

const webpack = require('webpack');
const chalk = require('chalk');
const statsFormatter = require('./stats-formatter');
const utils = require('../../webpack/utils');

/**
 * single build task.
 * @param config - configuration
 * @param moduleName - 自定义模块名字
 * @returns {Promise<unknown>}
 */
module.exports = function (config, moduleName) {
	const compiler = webpack(config);
	//获取模块的名字
	moduleName = moduleName || utils.getFileNameByPath(config.entry);

	console.log(chalk.blue(`Module 【${moduleName}】 begins to pack...`));
	console.log(chalk.blue("entry =>", config.entry));
	console.log(chalk.blue("output =>", config.output.path));

	return new Promise((resolve, reject) => {
		compiler.run((err, stats) => {
			if (err) {
				if (!err.message) {
					reject(err);
				}
			}
			//格式化输出
			statsFormatter(stats, reject, moduleName);

			resolve(stats);
		});
	});
}