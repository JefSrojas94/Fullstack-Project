const message = require('../models/ChatRoom');

const getAllMessages = async (req,res) =>{
    const messages = await message.getAll()
   res.status(201).send({messages});
};
/*
const getMessage = async(req,res)=>{
    const { id } = req.params
    
    const result = await message.getMessage(id)
    res.status(201).send({message: result})
}

const insertMessage = async (req,res) =>{
    const {content,date,id_user_sender,id_chat_room} = req.body;

    await message.insertMessage({content,date,id_user_sender,id_chat_room})
    .then((response) => {
        res.send(201).send({message: 'Mensaje Enviado'})
    })
    .catch((error)=>{
        res.status(401).send({message: 'Error, Datos invalidos'})
    })
};
const updateMessage = async (req,res) =>{
    const { id } = req.params
    const {content,date,id_user_sender,id_chat_room} = req.body;

    await message.updateMessage(id, {content,date,id_user_sender,id_chat_room})
    .then((response) => {
        res.send(201).send({message: 'Mensaje editado'})
    })
    .catch((error)=>{
        res.status(401).send({message: 'Error, Datos invalidos'})
    })
}

const deleteMessage = async (req,res) => {
    const { id } = req.params
    await message.deleteMessage(id)
    .then((response) => {
        res.send(201).send({message: 'Mensaje Eliminado'})
    })
    .catch((error)=>{
        res.status(401).send({message: 'Error, Mensaje no encontrado'})
    })
}

*/
module.exports ={
    getAllMessages,
    getMessage,
    insertMessage,
    updateMessage,
    deleteMessage
}