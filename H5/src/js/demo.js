//引入配置模块
require.config({
    paths: {
        "mui": "libs/mui.min"
    }
})


require(["mui"], (mui) => {
    let getId = localStorage.getItem('getId'); //定义全局变量id的值
    function init() {
        findUserOne()
    }
    //获取具体成员信息
    function findUserOne() {
        mui.ajax('/api/findUserOne', {
            data: {
                id: getId
            },
            dataType: 'json', //服务器返回json格式数据
            type: 'post', //HTTP请求类型
            timeout: 10000, //超时时间设置为10秒；
            success: function(res) {
                renders(res)
                ok();
				no()
            },
            error: function(xhr, type, errorThrown) {

            }
        });
    }

    function renders(res) {
        var str = '';
        res.data.forEach(item => {
            str += `<div class="mui-input-row">
						<label>姓名</label>
					<input type="text" class="mui-input-clear name" placeholder="${item.name}">
					</div>
					<div class="mui-input-row">
						<label>年龄</label>
					<input type="text" class="mui-input-clear age" placeholder="${item.age}">
					</div>
					<div class="mui-input-row">
						<label>性别</label>
					<input type="text" class="mui-input-clear sex" placeholder="${item.sex}">
					</div>
					<div class="mui-input-row">
						<label>地址</label>
					<input type="text" class="mui-input-clear address" placeholder="${item.address}">
					</div>
					<div class="mui-input-row">
						<label>号码</label>
					<input type="text" class="mui-input-clear iphone" placeholder="${item.iphone}">
					</div>
					<div class="mui-input-row">
						<label>爱好</label>
					<input type="text" class="mui-input-clear hobby" placeholder="${item.hobby = item.hobby ? item.hobby : "无"}">
					</div>
					<div class="mui-button-row">
						<button type="button" class="mui-btn mui-btn-primary ok" >确认</button>
						<button type="button" class="mui-btn mui-btn-danger no" >取消</button>
					</div>`

        })
        document.querySelector('.table').innerHTML = str;
    }

    function no() {
        document.querySelector('.no').addEventListener('tap', function() {
            location.href = '../index.html'
        })
    }

    function ok() {
        document.querySelector('.ok').addEventListener('tap', function() {
            mui.ajax('/api/upUser', {
                data: {
                    id: getId,
                    name: document.querySelector('.name').value || document.querySelector('.name').placeholder,
                    age: document.querySelector('.age').value || document.querySelector('.age').placeholder,
                    sex: document.querySelector('.sex').value || document.querySelector('.sex').placeholder,
                    address: document.querySelector('.address').value || document.querySelector('.address').placeholder,
                    iphone: document.querySelector('.iphone').value || document.querySelector('.iphone').placeholder,
                    hobby: document.querySelector('.hobby').value || document.querySelector('.hobby').placeholder
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