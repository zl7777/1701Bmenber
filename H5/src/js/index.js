//引入配置模块
require.config({
    paths: {
        "mui": "libs/mui.min"
    }
})

require(["mui"], (mui) => {

    //初始化
    function init() {
        findUser()
		addBtn()
    }
    //获取所有的成员信息
    function findUser() {
        mui.ajax('/api/findUser', {
            data: {

            },
            dataType: 'json', //服务器返回json格式数据
            type: 'post', //HTTP请求类型
            timeout: 10000, //超时时间设置为10秒；
            success: function(res) {
                render(res)
                muiClick()
                muidel()
            },
            error: function(xhr, type, errorThrown) {

            }
        });
    }
    //绑定事件
    // function Click() {
    //     let btn = [...document.querySelectorAll('.look')];
    //     for (let i = 0; i < btn.length; i++) {
    //         btn[i].onclick = () => {
    //             let getId = this.getAttribute('data-id');
    //             location.href = '../html/demo.html'
    //         }
    //     }
    // }
    //mui方法绑定事件
    //点击查看全部信息
    function muiClick() {
        mui('.list').on('tap', '.look', function() {
            //获取id
            let getId = this.getAttribute('data-id');
            localStorage.setItem('getId', getId) //获取到的id永久储存到本地
            location.href = '../html/demo.html'
        })
    }
	
	//添加数据
	function addBtn() {
			let btns= document.querySelector('.btns')
			btns.onclick=function () {
			 	location.href = '../html/add.html'
			 }
	}
    function muidel() {
        mui('.list').on('tap', '.del', function() {
            //获取id
            let getId = this.getAttribute('data-id');
			let that=this;
            mui.confirm('是否要删除本条数据', '警告', ['确认', '取消'], function(e) {
                if (e.index === 0) {
                    //删除数据
                    mui.ajax('/api/delUser', {
                        data: {
                            id: getId
                        },
                        dataType: 'json', //服务器返回json格式数据
                        type: 'post', //HTTP请求类型
                        timeout: 10000, //超时时间设置为10秒；
                        success: function(res) {
                            mui.alert(res.msg, '提示', '确认', function(e) {
                               that.parentNode.remove()
                            })
                        },
                        error: function(xhr, type, errorThrown) {

                        }
                    });
                }
            })
        })
    }

    //渲染列表
    function render(res) {
        var str = '';
        res.data.forEach(item => {
            str += `<li class="mui-table-view-cell">${item.name}
					<button type="button" class="mui-btn mui-btn-primary look" data-id='${item._id}'>查看</button>
					<button type="button" class="mui-btn mui-btn-danger del" data-id='${item._id}'>删除</button>
					</li>`

        })
        document.querySelector('.list').innerHTML = str;
    }

    //初始化调用
    init()
})