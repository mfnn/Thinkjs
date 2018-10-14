const ObjectID = require('mongodb-core').BSON.ObjectID;
const wamp = require('../controller/wamp');
module.exports = class extends think.Mongo {
    /**
     * @param {any} user
     * @returns
     * 添加房屋信息
     */
    async addRoom(roomInfo) {
        return this.model('room').add(roomInfo);
    }
    /**
     * @param {any} user
     * @returns
     * 添加房屋信息后推送wamp确认消息
     */
    async addRoomWamp(roomInfo) {
        let sum = 0;
        const rooms = await this.model('room').add(roomInfo);
        if(!(think.isEmpty(rooms))){
            const data = {sum: "lalal"};
            wamp.roomInfo(data);
        }
    }

    /**
     * @param {any} user
     * @returns
     * 管理员修改房屋信息
     */
    async updateRoom(roomInfo) {
        return this.model('room')
            .where({
                _id: new ObjectID(roomInfo._id)
            })
            .update({
                $set: {
                    roomName: roomInfo.roomName,
                    roomAddress: roomInfo.roomAddress,
                    roomCode: roomInfo.roomCode,
                    roomToward: roomInfo.roomToward,
                    roomCapacity: roomInfo.roomCapacity,
                    roomPrice: roomInfo.roomPrice,
                    roomUserId: roomInfo.roomUserId,
                    roomPicture: roomInfo.roomPicture
                }
            });
    }

    /**
     * @param {any} user
     * @returns
     * 根据登录人id获取该登录人的所有房源信息
     */
    async findRoomByUserid(userid) {
        return this.model('room')
            .where({
                roomUserId: userid
            })
            .select();
    }

    /**
     * @param {any} user
     * @returns
     * 根据用户id和房源id修改房源信息
     */
    async editRoomByUser(userid, roomDetial) {
        const rooms = await this.model('room')
            .where({
                roomUserId: userid
            })
            .select();
        if (!think.isEmpty(rooms)) {
            return this.model('room')
                .where({
                    _id: new ObjectID(roomDetial._id)
                })
                .update({
                    roomName: roomDetial.roomName,
                    roomAddress: roomDetial.roomAddress,
                    roomCode: roomDetial.roomCode,
                    roomToward: roomDetial.roomToward,
                    roomCapacity: roomDetial.roomCapacity,
                    roomPrice: roomDetial.roomPrice,
                    roomPicture: roomDetial.roomPicture
                });
        }
    }
    /**
     * @param {any} room
     * @returns
     * 根据房源id查看房源详细信息
     */
    async findRoomInfo(roomid){
        return this.model('room')
            .where({
                _id:new ObjectID(roomid)
            })
            .find();
    }
    /**
     * @param {any} room
     * @returns
     * 获取所有房源信息
     */
    async getAllRooms(){
        return this.model('room').select();
    }
};
