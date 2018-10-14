const autobahn = require('autobahn');
const wampConfig = require('../config/config').wamp;
const options = wampConfig.options;

module.exports = {
    roomInfo: (args) => {
        const connection = new autobahn.Connection(options);
        console.log("连接信息",connection);
        connection.onopen = function (session) {
            session.publish(wampConfig.definedTopic, [args]);
            console.log("wamp发布的主题是:" + wampConfig.definedTopic);
            console.log(args);
        };
        console.log("end======");
        connection.open();
    }

};