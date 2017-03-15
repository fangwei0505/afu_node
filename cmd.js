#!/usr/bin/env node
/**
 *命令执行程序
 */
var program = require('commander'),
    log4js = require("./config/log_conf"),
    moment = require('moment');


program
    .option('-g, --get_month <month>', '根据月份获取erp数据', get_month)
    .option('-p, --pr_batch <batch_code>', '存储过程同步销售数据', pr_batch)
    .parse(process.argv);

function get_month(month) {
    console.log('根据月份获取erp数据')
    log4js.logger.info("记录日志")
    /*-----------填写自己的逻辑-------------*/
}

function pr_batch(batch_code) {
    console.log('存储过程同步销售数据');
    log4js.logger.info("记录日志")
    /*-----------填写自己的逻辑-------------*/
}