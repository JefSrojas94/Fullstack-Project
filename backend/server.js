const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const UserRoutes = require('./routes/UserRoutes');
const ChatRoutes = require('./routes/ChatRoutes');

app.use(express.json());
app.use(cors());

app.use('/chat/api/v1/users', UserRoutes);
app.use('/chat/api/v1/chats',ChatRoutes);

const port = process.env.PORT || 3000;
const uri = process.env.ATLAS_URI;

app.listen(port, (req, res)=>{
    console.log(`server running on port: ${port}` )
});

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>console.log("MongoDB connection established"))
.catch((error)=>console.log("MongoDB connection fail: ", error.message));