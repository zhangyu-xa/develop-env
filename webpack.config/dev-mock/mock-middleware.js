'use strict';

function alarmList(app) {
	app.get('/dadaoApi/v1/generalInfo', function (req, res) {
		return res.json(require('./getGeneralInfoListByParam.json'));
	});
}

module.exports = function (app) {
	//register mock server
	alarmList(app);
};