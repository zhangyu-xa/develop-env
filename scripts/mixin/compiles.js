const fs = require('fs-extra');
const chalk = require('chalk');
const {smart} = require("webpack-merge");
const utils = require('../../webpack/utils');
const paths = require('../../webpack/paths');
const build = require('./build-task');

const webpackProdConfig = require('../../webpack/webpack.prod.conf');
const webpackLibConfig = require('../../webpack/webpack.lib.conf');
const config = require('../../webpack.config')[process.env.sysName];
const defaultTaskConfig = require('../../webpack.config/default.libs.compile.json');

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

	return [build(webpackProdConfig)];
}

/**
 * 格式化打包任务的配置参数
 * @param tasks
 * @returns {*|Uint8Array|BigInt64Array|any[]|Float64Array|Int8Array|Float32Array|Int32Array|Uint32Array|Uint8ClampedArray|BigUint64Array|Int16Array|Uint16Array|*[]}
 */
function formateTaskConfigs(tasks) {
	let taskConfigs = config && config.subtasks && config.subtasks.length !== 0 ? smart(defaultTaskConfig, config.subtasks) : defaultTaskConfig;
	//如果库编译任务为空，则编译默认的库配置文件，否则编译指定的库任务
	if (tasks.length !== 0) {
		return tasks.map(key => {
			if (Object.keys(taskConfigs).indexOf(key) >= 0) {
				taskConfigs[key].name = key;
				return taskConfigs[key];
			} else console.log(chalk.red(`Can not find config of task:${key}. \n`));
		});
	} else {
		return Object.keys(taskConfigs).map(key => {
			taskConfigs[key].name = key;
			return taskConfigs[key];
		});
	}
}

/**
 * 库编译中，按照每一个组件/模块进行单独打包
 * @param task - 任务参数
 * @returns {Promise<void>}
 */
async function multiPackagesLib(task) {
	let libAbsPath = utils.resolve(task.path);
	let files = await utils.readdir(libAbsPath);

	return files.filter(file => file !== "index.js").map(name => {
		let filePath = libAbsPath + '\\' + name;
		return build(webpackLibConfig(Object.assign({}, task, {
			input: `${task.path}${name}${utils.isDir(filePath) ? `/index.js` : ``}`,
			output: `${task.output}${name}${utils.isDir(filePath) ? `/${name}.js` : ``}`
		})), name);
	});
}

/**
 * 库编译中，按库整体达成一个包
 * @param task - 任务参数
 * @returns {Promise<unknown>}
 */
function onePackageLib(task, errTasks) {
	if (!task.output) {
		errTasks.push({name: task.name, message: `库【${task.name}】没有指定编译后的文件路径和名字`});
		return;
	}
	return build(webpackLibConfig(Object.assign({}, task, {
		input: `${task.path}index.js`
	})), task.name);
}


async function readConfig() {
	let result = await Promise.all(readArr);
	let json = { baseComponent: {}, businessComponent: {} };
	result[0].forEach(dir => {
		json.baseComponent[dir] = {
			input: `src/components/${dir}/index.js`,
			output: `/${filePath}/js/baseComponent/${dir}/${dir}.js`,
			isBaseComponent: true
		};
	});
	result[1].forEach(dir => {
		json.businessComponent[dir] = {
			input: `src/businessComponents/${dir}/index.js`,
			output: `/${filePath}/js/businessComponents/${dir}/${dir}.js`,
			isBusinessComponent: true
		};
	});
	utils.writeFile(
		paths.resolveApp('config/components.config.js'),
		`module.exports = ${JSON.stringify(json, null, 2)}`
	).then(() => {
		console.log('create file success in config/component.config.js')
	});
}

module.exports = {
	/**
	 * 编译主工程
	 * @param tasks - 参数
	 * @param callback - 回调函数
	 */
	getBuildCompiles(tasks, callback) {
		if (process.env.BUILD_LIBS !== 'false') {
			this.getLibCompiles(tasks, compilers => {
				callback([...compilers, ...normalBuild()]);
			});
			return;
		}
		callback(normalBuild());
	},
	/**
	 * 编译库
	 * @param tasks - 参数
	 * @param callback - 回调函数
	 * @returns {Promise<void>}
	 */
	async getLibCompiles(tasks, callback) {
		tasks = !config ? tasks.slice(1) : tasks.slice(2);
		const taskConfigs = formateTaskConfigs(tasks);

		console.log("\nLibrary package tasks:", tasks);
		console.log("\nLibrary package configuration:\n", taskConfigs, "\n\n");

		const compilers = [], errTasks = [];

		for (let task of taskConfigs) {
			if (task.entry === 'multi') {
				// 独立打包
				compilers.push(... await multiPackagesLib(task, errTasks));
			} else {
				// 统一打包
				compilers.push(onePackageLib(task, errTasks));
			}
		};
		callback(compilers, errTasks);
	}
};