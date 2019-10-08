'use strick';
const chalk = require('chalk');
const utils = require('../../webpack/utils');

const { isEnvDev, isEnvProd } = utils.getNodeEnv();

// These sizes are pretty large. We'll warn for bundles exceeding them.
const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024;

module.exports = function (stats, reject, moduleName) {
	let {warnings, errors, assets} = stats.toJson({assets: true, warnings: true, errors: true});
	if(errors.length) {
		console.log(errors.join("\n\n"));
		isEnvProd && reject({message: `there are many errors, please fix them first.`});
		return false;
	}

	if(warnings.length) {
		console.log(chalk.yellow('Compiled with warnings.\n'));
		console.log(warnings.join("\n\n"));
	}

	assets.forEach(asset => {
		let color = asset.size >= WARN_AFTER_BUNDLE_GZIP_SIZE ? 'yellow' : 'gray';
		console.log(chalk[color](`${utils.fullExtend(utils.getFileSize(asset.size), 8)}   ${asset.name}`));
	});

	isEnvProd && console.log(chalk.blue(`Module 【${moduleName}】 packaging `),chalk.green(`successfully`), chalk.blue(`. time consuming:`),
		chalk.yellow(`${(stats.endTime - stats.startTime) / 1000}s\n\n`));

	isEnvDev && console.log(chalk.yellow("times consuming:"), `${(stats.endTime - stats.startTime) / 1000}s`);

	return true;
}