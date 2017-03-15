/*
 * 定时执行程序
 * */

var schedule = require('node-schedule');

// cron表达式
// 每月的1日的凌晨2点调度任务:  0 0 2 1 * ? *
// 每隔1分钟执行一次:  0 */1 * * * ?
// 每隔30秒执行一次:  30 * * * * * ?
var scheduleMyJob = function () {
    schedule.scheduleJob('30 * * * * *', function () {
        console.log("run：" + new Date());
    });
}

scheduleMyJob();