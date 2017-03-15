/**
 *手动执行程序
 */
var service = require('./service/erp_to_scm_market')

/**
 * 获取前五条数据
 */
service.erp_get_order_market(function (result) {
    console.log(result);
})
/**
 * 添加数据到scm
 */
service.scm_add_shop_sale(function (result) {
    console.log("数据id：" + result);
})