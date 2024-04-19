const db = require("../../helpers/db.helper");
const { Op } = require("sequelize");

module.exports = {
    getAll,
    getById,
    create,
    update,
    del,
    searchByKeyword,
};
async function getAll() {
    return await db.Course.findAll();
}
async function getById(id, callback) {
    getCourse(id)
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}
async function update(id, params) {
    const course = await getCourse(id);
    // Update course properties here
    Object.assign(course, params);
    await course.save();
    return course;
}
async function create(params) {
    // Create a new course instance and save it
    const course = new db.Course(params);
    await course.save();
    return course;
}
async function searchByKeyword(searchKeyword) {
    // Search for courses by keyword
    const courses = await db.Course.findAll({
        where: { course_name: { [Op.like]: "%" + searchKeyword + "%" } },
    });

    if (!courses || courses.length === 0) return "No courses found";
    return courses;
}
async function getCourse(id) {
    // Get course by id
    const course = await db.Course.findByPk(id);
    if (!course) return "Course not found";
    return course;
}
async function del(id) {
    // Delete course by id
    return await db.Course.destroy({
        where: { id }
    });
}
