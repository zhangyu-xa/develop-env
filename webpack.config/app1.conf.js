const utils = require("../webpack/utils");
const paths = require('../webpack/paths');

module.exports = {
	entry: utils.resolve("src/index.js"),
	output: {},
	build: {
		path: paths.appBuild + "\\app1"
	},
	proxy: {
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
	},
	subtasks: {
		"components": {
			"path": "src/components/",
			"entry": "multi",
			"output": "static/js/components/",
			"library": "[name]",
			"libraryTarget": "umd"
		},
		"utils": {
			"path": "src/utils/",
			"entry": "one",
			"output": "static/js/utils.js",
			"library": "Utils",
			"libraryTarget": "window"
		}
	},
	plugins: [],
	rules: []
};