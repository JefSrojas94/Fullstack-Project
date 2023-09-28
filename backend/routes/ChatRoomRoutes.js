const express = require('express');
const router = express.Router();
const ChatRoomController = require('../controllers/ChatRoomController');

router.get('/',ChatRoomController.getAllRooms);
router.get('/:id', ChatRoomController.getRoom);
//router.post('/',ChatRoomController.insertRoom);
//router.patch('/:id',ChatRoomController.updateRoom);
//router.delete('/:id',ChatRoomController.deleteRoom);

module.exports = router;