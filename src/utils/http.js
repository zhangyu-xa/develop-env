import fetchAxios from "fetch-like-axios";

const config = {
	// baseURL: '/',
	timeout: 30 * 1000,
	xhrMode: "fetch",
	headers: {
		Accept: "application/json; charset=utf-8",
		"Content-Type": "application/json; charset=utf-8"
	}
};

const CancelToken = fetchAxios.CancelToken;
const httpRequest = fetchAxios.create(config);

// 请求之前拦截动作
httpRequest.interceptors.request.use(
	response => {
		return response;
	},
	error => {
		console.error(error);
	}
);
// 请求之后拦截动作
httpRequest.interceptors.response.use(
	response => {
		return response.data;
	},
	function httpUtilErrorRequest(error) {
		// 对响应错误做点什么
		if (error.response && error.response.status === 401) {
			//BaseStore.user.logout({ isRedirect: true, isLogin: true });
			console.log("error.response.status:", 401);
		}
		if (!error.response) {
			console.error(error);
			return Promise.reject(error);
		}
		console.error(error.response);
		return Promise.reject(error.response);
	}
);

export const $http = function({ url, type, data, method, headers, cancelHttp = false, isMultiPart = false, responseType, isLogin}) {
	const token = isLogin ? undefined : JSON.parse(window.sessionStorage.getItem("user")).jwtToken;	//组装请求参数
	const options = {
		url,
		method: method || "get",
		headers: Object.assign({}, {Authorization: `Bearer ${token}`}, headers),
		...(type === "query" ? {params: data || {}} : {data: data || {}}),
		...(cancelHttp ? {cancelToken: new CancelToken(cancelHttp)} : {})
	};
	//兼容form-data
	if (isMultiPart) {
		options.headers["Content-Type"] = "multipart/form-data";
		options.headers["Accept"] = "";
	}
	if(responseType) {
		options.responseType = responseType;
		options.headers["Accept"] = "*/*";
	}
	return httpRequest(options);
};
