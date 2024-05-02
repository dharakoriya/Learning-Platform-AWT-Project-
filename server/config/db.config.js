const MYSQL_DB_CONFIG = {
	HOST: "localhost",
	USER: "root",
	PORT: 3306,
	PASSWORD: "",
	DB: "pathshala",
};

const jwtSecret = "jwtSecret"; // Replace "your_secret_key_here" with your actual secret key

module.exports = {
	MYSQL_DB_CONFIG,
	jwtSecret,
};
