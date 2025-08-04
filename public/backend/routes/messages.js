const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// @route   POST /api/messages
// @desc    Send a new message
router.post('/', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        
        const newMessage = new Message({
            name,
            email,
            message
        });

        const savedMessage = await newMessage.save();
        
        res.status(201).json(savedMessage);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router; 