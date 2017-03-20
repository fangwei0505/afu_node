var mysql = require("mysql"),
    db_config = require("../config/db_config");

var db = {};
/**
 * 数据库连接池
 */
var pool = mysql.createPool(db_config.mysql_connnection);

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

module.exports = db;