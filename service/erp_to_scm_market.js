var mssql = require('../helper/sqlserver'),
    mysql = require('../helper/mysql'),
    log4js = require("../config/log_conf"),
    enumerable = require('linq'),
    common = require("../helper/common_helper"),
    moment = require('moment');

module.exports = {

    scm_add_shop_sale: function (callback) {
        var sql_str = "INSERT INTO sql_log (`sql`) VALUES ('test');";
        mysql.query(sql_str, function (error, result, fields) {
            if (error) {
                log4js.logger.info("添加失败.");
                console.error("添加失败");
            }
            callback(result.insertId)
        })
    },
    erp_get_order_market: function (callback) {
        var sql_str = "SELECT TOP 10 * FROM table(NOLOCK); ";
        mssql.query(sql_str, function (error, result) {
            if (error) {
                log4js.logger.info("查询失败.");
                console.error("查询失败");
            }
            log4js.logger.info("查询erp数据.共：" + result.length);
            //linq 查询前5条
            var top5 = enumerable.from(result).take(5).toArray();
            callback(top5);
        });
    },
    //返回生成的批量insert语句
    get_insert_sql: function (user_list, callback) {
        var num = 100; //分组基数(根据数据库限制一条insert语句的长度，具体按照实际情况定)
        var group_num = Math.ceil(user_list.length / num);
        var sqlArr = new Array();
        var fieldArr = {
            "code": ["Code", true],
            "status": ["STAT", true],
            "age": ["Age", false],
            "created": ["Created", true],
            "updated": ["Updated", true],
            "creater": ["Creater", true],
            "updater": ["Updater", true]
        };
        for (var i = 0; i < group_num; i++) {
            var top_list = enumerable.from(user_list).skip(i * num).take(num).toArray();
            var sqlStr = common.create_insert_sql("users",fieldArr, top_list);
            sqlArr.push(sqlStr);
        }
        callback(sqlArr);
    },
    batch_insert_tran_users: function (sql_arr, callback) {
        var del_sql_str = "delete table users;";
        sql_arr.unshift(del_sql_str);
        mysql.tran(sql_arr, function (result) {
            if (result == "commit") {
                callback(true)
            } else {
                callback(false)
            }
        })
    }
}
