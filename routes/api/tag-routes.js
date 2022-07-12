const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// find all tags
router.get('/', (req, res) => {
  try {
     // be sure to include its associated Product data
    const data = await Tag.finAll({
      include: { model: Product},
    });
  
    if (!data) {
      res.status(404).json({ message: 'No tags found with this id!'});
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

 // find a single tag by its `id`
router.get('/:id', (req, res) => {
   // be sure to include its associated Product data
  try {
    const data = await Tag.findbyPk(req.params.id, { 
      include: { model: Product},
  });

  if (!data) {
    res.status(404).json({ message: 'No tags found with this id!'});
    return;
  }
  res.status(200).json(data);
} catch (err) {
  res.status(500).json(err);
}
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
