const Redis = require('redis');
const secret = '获取token的字符串';
const jwt = require('jsonwebtoken');
const redisConfig = require('../config/config').redis;
const redis = Redis.createClient(redisConfig.port, redisConfig.host);

module.exports = {
    verify: function (token) {
        return new Promise((resolve, reject) => {
            if (token == null || token === undefined) {
                reject({code: 401, message: "权限验证-失败-未登录"})
            } else {
                redis.get(token, function (err, res) {
                    if (err) {
                        reject({code: 500, message: "权限验证-失败-" + err.message});
                    }
                    if (res === undefined || !res || res === null) {
                        reject({code: 405, message: "权限验证-失败-查无此token"})
                    } else {
                        jwt.verify(token, secret, function (err, decoded) {
                            if (err) {
                                reject({code: 500, message: "权限验证-失败" + err.message})
                            } else {
                                if (res === decoded._id) {
                                    resolve({code: 200});
                                } else {
                                    reject({code: 406, message: "权限验证-失败-token不匹配"})
                                }
                            }
                        })
                    }
                })
            }
        })
    }
};