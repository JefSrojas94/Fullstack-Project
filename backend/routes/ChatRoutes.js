const express = require("express");
const {
  findChat,
  createChat,
  findUserChats,
} = require("../controllers/ChatController");

const router = express.Router();

router.post("/", createChat);
router.get("/:userId", findUserChats);
router.get("/find/:firstId/:secondId", findChat);

module.exports = router;
