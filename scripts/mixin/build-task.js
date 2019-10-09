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

	//console.log(chalk.blue(`Module 【${moduleName}】 begins to pack...`));

	return new Promise((resolve, reject) => {
		compiler.run((err, stats) => {
			if (err) {
				reject(err);
			}
			console.log(chalk.blue("entry =>", config.entry));
			console.log(chalk.blue("output =>", config.output.path + "\\" + config.output.filename));
			//格式化输出
			statsFormatter(stats, reject, moduleName);

			console.log(chalk.blue(`=============total:${process.env.TASKSNUM},  done:${process.env.TASKSDONENUM++}==================( ${Math.round(100*process.env.TASKSDONENUM/process.env.TASKSNUM)}% )\n\n`));

			resolve(stats);
		});
	});
}