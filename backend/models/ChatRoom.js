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