const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat.controller');

router.post('/chat/create', chatController.createChat);
router.post('/chats/:chatId/messages', chatController.sendMessage);
router.get('/chats/:chatId', chatController.getChatHistory);
router.delete('/chats/:chatId', chatController.deleteChat);
router.get('/chats', chatController.allChatIds);

module.exports = router;