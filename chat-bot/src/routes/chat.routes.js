const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat.controller');

router.post('/chats', chatController.createChat);
router.post('/chats/:chatId/messages', chatController.sendMessage);
router.get('/chats/:chatId', chatController.getChatHistory);
router.delete('/chats/:chatId', chatController.deleteChat);

module.exports = router;