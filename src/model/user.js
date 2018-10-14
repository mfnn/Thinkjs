
// mysql数据库
// module.exports = class extends think.Model {
//
// };
const ObjectID = require('mongodb-core').BSON.ObjectID;
module.exports = class extends think.Mongo {
    /**
     * @param {any} user
     * @returns
     * 添加用户
     */
    async addUser(account, password, address, phone, email, sex, birth, picture,role) {
        return this.model('user').thenAdd({account, password, address, phone, email, sex, birth, picture,role}, {account});
    }

    /**
     * @param {any} user
     * @returns
     * 用户登录
     */
    async loginUser(account, password) {
        const userLogin = await this.model('user')
            .where({
                account: account,
                password: think.md5(password)
            })
            .find();
        if (think.isEmpty(userLogin)) {
            return 0;
        } else {
            return userLogin;
        }
    }

    /**
     * @param {any} user
     * @returns
     * 根据id查找用户信息
     */
    async findUserById(userid) {
        const userInfo = await this.model('user')
            .where({
                _id: new ObjectID(userid)
            });
        if (think.isEmpty(userInfo)) {
            return 0;
        } else {
            return 1;
        }
    }

    /**
     * @param {any} user
     * @returns
     * 修改用户信息
     */
    async updateUser(userid, sex, birth, address, email, phone) {
        return this.model('user')
            .where({
                _id: new ObjectID(userid)
            })
            .update({
                $set: {
                    sex: sex,
                    birth: birth,
                    address: address,
                    email: email,
                    phone: phone
                }
            });
    }

    /**
     * @param {any} user
     * @returns
     * 根据用户名修改密码（忘记密码）
     */
    async editPassword(account, password) {
        return this.model('user')
            .where({
                account: account
            })
            .update({
                $set: {password: password}
            });
    }

    /**
     * @param {any} user
     * @returns
     * 根据id查找用户详细信息
     */
    async findUserDetailInfo(userid) {
        console.log("userid",userid)
        return this.model('user')
            .where({
                _id: new ObjectID(userid)
            })
            .find();
    }
};
