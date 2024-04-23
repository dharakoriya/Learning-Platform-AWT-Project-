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
		user_image: { type: DataTypes.STRING, allowNull: true }, // Add user_image field
		createdAt: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
			allowNull: true,
		},
		updatedAt: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
			allowNull: true,
		},
	};
	const User = sequelize.define("User", attributes, { timestamps: false });

	return User;
}
