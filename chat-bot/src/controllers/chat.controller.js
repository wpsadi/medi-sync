const Chat = require('../models/chat.model');
const mongoose = require('mongoose');
const axios = require('axios');

exports.createChat = async (req, res) => {
  try {
    const chatId = new mongoose.Types.ObjectId().toString();
    const newChat = new Chat({ chatId, messages: [] });
    await newChat.save();
    res.status(201).json({ 
      data: newChat.chatId,
      error: undefined
     });
  } catch (error) {
    res.status(500).json({ 
      data:undefined,
      error: 'Failed to create chat' });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { message } = req.body;

    const chat = await Chat.findOne({ chatId });
    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }

    // Update starting field if this is the first message
    if (chat.messages.length === 0) {
      const startingText = message.slice(0, 20) + (message.length > 20 ? '...' : '');
      chat.starting = startingText;
    }

    chat.messages.push({
      role: 'user',
      content: message
    });

    const context = chat.messages.map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    // const flaskResponse = await axios.post(process.env.FLASK_API_URL || 'http://localhost:5000/chat', {
    //   messages: context
    // });

    chat.messages.push({
      role: 'assistant',
      content: "good day to u sir"
    });

    await chat.save();

    res.json({
      data:{
        chatId: chat.chatId,
        messages: "good day to u sir",
        starting: chat.starting
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to process message' });
  }
};

exports.getChatHistory = async (req, res) => {
  try {
    const { chatId } = req.params;
    const chat = await Chat.findOne({ chatId });
    
    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }

    res.json({
      data: {
        chatId: chat.chatId,
        messages: chat.messages,
        starting: chat.starting
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch chat' });
  }
};

exports.deleteChat = async (req, res) => {
  try {
    const { chatId } = req.params;
    const result = await Chat.findOneAndDelete({ chatId });
    
    if (!result) {
      return res.status(404).json({ error: 'Chat not found' });
    }

    res.json({ data: 'Chat deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete chat' });
  }
};

exports.allChatIds = async (req, res) => {
  try {
    const chats = await Chat.find({}, { chatId: 1, starting: 1 });
    res.json({ data: chats });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch chat IDs' });
  }
}