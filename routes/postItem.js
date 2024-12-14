const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// POST: Add a new item
router.post('/', async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: 'Error creating item', error: err });
  }
});

module.exports = router;
