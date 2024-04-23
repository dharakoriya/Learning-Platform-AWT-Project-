const courseMaterialService = require("./coursematerials.service");

exports.create = async (req, res, next) => {
	try {
		const courseMaterial = await courseMaterialService.create(req.body);
		res.status(201).json(courseMaterial);
	} catch (error) {
		next(error);
	}
};

exports.findAll = async (req, res, next) => {
	try {
		const courseMaterials = await courseMaterialService.getAll();
		res.json(courseMaterials);
	} catch (error) {
		next(error);
	}
};

exports.findOne = async (req, res, next) => {
	try {
		const courseMaterial = await courseMaterialService.getById(req.params.id);
		if (courseMaterial) {
			res.json(courseMaterial);
		} else {
			res.sendStatus(404);
		}
	} catch (error) {
		next(error);
	}
};

exports.update = async (req, res, next) => {
	try {
		const courseMaterial = await courseMaterialService.update(
			req.params.id,
			req.body
		);
		res.json(courseMaterial);
	} catch (error) {
		next(error);
	}
};

exports.delete = async (req, res, next) => {
	try {
		await courseMaterialService.del(req.params.id);
		res.json({ message: "Course material deleted successfully" });
	} catch (error) {
		next(error);
	}
};
