const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// DELETE: Delete an item by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ message: 'Item deleted', deletedItem });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting item', error: err });
  }
});

module.exports = router;
