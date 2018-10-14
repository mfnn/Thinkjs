const jwt = require('jsonwebtoken');
const Token = require('../logic/token');

module.exports = class extends think.Controller {
    async __before() {
        if (this.ctx.config('allowUrls').indexOf(this.ctx.url) === -1) {
            if (!this.ctx.request.header.authorization) {
                this.fail(401, '没有认证');
                return false;
            } else {
                let payload = null;
                const authorization = this.ctx.request.header.authorization;
                const secret = this.ctx.config('secret');
                try {
                    payload = jwt.verify(authorization, secret);
                    await Token.verify(authorization);
                    this.ctx.state.user_id = payload._id;
                } catch (error) {
                    this.fail(error.code, error.message);
                    return false;
                }
            }
        }
    }
};
