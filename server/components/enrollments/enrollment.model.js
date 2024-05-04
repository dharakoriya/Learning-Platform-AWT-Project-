const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
	const attributes = {
		enrollment_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		user_id: { type: DataTypes.INTEGER, allowNull: false },
		course_id: { type: DataTypes.INTEGER, allowNull: false },
		enrollment_date: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
		completion_status: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: 0,
		},
	};
	const Enrollment = sequelize.define("Enrollment", attributes, {
		timestamps: false,
	});

    Enrollment.associate = (models) => {
        Enrollment.belongsTo(models.Enrollment, { foreignKey: "course_id" });
        Enrollment.belongsTo(models.Enrollment, {
					foreignKey: "user_id",
				});

    };

	return Enrollment;
}
