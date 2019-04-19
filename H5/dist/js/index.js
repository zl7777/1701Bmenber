"use strict";

//引入配置模块
require.config({
	paths: {
		'mui': "libs/mui.min"
	}
});
require(["mui"], function (mui) {
	mui.ajax('/api/findUser', {
		data: {},
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		timeout: 1000, //超时时间设置为10秒；
		success: function success(data) {
			console.log(data);
		},
		error: function error(xhr, type, errorThrown) {}
	});
});