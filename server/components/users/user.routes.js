const express = require("express");
const router = express.Router();
const userController = require("../users/user.controller");

router.post("/", userController.create);
router.get("/", userController.findAll);
router.get("/:id", userController.findOne);
router.get("/search/:keyword", userController.search);
router.put("/update/:id", userController.update);
router.delete("/:id", userController.delete);
router.delete("/del/:id", userController.del);

module.exports = router;
