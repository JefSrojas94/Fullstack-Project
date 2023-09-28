const mongoose = require('mongoose');
{room_name,room_type,members,message}
const chatRoomSchema = {
    room_name: {
        type: String,
        required: true
    },
    room_type:{
        type: String,
        required: true
    },
    members: {
       type: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
      }],
     },
    message: { 
        type: [{
            content:{
                type:String,
                required: true
            },
            id_user:{
                type:mongoose.Types.ObjectId,
                ref:'User',
                required: true
            },
            date:{
                type:Date,
                required: true,
                default: new Date(),
            }
        }], 
    },
};

const Room = mongoose.model('Room',chatRoomSchema);
const RoomMessage = mongoose.model('Room',chatRoomSchema.message);

const getAll = async ()=>{
    const result = await Room.find()
    return result;
};
const getRoom = async (id) => {
    return await Room.findById({_id: id})
};
const getAllMessages = async ()=>{
    const result = await RoomMessage.find()
    return result;
};

module.exports = {
    getAll,
    getRoom,
    getAllMessages
}