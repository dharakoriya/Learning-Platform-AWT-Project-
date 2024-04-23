const express = require("express");
const router = express.Router();
const courseMaterialController = require("./coursematerial.controller");

router.post("/", courseMaterialController.create);
router.get("/", courseMaterialController.findAll);
router.get("/:id", courseMaterialController.findOne);
router.put("/:id", courseMaterialController.update);
router.delete("/:id", courseMaterialController.delete);

module.exports = router;
