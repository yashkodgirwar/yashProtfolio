const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const Message = require('../models/Message');
const { getIsMongoConnected } = require('../config/db');

const messagesFilePath = path.join(__dirname, '..', 'data', 'messages.json');

// POST a new contact inquiry
router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Please provide name, email, and message.' });
  }

  try {
    const newMessageData = {
      name,
      email,
      subject: subject || 'New Portfolio Inquiry',
      message,
      createdAt: new Date().toISOString()
    };

    if (getIsMongoConnected()) {
      const msg = new Message(newMessageData);
      await msg.save();
    } else {
      let messages = [];
      if (fs.existsSync(messagesFilePath)) {
        try {
          messages = JSON.parse(fs.readFileSync(messagesFilePath, 'utf-8'));
        } catch (e) {
          messages = [];
        }
      }
      messages.unshift({ id: `msg-${Date.now()}`, ...newMessageData });
      fs.writeFileSync(messagesFilePath, JSON.stringify(messages, null, 2), 'utf-8');
    }

    res.json({
      success: true,
      message: 'Thank you! Your message has been sent successfully. I will get back to you soon.'
    });
  } catch (error) {
    console.error('Error saving contact message:', error);
    res.status(500).json({ success: false, message: 'Failed to send message. Please try again.' });
  }
});

// GET all contact messages (for Owner viewing)
router.get('/', async (req, res) => {
  try {
    if (getIsMongoConnected()) {
      const messages = await Message.find().sort({ createdAt: -1 });
      res.json({ success: true, data: messages });
    } else {
      let messages = [];
      if (fs.existsSync(messagesFilePath)) {
        try {
          messages = JSON.parse(fs.readFileSync(messagesFilePath, 'utf-8'));
        } catch (e) {
          messages = [];
        }
      }
      res.json({ success: true, data: messages });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve messages' });
  }
});

module.exports = router;
