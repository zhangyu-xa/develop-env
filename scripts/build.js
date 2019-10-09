'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
	throw err;
});

// Ensure environment variables are read.
require('../webpack/env');

// 校验操作
const tasks = process.argv.slice(2);
// 校验系统名字
process.env.sysName = tasks[1];

const chalk = require('chalk');
const compiler = require('./mixin/compiles');
const utils = require('../webpack/utils');

if(tasks[0] === 'build') {
	compiler.getBuildCompiles(tasks, build);
} else if(tasks[0] === 'lib') {
	//编译库
	compiler.getLibCompiles(tasks, build);
}

function build(compiles) {
	if(compiles.length === 0) {
		console.log(chalk.red("No tasks to be compiled. \n"));
		process.exit(0);
	}

	process.env.TASKSNUM = compiles.length;
	process.env.TASKSDONENUM = 0;

	// start compile, support muti-tasks
	Promise.all(compiles).then(()  => {
		// Merge with the public folder
		tasks[0] === 'build' && utils.copyPublicFolder(false, utils.getSysConfig("build.path"), file => file.indexOf(".html") < 0);

		console.log(chalk.green('Packaged successfully.\n'));
	}, err => {
		if (err && err.message) {
			console.log(chalk.yellow(err.message));
		}
		console.log(chalk.red('Failed to package.\n'));
		process.exit(1);
	}).catch(err => {
		if (err && err.message) {
			console.log(err.message);
		}
		process.exit(1);
	});
}
