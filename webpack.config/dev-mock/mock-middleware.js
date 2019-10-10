'use strict';

//login module
function login(app) {
	app.get('/dadaoApi/v1/generalInfo', function (req, res) {
		return res.json(require('./getGeneralInfoListByParam.json'));
	});
}

module.exports = function (app) {
	//register mock server
	login(app);
};