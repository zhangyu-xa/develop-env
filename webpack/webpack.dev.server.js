'use strict';

const utils = require('./utils');
const paths = require('./paths');
const fs = require('fs');

const port = parseInt(process.env.PORT, 10) || 80;
const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const host = process.env.HOST || '127.0.0.1';

module.exports = {
	port,
	publicPath: utils.getPublicPath(),
	hot: true,
	// By default WebpackDevServer serves physical files from current directory
	// in addition to all the virtual build products that it serves from memory.
	// This is confusing because those files won’t automatically be available in
	// production build folder unless we copy them. However, copying the whole
	// project directory is dangerous because we may expose sensitive files.
	// Instead, we establish a convention that only files in `public` directory
	// get served. Our build script will copy `public` into the `build` folder.
	// In `index.html`, you can get URL of `public` folder with %PUBLIC_URL%:
	// <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
	// In JavaScript code, you can access it with `process.env.PUBLIC_URL`.
	// Note that we only recommend to use `public` folder as an escape hatch
	// for files like `favicon.ico`, `manifest.json`, and libraries that are
	// for some reason broken when imported through Webpack. If you just want to
	// use an image, put it in `src` and `import` it from JavaScript instead.
	contentBase: paths.appPublic,
	// Reportedly, this avoids CPU overload on some systems.
	// https://github.com/facebook/create-react-app/issues/293
	// src/node_modules is not ignored to support absolute imports
	// https://github.com/facebook/create-react-app/issues/1065
	watchOptions: {
		ignored: utils.ignoredFiles(paths.appSrc),
	},
	// By default files from `contentBase` will not trigger a page reload.
	watchContentBase: true,
	// Enable gzip compression of generated files.
	compress: true,
	// Silence WebpackDevServer's own logs since they're generally not useful.
	// It will still show compile warnings and errors with this setting.
	clientLogLevel: 'info',
	// WebpackDevServer is noisy by default so we emit custom message instead
	// by listening to the compiler events with `compiler.hooks[...].tap` calls above.
	quiet: true,
	// Enable HTTPS if the HTTPS environment variable is set to 'true'
	https: protocol === 'https',
	host,
	progress: true,
	// proxy block, now we use http-proxy-middleware instead.
	proxy: {
		/*"/api" : {
			target: "https://www.baidu.com",
			changeOrigin: true
		}*/
	},
	// middleware extends
	before(app) {
		// proxy middleware
		console.log("\nprocess.env.ENABLE_MOCK:", process.env.ENABLE_MOCK);
		if (process.env.ENABLE_MOCK !== 'true' && fs.existsSync(paths.proxySetup)) {
			// This registers user provided middleware for proxy reasons
			require(paths.proxySetup)(app);
		}
		//mock middleware
		if (process.env.ENABLE_MOCK === 'true' && fs.existsSync(paths.mockSetup)) {
			// This registers user provided middleware for mock reasons
			require(paths.mockSetup)(app);
		}
	}
};