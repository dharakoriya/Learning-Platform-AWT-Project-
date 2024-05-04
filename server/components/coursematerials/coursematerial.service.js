const db = require("../../helpers/db.helper");

module.exports = {
	getAll,
	getById,
	create,
	update,
	del,
	getCourseVideo,
};

async function getAll() {
	return await db.CourseMaterial.findAll();
}

async function getById(id) {
	return await db.CourseMaterial.findByPk(id);
}

async function create(params) {
	return await db.CourseMaterial.create(params);
}

async function getCourseVideo(id) {
	return await db.CourseMaterial.findAll({ where: { course_id: id } });
}

async function update(id, params) {
	const courseMaterial = await getById(id);
	if (!courseMaterial) throw "Course material not found";
	Object.assign(courseMaterial, params);
	await courseMaterial.save();
	return courseMaterial;
}

async function del(id) {
	const courseMaterial = await getById(id);
	if (!courseMaterial) throw "Course material not found";
	await courseMaterial.destroy();
}
