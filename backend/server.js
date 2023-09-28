const express = require('express');
const mongoose = require('mongoose');
const socketIo = require('socket.io');
const io = socketIo(server);

const UserRoutes = require('./routes/UserRoutes');

const PORT = 3000;

const server = express();

server.use(express.json());

server.use('/chat/api/v1/users', UserRoutes);

const mongooseConnect = async () => {
    try{
      await mongoose.connect('mongodb+srv://jrojas14:osNPlyIYS04edozl@cluster0.cqhkh2x.mongodb.net/?retryWrites=true&w=majority')
      console.log('Conexión exitosa')
    }catch(error){
      console.error(error)
    }
  };
  

  io.on('connection', (socket) => {
    console.log('Nuevo usuario conectado.');
  
    // Lógica de manejo de mensajes y salas de chat aquí...
  
    socket.on('disconnect', () => {
      console.log('Usuario desconectado.');
    });
  });

  mongooseConnect();


server.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${PORT}`)
});