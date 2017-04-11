var mssql = require('mssql'),

    db_config = require('../config/db_config');

var db = {};

/**
 * 执行任意sql语句
 * @param sql 脚本语句
 * @param callBack 返回结果
 */
db.query = function (sql, callBack) {
    var conn = new mssql.Connection(db_config.mssql_connection, function (err) {
        if (err) {
            console.log(err);
            return;
        }
        var ps = new mssql.PreparedStatement(conn);
        ps.prepare(sql, function (err) {
            if (err) {
                console.log(err);
                return;
            }
            ps.execute('', function (err, result) {
                if (err) {
                    console.log(err);
                    return;
                }

                ps.unprepare(function (err) {
                    if (err) {
                        console.log(err);
                        callback(err, null);
                        return;
                    }
                    callBack(err, result);
                });
            });
        });

    });

};

module.exports = db;