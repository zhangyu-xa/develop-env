module.exports= {
	port: 80,
	publicPath: "/",
	hot: true,
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
	}
};