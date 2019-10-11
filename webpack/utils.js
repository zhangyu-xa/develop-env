/**
 * Created by Zhangyu on 2018/4/20.
 */
const path = require("path");
const postcssNormalize = require('postcss-normalize');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const fs = require('fs-extra');
const EventEmitter = require('events').EventEmitter;
const paths = require("./paths");

module.exports = {
	// get node environment.
	getNodeEnv() {
		return {
			isEnvDev: process.env.NODE_ENV === 'development',
			isEnvProd: process.env.NODE_ENV === 'production'
		}
	},
	/**
	 * 格式化工程中的路径
	 * @param dir - 待格式化的路径
	 * @returns {string|*}
	 */
	resolve(dir) {
		if(!dir) return undefined;
		return path.join(__dirname, "..", dir)
	},
	/**
	 * 过滤掉文件的正则表达式，devServer的watchOptions使用
	 * @param dir - 待过滤掉的路径
	 * @returns {RegExp} - 返回正则表达式
	 */
	ignoredFiles(dir) {
		if (typeof dir !== 'string') {
			throw new TypeError('Expected a string');
		}
		let matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
		return new RegExp(
			`^(?!${
				path.normalize(dir + '/').replace(/[\\]+/g, '/').replace(matchOperatorsRe, '\\$&')
			}).+/node_modules/`,
			'g'
		);
	},
	// common function to get style loaders
	getStyleLoaders(cssOptions, preProcessor) {
		const {isEnvDev, isEnvProd} = this.getNodeEnv();
		const loaders = [
			isEnvDev && require.resolve('style-loader'),
			isEnvProd && {
				loader: MiniCssExtractPlugin.loader
			},
			{
				loader: require.resolve('css-loader'),
				options: cssOptions,
			},
			{
				// Options for PostCSS as we reference these options twice
				// Adds vendor prefixing based on your specified browser support in
				// package.json
				loader: require.resolve('postcss-loader'),
				options: {
					// Necessary for external CSS imports to work
					// https://github.com/facebook/create-react-app/issues/2677
					ident: 'postcss',
					plugins: () => [
						require('postcss-flexbugs-fixes'),
						require('postcss-preset-env')({
							autoprefixer: {
								flexbox: 'no-2009',
							},
							stage: 3,
						}),
						// Adds PostCSS Normalize as the reset css with default options,
						// so that it honors browserslist config in package.json
						// which in turn let's users customize the target behavior as per their needs.
						postcssNormalize(),
					],
					sourceMap: cssOptions.sourceMap,
				},
			},
		].filter(Boolean);
		if (preProcessor) {
			loaders.push(
				{
					loader: require.resolve('resolve-url-loader'),
					options: {
						sourceMap: cssOptions.sourceMap,
					}
				},
				{
					loader: require.resolve(preProcessor),
					options: {
						sourceMap: cssOptions.sourceMap,
					}
				}
			);
		}
		return loaders;
	},
	// Webpack uses `publicPath` to determine where the app is being served from.
	// It requires a trailing slash, or the file assets will get an incorrect path.
	// In development, we always serve from the root. This makes config easier.
	getPublicPath() {
		const {isEnvDev, isEnvProd} = this.getNodeEnv();
		return isEnvProd ? paths.servedPath : isEnvDev && '/';
	},
	// `publicUrl` is just like `publicPath`, but we will provide it to our app
	// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
	// Omit trailing slash as %PUBLIC_URL%/xyz looks better than %PUBLIC_URL%xyz.
	getPublicUrl() {
		const {isEnvDev, isEnvProd} = this.getNodeEnv();
		return isEnvProd ? this.getPublicPath().slice(0, -1) : isEnvDev && '';
	},
	// Source maps are resource heavy and can cause out of memory issue for large source files.
	isUseSourceMap() {
		return process.env.GENERATE_SOURCEMAP !== 'false';
	},
	// copy files before build
	copyPublicFolder(from, dist, filterCbFun) {
		fs.copySync(from || paths.appPublic, dist || paths.appBuild, {
			dereference: true,
			filter: filterCbFun || (file => file !== paths.appHtml),
		});
	},
	/**
	 * 根据文件路径获取
	 * @param filePath - 文件路径
	 * @returns {string} - 文件名
	 */
	getFileNameByPath(filePath) {
		return filePath.substring(filePath.lastIndexOf("\\") + 1, filePath.lastIndexOf("."));
	},
	/**
	 * 获取编译文件大小
	 * @param size - 文件大小（B）
	 * @returns {string}
	 */
	getFileSize(size) {
		if (size < 1024) return size + "B";
		let KBSize = parseFloat(size / 1024).toFixed(2);
		if (KBSize < 1024) return KBSize + "KB";
		let MBSize = parseFloat(KBSize / 1024).toFixed(2);
		return MBSize + "MB";
	},
	/**
	 * 根据指定长度，补全字符串
	 * @param str - 待补全的字符串
	 * @param length - 参照长度
	 * @returns {string}
	 */
	fullExtend(str, length) {
		return Array(length - str.length).fill(" ").join("") + str;
	},
	/**
	 * 获取系统自定义配置中的变量
	 * @param key - 对应的键值
	 */
	getSysConfig(key) {
		const config = require('../webpack.config')[process.env.sysName];
		if(!config) return undefined;
		return key.split(".").reduce((res, cur) => {
			if(!res) return undefined;
			return res[cur] || undefined;
		}, config);
	},
	readdir:function(path){
		return new Promise((resolve, reject) => {
			fs.readdir(path, 'utf8', function(err, data) {
				err ? reject(err) : resolve(data);
			});
		});
	},
	readFile: function(path) {
		return new Promise((resolve, reject) => {
			fs.readFile(path, 'utf8', function(err, data) {
				err ? reject(err) : resolve(data);
			});
		});
	},
	writeFile: function(path, data) {
		return new Promise((resolve, reject) => {
			fs.writeFile(path, data, 'utf-8', function(err) {
				err ? reject(err) : resolve();
			});
		});
	},
	mkdir: function(path) {
		return new Promise((resolve, reject) => {
			fs.mkdir(path, { recursive: true }, err => {
				err ? reject(err) : resolve();
			});
		});
	},
	isFile(path) {
		return fs.existsSync(path) && fs.statSync(path).isFile();
	},
	isDir(path) {
		return fs.existsSync(path) && fs.statSync(path).isDirectory();
	},
	event: new EventEmitter()
};