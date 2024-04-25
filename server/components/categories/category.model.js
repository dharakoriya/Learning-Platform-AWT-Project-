const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
	const attributes = {
		category_id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
		},
		category_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		category_image: {
			type: DataTypes.STRING, 
			allowNull: true, 
		},
	};
	// return sequelize.define("Category", attributes, {
	// 	tableName: "Categories", // Specify the table name explicitly
	// 	timestamps: false, // Disable timestamps if not needed
	// });

	const Category = sequelize.define("Category", attributes, {
		tableName: "Categories",
		timestamps: false,
	});

	Category.associate = (models) => {
		Category.hasMany(models.Course, { foreignKey: "category_id" });
	};

	return Category;
}
