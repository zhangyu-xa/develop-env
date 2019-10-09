const paths = require("./paths");
const utils = require("./utils");
const {smart} = require("webpack-merge");
const isWsl = require('is-wsl');
const TerserPlugin = require('terser-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const baseConf = require("./webpack.base.conf");

module.exports = function (config) {
	//不在需要那么多plugins
	baseConf.plugins = [];

	return smart(baseConf, {
		mode: 'production',
		devtool: 'source-map',
		entry: utils.resolve(config.input),
		output: {
			// The build folder.
			path: utils.getSysConfig("build.path") || paths.appBuild,
			// There will be one main bundle, and one file per asynchronous chunk.
			// In development, it does not produce real files.
			filename: config.output,
			// Webpack uses `publicPath` to determine where the app is being served from.
			// It requires a trailing slash, or the file assets will get an incorrect path.
			// In development, we always serve from the root. This makes config easier.
			// We inferred the "public path" (such as / or /my-project) from homepage.
			// We use "/" in development.
			publicPath: utils.getSysConfig("build.publicPath") || utils.getPublicPath(),
			library: config.library,
			libraryExport: 'default',
			libraryTarget: config.libraryTarget, // 通用模块定义
			umdNamedDefine: true,
			// Add /* filename */ comments to generated require()s in the output.
			pathinfo: false
		},
		optimization: {
			minimize: true,
			minimizer: [
				// This is only used in production mode
				new TerserPlugin({
					terserOptions: {
						parse: {
							// We want terser to parse ecma 8 code. However, we don't want it
							// to apply any minification steps that turns valid ecma 5 code
							// into invalid ecma 5 code. This is why the 'compress' and 'output'
							// sections only apply transformations that are ecma 5 safe
							ecma: 8,
						},
						compress: {
							ecma: 5,
							warnings: false,
							// Disabled because of an issue with Uglify breaking seemingly valid code:
							comparisons: false,
							// Disabled because of an issue with Terser breaking valid code:
							inline: 2,
						},
						mangle: {
							safari10: true,
						},
						output: {
							ecma: 5,
							comments: false,
							// Turned on because emoji and regex is not minified properly using default
							ascii_only: true,
						},
					},
					// Use multi-process parallel running to improve the build speed
					// Default number of concurrent runs: os.cpus().length - 1
					// Disabled on WSL (Windows Subsystem for Linux) due to an issue with Terser
					parallel: !isWsl,
					// Enable file caching
					cache: true,
					sourceMap: utils.isUseSourceMap(),
				}),
				// This is only used in production mode
				new OptimizeCSSAssetsPlugin({
					cssProcessorOptions: {
						parser: safePostCssParser,
						map: utils.isUseSourceMap()
							? {
								// `inline: false` forces the sourcemap to be output into a
								// separate file
								inline: false,
								// `annotation: true` appends the sourceMappingURL to the end of
								// the css file, helping the browser find the sourcemap
								annotation: true,
							}
							: false,
					},
				}),
			]
		},
		plugins: [].concat([
			new MiniCssExtractPlugin({
				filename: 'static/css/[name]/[name].css'
			}),
			// Generate a manifest file which contains a mapping of all asset filenames
			// to their corresponding output file so that tools can pick it up without
			// having to parse `index.html`.
			new ManifestPlugin({
				fileName: 'asset-manifest.json',
				publicPath: utils.getPublicPath(),
				generate: (seed, files) => {
					const manifestFiles = files.reduce(function (manifest, file) {
						manifest[file.name] = file.path;
						return manifest;
					}, seed);

					return {
						files: manifestFiles,
					};
				}
			})
		], utils.getSysConfig("plugins") || []),
		module: {
			rules: utils.getSysConfig("rules") || []
		}
	});
};