const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// PUT: Update an item by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: 'Error updating item', error: err });
  }
});

module.exports = router;
