var enumerable = require('linq'),
    moment = require('moment');


var common = {};


/**
 *
 * @param fieldArr 目标字段：["来源字段"，是否字符串]
 * ------------------------------------
 * var fieldArr = {
 *    "sku_code": ["PRD_NO", true],
 *    "outer_code": ["OUT_NO", true],
 *    "brand_code": ["Brand_Id", true]
 * };
 *--------------------------------------
 * @param tableName 目标表名称
 * @param jsonList 来源数据（字段必须与目标字段位置相匹配）
 * @param callback sql插入语句
 */
common.create_insert_sql = function (tableName, fieldArr, jsonList) {
    var sqlStr = " INSERT INTO " + tableName;
    var sqlField = "(";
    for (var key in fieldArr) {
        sqlField += "`" + key + "`,";
    }
    //待插入字段名
    sqlStr += sqlField.substring(0, sqlField.length - 1) + ") VALUES ";
    jsonList.forEach(function (item, index) {
        var valStr = "(";
        for (var key in fieldArr) {
            //字段类型为string 加 ''
            if (fieldArr[key][1] == true) {
                valStr += "'" + item[fieldArr[key][0]] + "',"
            } else {
                valStr += item[fieldArr[key][0]] + ","
            }
        }
        sqlStr += valStr.substring(0, valStr.length - 1) + "),";
    });
    sqlStr = sqlStr.substring(0, sqlStr.length - 1) + ";";
    return sqlStr;
};

module.exports = common;