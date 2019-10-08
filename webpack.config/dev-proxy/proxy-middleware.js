'use strict';

const proxyMiddleware = require("http-proxy-middleware");
const utils = require("../../webpack/utils");

const proxyConfig = utils.getSysConfig("proxy") || {
	"/api": {
		target: 'http://58.49.28.186:58271'
	}
};

module.exports = function(app) {
	Object.keys(proxyConfig).map(key => {
		app.use(proxyMiddleware(key, proxyConfig[key]));
	});
};