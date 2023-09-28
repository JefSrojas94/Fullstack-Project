const mongoose = require('mongoose');
{room_name,room_type,members,message}
const chatRoomSchema = {
    room_name: {
        type: String,
        require: true
    },
    room_type:{},
    members: { },
    message: { },
};

const Room = mongoose.model('Room',chatRoomSchema);

const getAll = async ()=>{
    const result = await Room.find()
    return result;
};
const getRoom = async (id) => {
    return await Room.findById({_id: id})
}

module.exports = {
    getAll,
    getRoom
}