// course.routes.js

const courseController = require("../courses/course.controller");
const express = require("express");
const router = express.Router();

router.post("/", courseController.create);
router.get("/", courseController.findAll);
router.get("/category/:id", courseController.findCourseByCatId);
router.get("/:id", courseController.findOne);
router.get("/search/:keyword", courseController.search);
router.put("/update/:id", courseController.update);
router.delete("/:id", courseController.delete);
module.exports = router;
