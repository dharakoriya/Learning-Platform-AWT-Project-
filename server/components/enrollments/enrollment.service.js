const db = require("../../helpers/db.helper");

module.exports = {
	getAll,
	getById,
	create,
	update,
	del,
};

async function getAll() {
	return await db.Enrollment.findAll();
}

async function getById(id) {
	return await db.Enrollment.findByPk(id);
}

async function create(params) {
	try {
		// Check if an enrollment with the same user_id and course_id already exists
		const existingEnrollment = await db.Enrollment.findOne({
			user_id: params.user_id,
			course_id: params.course_id,
		});

		if (existingEnrollment) {
			// Enrollment already exists, handle the duplication (throw an error, return null, etc.)
			// For example:
			console.log("Enrollment already exists");
		}

		// No duplication found, proceed to save the enrollment
		const enrollment = new db.Enrollment(params);
		await enrollment.save();
		return enrollment;
	} catch (error) {
		// Handle any errors (e.g., database errors, validation errors)
		console.error("Error creating enrollment:", error);
		throw error; // Rethrow the error to be handled by the caller
	}
}


async function update(id, params) {
	const enrollment = await getById(id);
	if (!enrollment) throw "Enrollment not found";
	Object.assign(enrollment, params);
	await enrollment.save();
	return enrollment;
}

async function del(id) {
	const enrollment = await getById(id);
	if (!enrollment) throw "Enrollment not found";
	await enrollment.destroy();
	return "Enrollment deleted successfully";
}
