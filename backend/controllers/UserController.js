const user = require('../models/User');

const getAllUsers = async (req,res) =>{
    const users = await user.getAll()
   res.status(201).send({users});
};

const getUser = async(req,res)=>{
    const { id } = req.params
    
    const result = await user.getUser(id)
    res.status(201).send({user: result})
}

const insertUser = async (req,res) =>{
    const {user_name,email,password} = req.body;

    await user.insertUser({user_name,email,password})
    .then((response) => {
        res.send(201).send({message: 'Usuario Creado'})
    })
    .catch((error)=>{
        res.status(401).send({message: 'Error, Datos invalidos'})
    })
};
const updateUser = async (req,res) =>{
    const { id } = req.params
    const {user_name,email,password} = req.body;

    await user.updateUser(id, {user_name,email,password})
    .then((response) => {
        res.send(201).send({message: 'Usuario Actualizado'})
    })
    .catch((error)=>{
        res.status(401).send({message: 'Error, Datos invalidos'})
    })
}

const deleteUser = async (req,res) => {
    const { id } = req.params
    await user.deleteUser(id)
    .then((response) => {
        res.send(201).send({message: 'Tarea eliminada'})
    })
    .catch((error)=>{
        res.status(401).send({message: 'Error, Tarea no encontrada'})
    })
}


module.exports ={
    getAllUsers,
    getUser,
    insertUser,
    updateUser,
    deleteUser
}