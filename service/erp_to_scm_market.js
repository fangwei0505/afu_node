var mssql = require('../db_helper/sqlserver'),
    mysql = require('../db_helper/mysql'),
    log4js = require("../config/log_conf"),
    enumerable = require('linq'),
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
        var sql_str = "SELECT TOP 10 * FROM OrderFlow.OrderInfo(NOLOCK); ";
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
    }

}