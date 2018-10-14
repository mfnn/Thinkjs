const ObjectID = require('mongodb-core').BSON.ObjectID;
module.exports = class extends think.Mongo {
    /**
     * @param {any} user
     * @returns
     * 添加角色
     */
    async addRole(roleName, roleDep) {
        return this.model('role').thenAdd({roleName, roleDep}, {roleName});
    }

    /**
     * @param {any} user
     * @returns
     * 为用户修改角色
     */
    async updateRoleToUser(roleName, userid) {
       return await this.model('user')
            .where({
                _id: new ObjectID(userid)
            })
           .update({
               role:roleName
           })
    }
};
