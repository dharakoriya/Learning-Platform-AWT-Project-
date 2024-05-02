// course.routes.js

const courseController = require("../courses/course.controller");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const directory = "..\client\public\images\courses";

// Check if the directory exists, if not, create it
if (!fs.existsSync(directory)) {
	fs.mkdirSync(directory, { recursive: true });
}

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "../client/public/images/courses");
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), courseController.addCourseImage);

router.post("/", courseController.create);
router.get("/", courseController.findAll);
router.get("/category/:id", courseController.findCourseByCatId);
router.get("/:id", courseController.findOne);
router.get("/search/:keyword", courseController.search);
router.put("/update/:id", courseController.update);
router.delete("/:id", courseController.delete);
module.exports = router;
