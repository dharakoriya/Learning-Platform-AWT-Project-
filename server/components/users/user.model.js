const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
	const attributes = {
		user_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		username: { type: DataTypes.STRING, allowNull: false },
		password: { type: DataTypes.STRING, allowNull: false },
		email: { type: DataTypes.STRING, allowNull: false },
		role: { type: DataTypes.ENUM("Admin", "User"), allowNull: false },
		createdAt: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
			allowNull: true,
		},
		updatedAt: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
			allowNull: true,
		}, // Set default value to current timestamp
	};
	return sequelize.define("User", attributes);
}
