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

console.log("process.argv:", process.argv);

// 校验操作
const tasks = process.argv.slice(2);
// 校验系统名字
process.env.sysName = tasks[1];

const chalk = require('chalk');
const compiler = require('./mixin/compiles');
let compiles = [];

if(tasks[0] === 'build') {
	compiles = compiler.getBuildCompiles(tasks);
} else if(tasks[0] === 'lib') {
	//编译库
	compiles = compiler.getLibCompiles(tasks);
}

if(compiles.length === 0) {
	console.log(chalk.red("No tasks to compile. \n"));
	process.exit(1);
}

// start compile, support muti-tasks
Promise.all(compiles).then(()  => {
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