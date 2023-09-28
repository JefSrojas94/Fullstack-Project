const express = require('express');
const router = express.Router();
const MessageController = require('../controllers/MessageController');

router.get('/',MessageController.getAllMessages);
//router.get('/:id', MessageController.getMessage);
//router.post('/',MessageController.insertMessage);
//router.patch('/:id',MessageController.updateMessage);
//router.delete('/:id',MessageController.deleteMessage);

module.exports = router;