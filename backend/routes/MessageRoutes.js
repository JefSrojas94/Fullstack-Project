const express = require("express");

const {getMessages,
    createMessage  
} = require("../controllers/MessageController");

const router = express.Router();

router.post("/", createMessage);
router.get("/:chatId", getMessages);


module.exports = router;
