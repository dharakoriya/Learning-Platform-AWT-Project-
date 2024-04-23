//for config
const { MYSQL_DB_CONFIG } = require("../config/db.config");

//for mysql connection
const mysql = require("mysql2/promise");

//for Sequelize ORM
const { Sequelize } = require("sequelize");

module.exports = db = {};

initialize();

async function initialize() {
	const { HOST, USER, PORT, PASSWORD, DB } = MYSQL_DB_CONFIG;

	const connection = await mysql.createConnection({
		host: HOST,
		user: USER,
		password: PASSWORD,
	});

	await connection.query(`Create database if not exists \`${DB}\`;`);

	//connect to db
	const sequelize = new Sequelize(DB, USER, PASSWORD, {
		dialect: "mysql",
		host: HOST,
	});

	db.Course = require("../components/courses/course.model")(sequelize);
	db.Category = require("../components/categories/category.model")(sequelize);
	db.User = require("../components/users/user.model")(sequelize);
	db.CourseMaterial = require("../components/coursematerials/coursematerial.model")(sequelize);
	// Updated here

	await sequelize.sync({ alter: true });
	// await sequelize.sync({ alter: true });
}
