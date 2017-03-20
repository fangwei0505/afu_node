var request = require('request');

var http = {}
/**
 * GET 请求帮助方法
 * @param url
 * @param callback
 */
http.get = function (url, callback) {
    request(url, function (error, response, body) {
        if (error && response.statusCode != 200) {
            callback("get请求失败")
        }
        callback(response);
    })
}


http.post_data = function (url, form, callback) {
    request.post(url,form,function(error, response, body){
        if (error && response.statusCode != 200) {
            callback("post请求失败")
        }
        callback(response);
    })
}

http.post_json = function (url, form, callback) {
    request({
        url: url,
        method: "POST",
        json: true,
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(form)
    }, function(error, response, body) {
        if (error && response.statusCode != 200) {
            callback("post请求失败")
        }
        callback(response);
    });
}

module.exports = http;
