const db = require("../../helpers/db.helper");

module.exports = {
    getAll,
    getById,
    create,
    update,
    del,
};

async function getAll() {
    return await db.Category.findAll();
}

async function getById(id) {
    return await db.Category.findByPk(id);
}

async function create(params) {
    return await db.Category.create(params);
}

async function update(id, params) {
    const category = await getById(id);
    if (!category) throw 'Category not found';
    Object.assign(category, params);
    await category.save();
    return category;
}

async function del(id) {
    const category = await getById(id);
    if (!category) throw 'Category not found';
    await category.destroy();
}
