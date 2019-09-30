'use strict';

const chalk = require('chalk');
const statsFormatter = require('./stats-formatter');

module.exports = function (compiler, config, moduleName) {
	let isRecompiling = false;
	return new Promise((resolve, reject) => {
		// Compilation completed
		compiler.hooks.done.tap("completed", stats => {
			if(!statsFormatter(stats, reject, moduleName)) {
				console.log(chalk.yellow('there are many errors, please fix them first.'));
			}
			console.log(chalk.green(`Module 【${moduleName}】 is ${isRecompiling ? 'recompiled': 'compiled'} successfully.\n`));
			!isRecompiling && resolve(stats);
		});
		// Recompiling
		compiler.hooks.watchRun.tap("ReCompiled", () => {
			isRecompiling = true;
			console.log(chalk.cyan(`Module 【${moduleName}】 is recompiled at ${new Date()}`));
		});
	});
}
