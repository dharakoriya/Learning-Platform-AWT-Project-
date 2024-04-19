const express = require('express');
const course = require("./components/courses/course.routes.js"); // Updated here
const category = require("./components/categories/category.routes.js");
const errors = require("./middleware/db.error.js");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errors.errorHandler);
app.use("/courses", course); // Updated here
app.use("/categories",category);
app.listen(port, () => console.log('Hello Client'));
