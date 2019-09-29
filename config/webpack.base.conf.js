/**
 * Created by Zhangyu on 2019/9/20.
 */
const utils = require("./utils");
const paths = require('./paths');
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const getClientEnvironment = require('./env');
const InterpolateHtmlPlugin = require('./webpack-plugins/InterpolateHtmlPlugin');
const ModuleScopePlugin = require('./webpack-plugins/ModuleScopePlugin');
const PnpWebpackPlugin = require('pnp-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const { isEnvProd } = utils.getNodeEnv();
const imageInlineSizeLimit = parseInt(
	process.env.IMAGE_INLINE_SIZE_LIMIT || '10000'
);
// Get environment variables to inject into our app.
const env = getClientEnvironment(utils.getPublicUrl());
// style files regexes
const cssRegex = /\.css$/;
const lessRegex = /\.(less)$/;

module.exports = {
	entry: paths.appIndexJs,
	// Stop compilation early in production
	bail: isEnvProd,
	output: {
		// TODO: remove this when upgrading to webpack 5
		futureEmitAssets: true
	},
	plugins: [
		new HtmlWebpackPlugin(Object.assign(
			{},
			{
				inject: true,
				template: paths.appHtml,
			},
			isEnvProd
				? {
					minify: {
						removeComments: true,
						collapseWhitespace: true,
						removeRedundantAttributes: true,
						useShortDoctype: true,
						removeEmptyAttributes: true,
						removeStyleLinkTypeAttributes: true,
						keepClosingSlash: true,
						minifyJS: true,
						minifyCSS: true,
						minifyURLs: true,
					},
				}
				: undefined
		)),
		// Makes some environment variables available in index.html.
		// The public URL is available as %PUBLIC_URL% in index.html, e.g.:
		// <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
		// In production, it will be an empty string unless you specify "homepage"
		// in `package.json`, in which case it will be the pathname of that URL.
		// In development, this will be an empty string.
		new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
		// Makes some environment variables available to the JS code, for example:
		// if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
		// It is absolutely essential that NODE_ENV is set to production
		// during a production build.
		// Otherwise React will be compiled in the very slow development mode.
		new webpack.DefinePlugin(env.stringified),
		// Generate a manifest file which contains a mapping of all asset filenames
		// to their corresponding output file so that tools can pick it up without
		// having to parse `index.html`.
		new ManifestPlugin({
			fileName: 'asset-manifest.json',
			publicPath: utils.getPublicPath(),
			generate: (seed, files) => {
				const manifestFiles = files.reduce(function(manifest, file) {
					manifest[file.name] = file.path;
					return manifest;
				}, seed);

				return {
					files: manifestFiles,
				};
			}
		}),
		// Moment.js is an extremely popular library that bundles large locale files
		// by default due to how Webpack interprets its code. This is a practical
		// solution that requires the user to opt into importing specific locales.
		// You can remove this if you don't use Moment.js:
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
	],
	resolve: {
		//定义别名
		alias: {
			"component": utils.resolve("src/component")
		},
		//后缀名自动补全
		extensions: [".js", ".ts", ".json"],
		//依赖查找位置定义
		modules: [
			'node_modules',
			utils.resolve("node_modules"),
			utils.resolve("src")
		],
		plugins: [
			// Adds support for installing with Plug'n'Play, leading to faster installs and adding
			// guards against forgotten dependencies and such.
			PnpWebpackPlugin,
			// Prevents users from importing files from outside of src/ (or node_modules/).
			// This often causes confusion because we only process files within src/ with babel.
			// To fix this, we prevent you from importing files out of src/ -- if you'd like to,
			// please link the files into your node_modules/ and let module-resolution kick in.
			// Make sure your source files are compiled, as they will not be processed in any way.
			new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson])
		]
	},
	resolveLoader: {
		plugins: [
			// Also related to Plug'n'Play, but this time it tells Webpack to load its loaders
			// from the current package.
			PnpWebpackPlugin.moduleLoader(module)
		],
	},
	module: {
		strictExportPresence: true,
		rules: [
			// Disable require.ensure as it's not a standard language feature.
			{ parser: { requireEnsure: false } },
			// First, run the linter.
			// It's important to do this before Babel processes the JS.
			{
				test: /\.(js|mjs|jsx|ts|tsx)$/,
				enforce: 'pre',
				use: [
					require.resolve('eslint-loader')
				],
				include: paths.appSrc,
			},
			{
				// "oneOf" will traverse all following loaders until one will
				// match the requirements. When no loader matches it will fall
				// back to the "file" loader at the end of the loader list.
				oneOf: [
					// "url" loader works like "file" loader except that it embeds assets
					// smaller than specified limit in bytes as data URLs to avoid requests.
					// A missing `test` is equivalent to a match.
					{
						test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
						loader: require.resolve('url-loader'),
						options: {
							limit: imageInlineSizeLimit,
							name: 'static/media/[name].[hash:8].[ext]',
						}
					},
					// Process application JS with Babel.
					// The preset includes JSX, Flow, TypeScript, and some ESnext features.
					{
						test: /\.(js|mjs|jsx|ts|tsx)$/,
						include: paths.appSrc,
						loader: require.resolve('babel-loader'),
						options: {
							customize: require.resolve(
								'babel-preset-react-app/webpack-overrides'
							),
							plugins: [
								[
									require.resolve('babel-plugin-named-asset-import'),
									{
										loaderMap: {
											svg: {
												ReactComponent:
													'@svgr/webpack?-svgo,+titleProp,+ref![path]',
											}
										}
									}
								]
							],
							// This is a feature of `babel-loader` for webpack (not Babel itself).
							// It enables caching results in ./node_modules/.cache/babel-loader/
							// directory for faster rebuilds.
							cacheDirectory: true,
							// See #6846 for context on why cacheCompression is disabled
							cacheCompression: false,
							// minimize
							compact: isEnvProd
						},
					},
					// "postcss" loader applies autoprefixer to our CSS.
					// "css" loader resolves paths in CSS and adds assets as dependencies.
					// "style" loader turns CSS into JS modules that inject <style> tags.
					// In production, we use MiniCSSExtractPlugin to extract that CSS
					// to a file, but in development "style" loader enables hot editing
					// of CSS.
					{
						test: cssRegex,
						use: utils.getStyleLoaders({
							importLoaders: 1,
							sourceMap: isEnvProd && utils.isUseSourceMap(),
						}),
						// Don't consider CSS imports dead code even if the
						// containing package claims to have no side effects.
						// Remove this when webpack adds a warning or an error for this.
						sideEffects: true,
					},
					// Opt-in support for SASS (using .less extensions).
					// By default we support SASS Modules with the
					// extensions .module.scss or .module.sass
					{
						test: lessRegex,
						use: utils.getStyleLoaders(
							{
								importLoaders: 2,
								sourceMap: isEnvProd && utils.isUseSourceMap(),
							},
							'less-loader'
						),
						// Don't consider CSS imports dead code even if the
						// containing package claims to have no side effects.
						// Remove this when webpack adds a warning or an error for this.
						sideEffects: true,
					},
					// "file" loader makes sure those assets get served by WebpackDevServer.
					// When you `import` an asset, you get its (virtual) filename.
					// In production, they would get copied to the `build` folder.
					// This loader doesn't use a "test" so it will catch all modules
					// that fall through the other loaders.
					{
						loader: require.resolve('file-loader'),
						// Exclude `js` files to keep "css" loader working as it injects
						// its runtime that would otherwise be processed through "file" loader.
						// Also exclude `html` and `json` extensions so they get processed
						// by webpacks internal loaders.
						exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
						options: {
							name: 'static/media/[name].[hash:8].[ext]',
						},
					},
					// ** STOP ** Are you adding a new loader?
					// Make sure to add the new loader(s) before the "file" loader.
				]
			}
		]
	},
	// Some libraries import Node modules but don't use them in the browser.
	// Tell Webpack to provide empty mocks for them so importing them works.
	node: {
		module: 'empty',
		dgram: 'empty',
		dns: 'mock',
		fs: 'empty',
		http2: 'empty',
		net: 'empty',
		tls: 'empty',
		child_process: 'empty',
	},
	// Turn off performance processing because we utilize
	// our own hints via the FileSizeReporter
	performance: false
};