const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
	const CourseMaterial = sequelize.define("CourseMaterial", {
		material_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		course_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		material_type: {
			type: DataTypes.ENUM("Lecture", "Quiz", "Assignment", "Notes"),
			allowNull: false,
		},
		material_title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		material_content: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		lecture_duration: {
			type: DataTypes.TIME,
			allowNull: true,
		},
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
	});

	CourseMaterial.associate = (models) => {
		CourseMaterial.belongsTo(models.Course, { foreignKey: "course_id" });
	};

	return CourseMaterial;
}
