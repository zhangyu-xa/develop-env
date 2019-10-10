'use strict';

const proxyMiddleware = require("http-proxy-middleware");
const utils = require("../../webpack/utils");

const proxyConfig = utils.getSysConfig("proxy") || {
	"/dadaoapi": {
		target: 'http://www.daoele.com:8990',
		changeOrigin: true
	}
};

module.exports = function(app) {
	Object.keys(proxyConfig).map(key => {
		app.use(proxyMiddleware(key, proxyConfig[key]));
	});
};