'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
	throw err;
});

// read the environment variables
require('../config/env');

const webpack = require('webpack');
const chalk = require('chalk');
const webpackDevServer = require('webpack-dev-server');
const utils = require('../config/utils');
const webpackDevConfig = require('../config/webpack.dev.conf');
const devServerConfig = require('../config/webpack.dev.server');
const checkStatus = require('./mixin/dev-status');

//获取模块的名字
const moduleName = utils.getFileNameByPath(webpackDevConfig.entry);

console.log(chalk.blue(`Module 【${moduleName}】 begins to compiling...`));
console.log(chalk.blue("entry =>", webpackDevConfig.entry));
console.log(chalk.blue("output =>", webpackDevConfig.output.path || "not set"));

//开始编译
let compiler = webpack(webpackDevConfig);
//创建服务
let server = new webpackDevServer(compiler, devServerConfig);

//检查编译状态
checkStatus(compiler, webpackDevConfig, moduleName).then(stats => {
	console.log(chalk.cyan('Starting the development server...\n'));
	// start sever on watch
	server.listen(devServerConfig.port, devServerConfig.host, err => {
		if (err) {
			console.log(err);
			process.exit(1);
			return;
		}
		console.log(chalk.cyan("\nDevelopment server is started successfully.\n\n"));
	});

}, err => {
	if (err && err.message) {
		console.log(chalk.yellow(err.message));
	}
	console.log(chalk.red('Failed to compile.\n'));
	process.exit(1);
}).catch(err => {
	if (err && err.message) {
		console.log(err.message);
	}
	process.exit(1);
})