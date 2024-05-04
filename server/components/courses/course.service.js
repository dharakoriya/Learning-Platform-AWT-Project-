// course.service.js

const db = require("../../helpers/db.helper");
const { Op } = require("sequelize");
const path = require("path");

module.exports = {
	getAll,
	getById,
	create,
	update,
	del,
	searchByKeyword,
	uploadCourseImage,
	getCoursebyCategoryId,
};

async function getAll() {
	const courses = await db.Course.findAll({ where: { deletedAt: null } });

	const coursesWithInstructors = await Promise.all(
		courses.map(async (course) => {
			console.log("Course:", course.toJSON());
			let instructorName = null;
			let instructorImage = null;
			if (course.instructor_id) {
				try {
					// console.log("C1", course.instructor_id);
					const instructor = await db.User.findByPk(course.instructor_id);

					console.log("Instructor:", instructor.toJSON());
					instructorName = instructor ? instructor.username : null;
					instructorImage = instructor ? instructor.user_image : null;
				} catch (error) {
					console.error("Error fetching instructor:", error);
				}
			}
			const category_name = await db.Category.findByPk(course.category_id);
			console.log("Category Name:", category_name.category_name);
			const lectureMaterials = await db.CourseMaterial.findAll({
				attributes: ["lecture_duration"],
				where: {
					course_id: course.course_id,
					material_type: "Lecture",
					lecture_duration: {
						[Op.ne]: null, // Exclude null durations
					},
				},
				logging: console.log, // This will log the SQL query to the console
			});
			console.log("lec:", lectureMaterials);

			// Calculate the total duration of lectures
			let total_length = 0;
			let total_lectures = 0;
			lectureMaterials.forEach((material) => {
				total_lectures++;
				// Convert TIME string to milliseconds and accumulate
				const [hours, minutes, seconds] = material.lecture_duration.split(":");
				total_length +=
					(parseInt(hours) * 3600 +
						parseInt(minutes) * 60 +
						parseInt(seconds)) *
					1000;
			});

			// Convert total_length back to TIME
			const seconds = Math.floor(total_length / 1000) % 60;
			const minutes = Math.floor(total_length / (1000 * 60)) % 60;
			const hours = Math.floor(total_length / (1000 * 60 * 60));
			total_length = `${hours}`;
			const cat_name = category_name.category_name;
			return {
				...course.toJSON(),
				instructorName,
				instructorImage,
				total_length,
				total_lectures,
				cat_name,
			};
		})
	);
	return coursesWithInstructors;
}

async function uploadCourseImage(file) {
	// Set the destination folder where the uploaded files will be stored
	console.log("Uploading image file:", file);
	const destination = "../client/public/images/courses";
	console.log("Destination:", destination);
	// Move the uploaded file to the destination folder
	await file.mv(path.join(destination, file.name));
	// Return the image path
	return path.join("../client/public/images/courses", file.name);
}


async function getById(id) {
	return await db.Course.findByPk(id);
}
async function update(id, params) {
	const course = await getCourse(id);
	// Update course properties here
	Object.assign(course, params);
	await course.save();
	return course;
}
async function create(params) {
	// Create a new course instance and save it
	const course = new db.Course(params);
	await course.save();
	return course;
}
async function searchByKeyword(searchKeyword) {
	// Search for courses by keyword
	const courses = await db.Course.findAll({
		where: { course_name: { [Op.like]: "%" + searchKeyword + "%" } },
	});

	if (!courses || courses.length === 0) return "No courses found";
	return courses;
}
async function getCourse(id) {
	// Get course by id
	const course = await db.Course.findByPk(id);
	if (!course) return "Course not found";
	return course;
}

async function getCoursebyCategoryId(id) {
	const courses = await db.Course.findAll({
		where: { category_id: id },
	});
	if (!courses) return "Course with that category id ${id} not found";
	const coursesWithInstructors = await Promise.all(
		courses.map(async (course) => {
			console.log("Course:", course.toJSON());
			let instructorName = null;
			let instructorImage = null;
			if (course.instructor_id) {
				try {
					console.log("C1", course.instructor_id);
					const instructor = await db.User.findByPk(course.instructor_id);
					console.log("Instructor:", instructor.toJSON());
					instructorName = instructor ? instructor.username : null;
					instructorImage = instructor ? instructor.user_image : null;
				} catch (error) {
					console.error("Error fetching instructor:", error);
				}
			}

			const lectureMaterials = await db.CourseMaterial.findAll({
				attributes: ["lecture_duration"],
				where: {
					course_id: course.course_id,
					material_type: "Lecture",
					lecture_duration: {
						[Op.ne]: null, // Exclude null durations
					},
				},
				logging: console.log, // This will log the SQL query to the console
			});
			console.log("lec:", lectureMaterials);

			// Calculate the total duration of lectures
			let total_length = 0;
			let total_lectures = 0;
			lectureMaterials.forEach((material) => {
				total_lectures++;
				// Convert TIME string to milliseconds and accumulate
				const [hours, minutes, seconds] = material.lecture_duration.split(":");
				total_length +=
					(parseInt(hours) * 3600 +
						parseInt(minutes) * 60 +
						parseInt(seconds)) *
					1000;
			});

			// Convert total_length back to TIME
			const seconds = Math.floor(total_length / 1000) % 60;
			const minutes = Math.floor(total_length / (1000 * 60)) % 60;
			const hours = Math.floor(total_length / (1000 * 60 * 60));
			total_length = `${hours}`;

			return {
				...course.toJSON(),
				instructorName,
				instructorImage,
				total_length,
				total_lectures,
			};
		})
	);
	return coursesWithInstructors;
	// return course;
}

async function del(id) {
	const course = await getById(id);
	if (!course) throw "Course not found";
	await course.update({ deletedAt: new Date() });
}
