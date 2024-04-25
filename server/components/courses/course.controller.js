// course.controller.js

const courseService = require("../courses/course.service");

exports.create = (req, res, next) => {
	courseService
		.create(req.body)
		.then((course) => res.status(201).json(course))
		.catch(next);
};

exports.findAll = (req, res, next) => {
	// console.log("my id of category", req.params.id);

	courseService
		.getAll()
		.then((courses) => res.json(courses))
		.catch(next);
};

exports.findCourseByCatId = (req, res, next) => {
	console.log("findCourseByCatId", req.params.id);
	courseService
		.getCoursebyCategoryId(req.params.id)
		.then((courses) => res.json(courses))
		.catch(next);
};

exports.findOne = (req, res, next) => {
	courseService
		.getById(req.params.id)
		.then((course) => (course ? res.json(course) : res.sendStatus(404)))
		.catch(next);
};

exports.update = (req, res, next) => {
	courseService
		.update(req.params.id, req.body)
		.then((course) => res.json(course))
		.catch(next);
};

exports.delete = (req, res, next) => {
	courseService
		.del(req.params.id)
		.then(() => res.json({ message: "Course deleted successfully" }))
		.catch(next);
};

exports.search = (req, res, next) => {
	courseService
		.searchByKeyword(req.params.keyword)
		.then((courses) => res.json(courses))
		.catch(next);
};
