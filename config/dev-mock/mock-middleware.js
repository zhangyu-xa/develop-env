'use strict';

//login module
function login(app) {
	app.get('/api', function (req, res) {
		return res.json({user: "zhangyu"});
	});
}

module.exports = function (app) {
	//register mock server
	login(app);
}