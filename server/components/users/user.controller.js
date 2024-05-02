// user.controller.js

const userService = require("../users/user.service");

exports.createUser = async (req, res, next) => {
	try {
		console.log("createUser: ", req.params);
		const user = await userService.create(req.body);
		return res.status(200).json({ message: "Success", data: user });
	} catch (error) {
		return res.status(500).json({ message: "Error", error: error.message });
	}
};

exports.loginUser = async (req, res, next) => {
	console.log("Login User ", req.body);
	try {
		const { user, token } = await userService.login(req.body); // Call the login function from the service
		if (user) {
			return res
				.status(200)
				.json({ message: "Success", data: { user, token } }); // Return user and token
		} else {
			return res.status(404).json({ message: "Fail" });
		}
	} catch (error) {
		return res.status(500).json({ message: "Error", error: error.message });
	}
};

exports.findAll = (req, res, next) => {
	userService
		.getAll()
		.then((users) => res.json(users))
		.catch(next);
};

exports.findOne = (req, res, next) => {
	userService
		.getById(req.params.id)
		.then((user) => (user ? res.json(user) : res.sendStatus(404)))
		.catch(next);
};

exports.update = (req, res, next) => {
	userService
		.update(req.params.id, req.body)
		.then((user) => res.json(user))
		.catch(next);
};

exports.delete = (req, res, next) => {
	userService
		.changeStatus(req.params.id)
		.then(() => res.json({ message: "User deleted successfully" }))
		.catch(next);
};

exports.search = (req, res, next) => {
	userService
		.searchByKeyword(req.params.keyword)
		.then((users) => res.json(users))
		.catch(next);
};

exports.del = (req, res, next) => {
	userService
		.del(req.params.id)
		.then(() => res.json({ message: "User deleted successfully" }))
		.catch(next);
};
