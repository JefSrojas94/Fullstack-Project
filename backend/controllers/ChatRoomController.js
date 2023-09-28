const room = require('../models/ChatRoom');

const getAllRooms = async (req,res) =>{
    const rooms = await room.getAll()
   res.status(201).send({rooms});
};
const getRoom = async(req,res)=>{
    const { id } = req.params
    
    const result = await room.getRoom(id)
    res.status(201).send({room: result})
}

module.exports = {
    getAllRooms,
    getRoom
}