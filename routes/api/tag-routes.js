const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
	// find all tags
	try {
		const data = await Tag.findAll({
			include: { model: Product },
		});
		if (!data) {
			res.status(404).json({ message: 'No Tag with this id!' });
			return;
		}
		res.status(200).json(data);
	} catch (error) {
		res.status(500).json(error);
	}
	// be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
	// find a single tag by its `id`
	try {
		const data = await Tag.findByPk(req.params.id, {
			include: { model: Product },
		});
		if (!data) {
			res.status(404).json({ message: 'No Tag with this id!' });
			return;
		}
		res.status(200).json(data);
	} catch (error) {
		res.status(500).json(error);
	}
	// be sure to include its associated Product data
});

router.post('/', async (req, res) => {
	// create a new tag
	try {
		const data = await Tag.create({
			product_id: req.body.product_id,
		});
		if (!data) {
			res.status(404).json({ message: 'No Tag with this id!' });
			return;
		}
		res.status(200).json(data);
	} catch (error) {
		res.status(500).json(error);
	}
});

router.put('/:id', async (req, res) => {
	// update a tag's name by its `id` value
	try {
		const data = await Tag.update(
			{ tag_name: req.body.tag_name },
			{
				where: {
					id: req.params.id,
				},
			});
		if (!data) {
			res.status(404).json({ message: 'No Tag with this id!' });
			return;
		}
		res.status(200).json(data);
	} catch (error) {
		res.status(500).json(error);
	}
});

router.delete('/:id', async (req, res) => {
	// delete on tag by its `id` value
	try {
		const data = await Tag.destroy({
			where: {
				id: req.params.id,
			},
		});
		if (!data) {
			res.status(404).json({ message: 'No Tag found with that id!' });
			return;
		}
		res.status(200).json(data);
	} catch (error) {
		res.status(500).json(error);
	}
});
module.exports = router;
