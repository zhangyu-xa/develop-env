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
require('../config/env');

const chalk = require('chalk');
const fs = require('fs-extra');
const Utils = require('../config/utils');
const paths = require('../config/paths');
const webpackProdConfig = require('../config/webpack.prod.conf');
const build = require('./mixin/build-task');

console.log(chalk.cyan('Creating an optimized production build...\n\n'));

// Remove all content but keep the directory so that
// if you're in it, you don't end up in Trash
fs.emptyDirSync(paths.appBuild);
// Merge with the public folder
Utils.copyPublicFolder();
// start compile, support muti-tasks
Promise.all([
	build(webpackProdConfig)
]).then(stats  => {
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