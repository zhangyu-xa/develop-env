module.exports= {
	port: 80,
	publicPath: "/",
	proxy: {
		"/api" : {
			target: "https://www.baidu.com",
			pathRewrite : { '^/api': '' }
		}
	},
	before(app) {
		app.get('/api', function (req, res) {
			return res.json({user: "zhangyu"});
		});
	},
	after(app) {
		app.get('/api', function (req, res) {
			console.log("here");
		});
	}
};