const fs = require('fs-extra');
const chalk = require('chalk');
const utils = require('../../webpack/utils');
const paths = require('../../webpack/paths');
const build = require('./build-task');

const webpackProdConfig = require('../../webpack/webpack.prod.conf');
const webpackLibConfig = require('../../webpack/webpack.lib.conf');
const config = require('../../webpack.config')[process.env.sysName];

/**
 * 正常编译，分析依赖
 * @returns {[Promise<unknown>]}
 */
function normalBuild() {
	//编译html
	console.log(chalk.cyan('\nCreating an optimized production build...\n\n'));

	// Remove all content but keep the directory so that
	// if you're in it, you don't end up in Trash
	fs.emptyDirSync(utils.getSysConfig("build.path") || paths.appBuild);
	// Merge with the public folder
	utils.copyPublicFolder(false, utils.getSysConfig("build.path"), file => file.indexOf(".html") < 0);

	return [build(webpackProdConfig)];
}

module.exports = {
	getBuildCompiles(tasks) {
		if (!process.env.sysName
			|| !config
			|| !config.subtasks
			|| config.subtasks.length === 0) return normalBuild();

		return [...normalBuild(), ...this.getLibCompiles(tasks)];
	},
	getLibCompiles(tasks) {
		if (!process.env.sysName) {
			console.log(chalk.red("You need to specify the name of the system. \n"));
			return [];
		}
		if (!config
			|| !config.subtasks
			|| config.subtasks.length === 0) return [];
		let compilers = [];
		tasks.slice(2).forEach(task => {

		});
		return compilers;
	}
};