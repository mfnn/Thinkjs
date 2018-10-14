const Base = require('./base.js');
// const jwt = require('jwt-simple');
const jwt = require('jsonwebtoken');
const token_expire = 30 * 60;

const Redis = require('redis');
const redisConfig = require('../config/config').redis;
const redis = Redis.createClient(redisConfig.port, redisConfig.host);

module.exports = class extends Base {
    // 添加用户
    async addUserAction() {
        const role = 'normalUser';
        this.success(await this.mongo('user').addUser(
            this.post('account'),
            think.md5(this.post('password')),
            this.post('address'),
            this.post('phone'),
            this.post('email'),
            this.post('sex'),
            this.post('birth'),
            this.post('picture'),
            role
        ));
    }

    // 用户登录
    async loginUserAction() {
        const user = await this.mongo('user').loginUser(this.post('account'), this.post('password'));
        if (think.isEmpty(user)) {
            this.fail(403, '登陆失败,用户名或密码错误');
        } else {
            let payload = {_id: user._id, account: user.account, password: user.password};
            let token = jwt.sign(payload, think.config('secret'), {expiresIn: 60 * 60 * 24 * 30});
            redis.set(token, payload._id.toString());
            redis.expire(token, token_expire);
            return this.success({token}, '用户登陆成功');
        }
    }

    // 更新用户信息
    async updateUserAction() {
        this.success(await this.mongo('user').updateUser(this.ctx.state.user_id,
            this.post('sex'), this.post('birth'), this.post('address'), this.post('email'), this.post('phone')));
    }

    // 通过id查找用户
    async findUserByIdAction() {
        this.success(await this.mongo('user').findUserById(this.ctx.state.user_id));
    }

    // 根据用户名修改密码
    async editPasswordAction() {

        this.success(await this.mongo('user').editPassword(this.post('account'), think.md5(this.post('password'))));
    }

    //根据用户id查找用户的详细信息
    async findUserDetailInfoAction() {
        this.success(await this.mongo('user').findUserDetailInfo(this.ctx.state.user_id));
    }
};
