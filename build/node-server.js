const webpack = require("webpack");
const middleware = require("webpack-dev-middleware");
const baseConfOptions = require("./webpack.base.conf");

baseConfOptions.mode = "development";

const compiler = webpack(baseConfOptions);

const express = require("express");

const app = express();

app.use(middleware(compiler, {

}));

app.use(function (req, res, next) {
	console.log("2222222222222222222222", req, res);
})


app.listen(8888, function () {
	console.log("port 8888 is running.");
});