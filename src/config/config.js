// default config
module.exports = {
    workers: 1,
    errnoField:'code',
    errmsgField:'message',
    secret: '获取token的字符串',
    allowUrls: [
        '/user/addUser',
        '/user/loginUser',
        '/user/editPassword'
    ],
    wamp: {
        options: {
            url: 'ws://wamp.wugeek.com:90/ws',
            realm: 'realm1'
        },
        definedTopic: 'roomChange'
    },
    redis: {
        host: '127.0.0.1',
        port: '6379'
    }
};
