const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// GET: Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    const itemNames = items.map(item => item.name);
    res.cookie('itemNames', JSON.stringify(itemNames), { httpOnly: false, maxAge: 24 * 60 * 60 * 1000 }); // 1 day expiration
    res.status(200).json(items);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching items', error: err });
  }
});

// GET: Get an item by ID
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(item);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching item', error: err });
  }
});

module.exports = router;
