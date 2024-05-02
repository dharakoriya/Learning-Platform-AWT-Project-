const express = require('express');
const router = express.Router();
const categoryController = require("../categories/category.controller");
const multer = require("multer");
const fs = require("fs");
const directory = "..\client\public\images\category";

// Check if the directory exists, if not, create it
if (!fs.existsSync(directory)) {
	fs.mkdirSync(directory, { recursive: true });
}

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "../client/public/images/category");
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), categoryController.addCategoryImage);

router.get("/count", categoryController.getCourseCounts);
router.post("/", categoryController.create);
router.get("/", categoryController.findAll);
router.get("/:id", categoryController.findOne);
router.put("/:id", categoryController.update);
router.delete("/:id", categoryController.delete);

module.exports = router;
