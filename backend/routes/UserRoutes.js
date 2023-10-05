const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');



router.post('/register',UserController.registerUser);
router.post('/login',UserController.loginUser);
router.get('/find/:id',UserController.findUser);
router.get('/find/',UserController.getUsers);

module.exports = router;