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
		const enrollment = new db.Enrollment(params);
		await enrollment.save();
		return enrollment;
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
