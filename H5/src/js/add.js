//引入配置模块
require.config({
    paths: {
        "mui": "libs/mui.min"
    }
})


require(["mui"], (mui) => {
    let getId = localStorage.getItem('getId'); //定义全局变量id的值
    function init() {
		ok();
    }
	
	
	
    function ok() {
        document.querySelector('.ok').addEventListener('tap', function() {
            mui.ajax('/api/addUser', {
                data: {
                    name: document.querySelector('.name').value,
                    age: document.querySelector('.age').value,
                    sex: document.querySelector('.sex').value,
                    address: document.querySelector('.address').value,
                    iphone: document.querySelector('.iphone').value,
                    hobby: document.querySelector('.hobby').value
                },
                dataType: 'json', //服务器返回json格式数据
                type: 'post', //HTTP请求类型
                timeout: 10000, //超时时间设置为10秒；
                success: function(res) {
                    mui.alert(res.msg, '温馨提示', '确认', function(e) {
                        location.href = '../index.html'
                    })
                },
                error: function(xhr, type, errorThrown) {

                }
            });
        })
    }
    init()
})