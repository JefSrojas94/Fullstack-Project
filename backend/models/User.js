const mongoose = require('mongoose');

const userSchema = {
    user_name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
};

const User = mongoose.model('User',userSchema)

const getAll = async ()=>{
    const result = await User.find()
    return result;
};
const getUser = async (id) => {
    return await User.findById({_id: id})
}
const insertUser = async (user) =>{
    return await User.create(user)
};

const updateUser = async (id,newUser) =>{
    const oldUser = await User.findById({_id: id})

    oldUser.user_name = newUser.user_name;
    oldUser.email = newUser.email;
    oldUser.password = newUser.password;
    

    return await oldUser.save()
}

const deleteUser = async (id) =>{
    return await User.deleteOne({_id: id})
}

module.exports = {
    getAll,
    getUser,
    insertUser,
    updateUser,
    deleteUser
}
