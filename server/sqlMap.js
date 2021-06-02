// 封装数据库的方法
const { MongoClient } = require("mongodb")
function Connect(callback) {
    MongoClient.connect('mongodb://root:root@139.196.239.174:27017/test1?authSource=admin',{ useUnifiedTopology: true })
    .then(() => {
        console.log('数据库连接成功')
        MongoClient.connect('mongodb://root:root@139.196.239.174:27017/test1?authSource=admin', (err, db) => {
        if (err) throw err
        // 创建使用数据库
        var dbName = db.db("test1")
        callback(db, dbName)
    })
    })
	.catch(() => console.log('数据库连接失败'));
    
}
// 增
exports.add = function (collection, json, callback) {
    // 和collection进行连接
    Connect((db, dbName) => {
        dbName.collection(collection).insert(json, (err) => {
            callback(err)
            //  关闭数据库
            db.close()
        })
    })
}
// 删
exports.del = function (collection, json, callback) {
    // 和collection进行连接
    Connect((db, dbName) => {
        dbName.collection(collection).remove(json, (err) => {
            callback(err)
            //  关闭数据库
            db.close()
        })
    })
}
// 改
exports.update = function (collection, json, json1, callback) {
    // 和collection进行连接
    Connect((db, dbName) => {
        dbName.collection(collection).update(json, { $set: json1 }, (err) => {
            callback(err)
            //  关闭数据库
            db.close()
        })
    })
}
// 查看数据库文件
exports.find = function (collection, json, callback) {
    // 和collection进行连接
    Connect((db, dbName) => {
        dbName.collection(collection).find(json).toArray((err, data) => {
            callback(err, data)
            //  关闭数据库
            db.close()
        })
    })
}