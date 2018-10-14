const Base = require('./base.js');
module.exports = class extends Base {
// 添加房源信息
    async addRoomAction() {
        this.success(await this.mongo('room').addRoom(this.post()));
    }

    // 管理员修改房源信息
    async updateRoomAction() {
        this.success(await this.mongo('room').updateRoom(this.post()));
    }

    // 根据userid查询个人发布的房源信息
    async findRoomByUseridAction() {
        this.success(await this.mongo('room').findRoomByUserid(this.ctx.state.user_id));
    }

    // 更新个人发布的房源信息
    async editRoomByUserAction() {
        const res = await this.mongo('room').editRoomByUser(this.ctx.state.user_id, this.post());
        if (res === 1) {
            this.success(res, "更新房屋信息成功");
        } else {
            this.fail(200, '房屋信息未更新');
        }

    }

    //成功添加房源后推送wamp消息
    async addRoomWampAction() {
        this.success(await this.mongo('room').addRoomWamp(this.post()));
    }

    //根据房源ID产看房源信息
    async findRoomInfoAction() {
        this.success(await this.mongo('room').findRoomInfo(this.get('roomid')));
    }

    //获取所有房源信息
    async getAllRoomsAction() {
        const userInfo = await this.mongo('user').findUserDetailInfo(this.ctx.state.user_id);
        console.log("userInfo", userInfo);
        if (!(think.isEmpty(userInfo)) && userInfo.role === 'admin') {
            this.success(await this.mongo('room').getAllRooms());
        } else {
            this.fail("没有权限访问");
        }

    }
};
