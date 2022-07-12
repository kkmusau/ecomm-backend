const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  try {
    const data = await Category.findAll({
      include: { model: Product},
    });
    if (!data) {
      res.status(404).json({ message: 'No category found'});
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.get('/:id', async(req, res) => {
  // find one category by its `id` value
  try {
    // findbyPK finds only a single category from the table
    const data = await Category.findByPk(req.params.id , 
    { include: { model: Product},
    });

    if (!data) {
      res.status(404).json({ message: 'No category found'});
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const data = await Category.create({category_name: req.body.category_name});
    if (!data) {
      res.status(404).json({ message: 'No category found'});
      return;
    }
    res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
      }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const data = await Category.update(req.body, {
      where: { id: req.params.id },
    });
    if (!data) {
      res.status(404).json({ message: 'No category found'});
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
    }

}); 

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const data = await Category.destroy({ 
      where: {id: req.params.id},
    });
    if (!data) {
      res.status(404).json({ message: 'No category found'});
      return;
      }
      res.status(200).json(data);
      } catch (err) {
        res.status(500).json(err);
      }
});

module.exports = router;
