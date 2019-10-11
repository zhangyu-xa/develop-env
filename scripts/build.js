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
const paths = require('../webpack/paths');

let modulesManifest = {};

if(tasks[0] === 'build') {
	// build html
	compiler.getBuildCompiles(tasks, build);
} else if(tasks[0] === 'lib') {
	if (process.env.BUILD_LIBS !== 'true') {
		console.log('Do not need to package libs.');
		return;
	}
	// 编译库
	compiler.getLibCompiles(tasks, build);
	// 配置库文件
	utils.event.on("manifest", json => {
		modulesManifest = Object.assign(modulesManifest, json);
	});
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
		if(tasks[0] === "lib") {
			utils.writeFile(`${paths.appWebpackConfig}/modules-manifest.json`, JSON.stringify(modulesManifest, null, 2));
		}
		// Merge with the public folder
		if(tasks[0] === 'build') {
			utils.copyPublicFolder(false, utils.getSysConfig("build.path"), file => file.indexOf(".html") < 0);
		}

		console.log(chalk.green(`${tasks[0] === "lib" ? 'Packaged' : 'build'} successfully.\n`));
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
