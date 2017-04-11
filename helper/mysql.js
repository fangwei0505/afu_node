var mysql = require("mysql"),
    transaction = require('node-mysql-transaction'),
    db_config = require("../config/db_config");

var db = {};
/**
 * 数据库连接池
 */
var pool = mysql.createPool(db_config.mysql_connnection);

/**
 * 事务连接
 */
var trcon = transaction({
    // mysql driver set
    connection: [mysql.createConnection, db_config.mysql_connnection],
    dynamicConnection: 32,
    timeout: 2000 * 10
});

/**
 * 执行任意sql语句
 * @param sql 脚本语句
 * @param callBack 返回结果
 */
db.query = function (sql, callback) {
    pool.getConnection(function (err, conn) {
        if (err) {
            callback(err, null, null);
        } else {
            conn.query(sql, function (qerr, result, fields) {
                //释放连接
                conn.release();
                //事件驱动回调
                callback(qerr, result, fields);
            });
        }
    });
};

/**
 * 执行事务操作
 * @param sqlArr sql语句数组
 * @param callback
 */
db.tran = function (sqlArr, callback) {
    var chain = trcon.chain();
    chain.on('commit', function () {
        callback("commit")
    }).on('rollback', function (err) {
        console.log(err);
    });
    for (var i = 0; i < sqlArr.length; i++) {
        chain.query(sqlArr[i]);
    }
};
module.exports = db;