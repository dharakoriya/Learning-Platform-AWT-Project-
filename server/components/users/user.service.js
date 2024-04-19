const db = require("../../helpers/db.helper");
const { Op } = require("sequelize");

module.exports = {
    getAll,
    getById,
    create,
    update,
    del,
    changeStatus,
    searchByKeyword,
};

async function getAll() {
    return await db.User.findAll();
}

async function getById(id, callback) {
    getStudent(id)
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function update(id, params) {
    const user = await getStudent(id);
    const nameChanged = params.username && params.username !== user.username;
    if (nameChanged && (await db.User.findOne({ where: { username: params.username } }))) {
        return "User with name " + params.username + " is already exists";
    }
    Object.assign(user, params);
    await user.save();
    return user;
}

async function create(params) {
    if (await db.User.findOne({ where: { username: params.username } })) {
        return "User " + params.username + " is already exists";
    }
    const user = new db.User(params);

    await user.save();
    return user;
}

async function changeStatus(id) {
    const user = await getStudent(id);
    if (user.role === 'Admin') {
        return "Cannot deactivate admin user";
    }
    user.role = user.role === 'User' ? 'Admin' : 'User';
    await user.save();
    return user;
}

async function searchByKeyword(searchKeyword) {
    const user = await db.User.findAll({
        where: {
            [Op.or]: [
                { username: { [Op.like]: "%" + searchKeyword + "%" } },
                { email: { [Op.like]: "%" + searchKeyword + "%" } }
            ]
        }
    });

    if (!user || user == []) return "no User found";
    return user;
}

async function getStudent(id) {
    const user = await db.User.findByPk(id);
    if (!user) return "User not found";
    return user;
}

async function del(userId) {
    const user = await getStudent(userId);
    if (!user) return "User not found";
    if (user.role === 'Admin') {
        return "Cannot delete admin user";
    }
    await user.destroy();
    return "User deleted successfully";
}
