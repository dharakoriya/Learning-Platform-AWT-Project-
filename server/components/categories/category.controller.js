const categoryService = require("../categories/category.service");

exports.create = (req, res, next) => {
	categoryService
		.create(req.body)
		.then((category) => res.status(201).json(category))
		.catch(next);
};

exports.getCourseCounts = async (req, res, next) => {
	try {
		const categoryCounts = await categoryService.getCountOfCoursesByCategory();
		console.log(categoryCounts);
		res.json(categoryCounts);
	} catch (error) {
		next(error);
	}
};

exports.findAll = (req, res, next) => {
	categoryService
		.getAll()
		.then((categories) => res.json(categories))
		.catch(next);
};

exports.findCount = (req, res, next) => {
	categoryService
		.getCountOfCoursesByCategory()
		.then((categories) => res.json(categories))
		.catch(next);
};

exports.findOne = (req, res, next) => {
	categoryService
		.getById(req.params.id)
		.then((category) => (category ? res.json(category) : res.sendStatus(404)))
		.catch(next);
};

exports.update = (req, res, next) => {
	categoryService
		.update(req.params.id, req.body)
		.then((category) => res.json(category))
		.catch(next);
};

exports.delete = (req, res, next) => {
	categoryService
		.del(req.params.id)
		.then(() => res.json({ message: "Category deleted successfully" }))
		.catch(next);
};
