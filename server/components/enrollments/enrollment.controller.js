const enrollmentService = require("../enrollments/enrollment.service");

exports.createEnrollment = async (req, res, next) => {
	try {
		const enrollment = await enrollmentService.create(req.body);
		return res.status(200).json({ message: "Success", data: enrollment });
	} catch (error) {
		return res.status(500).json({ message: "Error", error: error.message });
	}
};

exports.findAllEnrollments = (req, res, next) => {
    console.log("findAllEnrollment  is called");
	enrollmentService
		.getAll()
		.then((enrollments) => res.json(enrollments))
        .catch(next);

};

exports.findEnrollmentById = (req, res, next) => {
	enrollmentService
		.getById(req.params.id)
		.then((enrollment) =>
			enrollment ? res.json(enrollment) : res.sendStatus(404)
		)
		.catch(next);
};

exports.updateEnrollment = (req, res, next) => {
	enrollmentService
		.update(req.params.id, req.body)
		.then((enrollment) => res.json(enrollment))
		.catch(next);
};

exports.deleteEnrollment = (req, res, next) => {
	enrollmentService
		.del(req.params.id)
		.then((message) => res.json({ message }))
		.catch(next);
};
