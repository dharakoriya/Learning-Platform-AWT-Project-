const express = require('express');
const course = require("./components/courses/course.routes.js"); // Updated here
const category = require("./components/categories/category.routes.js");
const user = require("./components/users/user.routes.js");
const coursematerial = require("./components/coursematerials/coursematerial.routes.js");
const errors = require("./middleware/db.error.js");
const enrollment = require("./components/enrollments/enrollment.routes.js")
const app = express();
const cors = require("cors");
const port = 3001;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errors.errorHandler);
app.use("/courses", course); // Updated here
app.use("/categories",category);
app.use("/user", user);
app.use("/coursematerials", coursematerial)
app.use("/enrollments", enrollment);
app.listen(port, () => console.log('Hello Client'));