var express = require('express');
var router = express.Router();
var Mongo = require('mongodb-curd')

/* GET home page. */
let db = '1701B' //库名
let col = 'urse' //集合名


//添加数据
router.post('/api/addUser', function(req, res, next) {
    let obj = req.body;
    if (obj.name && obj.age && obj.sex && obj.address && obj.iphone && obj.hobby) {
        Mongo.insert(db, col, obj, function(result) {
            if (!result) {
                res.send({
                    code: 0,
                    msg: "添加失败"
                })
            } else {
                res.send({
                    code: 1,
                    msg: "添加成功",
                    data: result
                })
            }
        })
    } else {
        //没有指 的情况
        res.send({ msg: '缺少参数' })
    }


});


//删除数据
router.post('/api/delUser', function(req, res, next) {
    let id = req.body.id;
    Mongo.remove(db, col, { "_id": id }, function(result) { //根据传入的ID进行删除数据内容
        if (!result) {
            res.json({
                code: 0,
                msg: "删除失败"
            })
        } else {
            res.json({
                code: 1,
                msg: "删除成功",
                data: result
            })
        }
    })

});

//修改数据
router.post('/api/upUser', function(req, res, next) {
    let obj = req.body;
    let id = obj.id;
    delete obj.id;
    Mongo.update(db, col, [{ "_id": id }, obj], function(result) { //{参数是要修改的目标键值对},{修改后的键值对}
        if (!result) {
            res.json({
                code: 0,
                msg: "修改失败"
            })
        } else {
            res.json({
                code: 1,
                msg: "修改成功",
                data: result
            })
        }
    })
});


//查询数据
router.post('/api/findUser', function(req, res, next) {
    console.log(req.body)
    Mongo.find(db, col, {}, function(result) {
        if (!result) {
            res.json({
                code: 0,
                msg: "没有找到"
            })
        } else {
            res.json({
                code: 1,
                msg: "找到了",
                data: result
            })
        }
    })
});

//根据条件查找
router.post('/api/findUserOne', function(req, res, next) {
    let obj = req.body;
    let id = obj.id;
    Mongo.find(db, col, { "_id": id }, function(result) {
        if (!result) {
            res.json({
                code: 0,
                msg: "没有找到"
            })
        } else {
            res.json({
                code: 1,
                msg: "找到了",
                data: result
            })
        }
    })
});

module.exports = router;