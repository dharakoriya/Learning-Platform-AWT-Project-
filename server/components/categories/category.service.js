const db = require("../../helpers/db.helper");
const { Sequelize } = require("sequelize");

module.exports = {
	getCountOfCoursesByCategory,
	getAll,
	getById,
	create,
	update,
	del,
};

async function getAll() {
	return await db.Category.findAll({ where: { deletedAt: null } });
}

async function getById(id) {
	return await db.Category.findByPk(id);
}

async function create(params) {
	// Create a new course instance and save it
	const category = new db.Category(params);
	await category.save();
	return category;
}

async function getCountOfCoursesByCategory() {
	try {
		const categories = await db.Category.findAll({
			where: { deletedAt: null },
		});
		const categoriesWithCounts = await Promise.all(
			categories.map(async (category) => {
				const courseCount = await db.Course.count({
					where: { category_id: category.category_id },
				});
				return { ...category.toJSON(), course_count: courseCount };
			})
		);
		return categoriesWithCounts;
	} catch (error) {
		throw error;
	}
}

async function update(id, params) {
	const category = await getById(id);
	if (!category) throw "Category not found";
	Object.assign(category, params);
	await category.save();
	return category;
}

async function del(id) {
	const category = await getById(id);
	if (!category) throw "Category not found";
	await category.update({ deletedAt: new Date() });
}
