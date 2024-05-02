const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
	const attributes = {
		course_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		course_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		category_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		instructor_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		price: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		course_image: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		// Add deletedAt column for soft deletes
		deletedAt: {
			type: DataTypes.DATE,
			allowNull: true,
		},
	};

	const Course = sequelize.define("Course", attributes, {
		tableName: "Courses",
		timestamps: false,
		paranoid: true, // Enable soft deletes
	});

	Course.associate = (models) => {
		Course.belongsTo(models.Category, { foreignKey: "category_id" });
		Course.belongsTo(models.User, { foreignKey: "instructor_id" });
	};

	return Course;
}
