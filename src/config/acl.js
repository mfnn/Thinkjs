const node_acl = require('acl');
const aclConfig = require('./aclConfig');

let acl;
acl = new node_acl(new node_acl.memoryBackend());
acl.allow(aclConfig);
module.exports = acl;
