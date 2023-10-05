const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
        unique: true
    },
    email: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 200,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 1024
    },
},{
    timestamps: true
});

const userModel = mongoose.model('User', userSchema);
const getUser = async (id) => {
    return await userModel.findById(id)
}
module.exports = {userModel, getUser}

