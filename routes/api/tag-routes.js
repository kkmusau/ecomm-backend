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

 // create a new tag
router.post('/', (req, res) => {
  try {
    const data = await Tag.create({
      product_id: req.body.product_id,
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

 // update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  try {
		const data = await Tag.update(
			{ tag_name: req.body.tag_name },
			{where: 
        {id: req.params.id,},
			});

		if (!data) {
			res.status(404).json({ message: 'No Tag with this id!' });
			return;
		}
		res.status(200).json(data);
	} catch (err) {
		res.status(500).json(err);
	}
});

// delete on tag by its `id` value
router.delete('/:id', (req, res) => {
  try {
		const data = await Tag.destroy({
			where: {id: req.params.id,},
		});


		if (!data) {
			res.status(404).json({ message: 'No Tag found with that id!' });
			return;
		}
		res.status(200).json(data);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
