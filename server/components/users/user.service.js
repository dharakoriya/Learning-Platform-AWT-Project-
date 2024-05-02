// user.service.js

const db = require("../../helpers/db.helper");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../config/db.config");

module.exports = {
	getAll,
	getById,
	create,
	update,
	del,
	changeStatus,
	searchByKeyword,
	login,
};

async function getAll() {
    return await db.User.findAll();
}


async function getById(id) {
	try {
		const response = await getUser(id);
		return response; // Return the response directly
	} catch (error) {
		throw error; // Throw the error to be caught by the caller
	}
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

async function login(params) {
	try {
		console.log("Login User Controller: ", params.email, params.password);
		const user = await db.User.findOne({
			where: { email: params.email, password: params.password },
		});

		if (!user) {
			throw new Error("Invalid email or password");
		}

		// Generate JWT token
		const token = jwt.sign({ userId: user.id, role: user.role }, jwtSecret, { expiresIn: "1h" });

		console.log("user: ", user);
		return { user, token }; // Return both user and token
	} catch (error) {
		console.error("Error occurred while logging in:", error);
		throw error;
	}
}

async function create(params) {
    if (await db.User.findOne({ where: { username: params.username } })) {
        return "User " + params.username + " is already exists";
    }
    const user = new db.User(params);

    await user.save();
    return user;
}

// async function loginUser(params) {
// 	try {
// 		console.log("Login User Controller: ", params.email, params.password);
// 		const user = await db.User.findOne({
// 			where: { email: params.email, password: params.password },
// 		});
// 		console.log("user: ", user);
// 		return user;
// 	} catch (error) {
// 		console.error("Error occurred while logging in:", error);
// 		throw error;
// 	}
// }



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

async function getUser(id) {
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
