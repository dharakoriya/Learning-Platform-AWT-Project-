const express = require("express");
const router = express.Router();
const enrollmentController = require("../enrollments/enrollment.controller");

router.get("/", enrollmentController.findAllEnrollments);
router.post("/", enrollmentController.createEnrollment);
router.get("/:id", enrollmentController.findEnrollmentById);
router.put("/:id", enrollmentController.updateEnrollment);
router.delete("/:id", enrollmentController.deleteEnrollment);

module.exports = router;
