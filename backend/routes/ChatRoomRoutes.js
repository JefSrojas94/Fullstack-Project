const express = require('express');
const router = express.Router();
const ChatRoomController = require('../controllers/ChatRoomController');

router.get('/',ChatRoomController.getAllRooms);
router.get('/:id', ChatRoomController.getRoom);
//router.post('/',MessageController.insertMessage);
//router.patch('/:id',MessageController.updateMessage);
//router.delete('/:id',MessageController.deleteMessage);

module.exports = router;