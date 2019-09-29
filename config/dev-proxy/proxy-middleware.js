'use strict';

const proxyMiddleware = require("http-proxy-middleware");

const proxyConfig = {
	"/api": {
		target: 'http://58.49.28.186:58271'
	},
	"/staticResource": {
		target: 'http://58.49.28.186:58271'
	},
	"/socket.io": {
		target: 'http://58.49.28.186:58271',
		ws: true
	}
};

module.exports = function(app) {
	Object.keys(proxyConfig).map(key => {
		app.use(proxyMiddleware(key, proxyConfig[key]));
	});
};