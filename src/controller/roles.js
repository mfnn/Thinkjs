const Base = require('./base.js');
const acl=require('../config/acl');
module.exports = class extends Base {
// 添加角色
    async addRoleAction() {
        this.success(await this.mongo('roles').addRole(this.post('roleName'), this.post('roleDep')));
    };

    //为用户修改角色
    async updateRoleToUserAction() {
        this.success(await this.mongo('roles').updateRoleToUser(this.post('roleName'), this.post('userid')))
    }
};
