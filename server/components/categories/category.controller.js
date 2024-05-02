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

exports.addCategoryImage = async (req, res, next) => {
	try {
		// Log the file object received from the request
		console.log("Received file:", req.file);

		// Call the service method to handle file upload
		// const imagePath = await courseService.uploadCourseImage(req.file);
		res.status(200).json({
			message: "File uploaded successfully",
			imagePath: "./images/category/" + req.file.originalname,
		});
	} catch (error) {
		console.error("Error uploading file:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};