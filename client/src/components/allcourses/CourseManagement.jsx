// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import './CourseManagement.css'; // Import CSS file for styling

// const CourseManagement = () => {
//     const [courses, setCourses] = useState([]);
//     const [editingCourse, setEditingCourse] = useState(null);
//     const [deleteConfirmation, setDeleteConfirmation] = useState(null);
//     const [editedCourse, setEditedCourse] = useState({}); // State to store edited course fields
//     const [showAddModal, setShowAddModal] = useState(false); // State to control visibility of add course modal
//     const [categories, setCategories] = useState([]); // State to store categories
//     const [instructors, setInstructors] = useState([]); // State to store instructors

//     useEffect(() => {
//         fetchCourses();
//         fetchCategories();
//         fetchInstructors();
//     }, []);

//     const fetchCourses = async () => {
//         try {
//             const coursesResponse = await axios.get("http://localhost:3001/courses");
//             const categoriesResponse = await axios.get("http://localhost:3001/categories");
//             const coursesWithCategoryName = coursesResponse.data.map(course => ({
//                 ...course,
//                 category: categoriesResponse.data.find(cat => cat.category_id === course.category_id)?.category_name || "Unknown Category"
//             }));
//             setCourses(coursesWithCategoryName);
//         } catch (error) {
//             console.error("Error fetching Courses:", error);
//         }
//     };

//     const fetchCategories = async () => {
//         try {
//             const response = await axios.get("http://localhost:3001/categories");
//             setCategories(response.data);
//         } catch (error) {
//             console.error("Error fetching Categories:", error);
//         }
//     };

//     const fetchInstructors = async () => {
//         try {
//             const response = await axios.get("http://localhost:3001/user");
//             setInstructors(response.data);
//         } catch (error) {
//             console.error("Error fetching Instructors:", error);
//         }
//     };

//     const deleteCourse = async (courseId) => {
//         try {
//             await axios.delete(`http://localhost:3001/courses/${courseId}`);
//             fetchCourses();
//             setDeleteConfirmation(null);
//         } catch (error) {
//             console.error("Error deleting course:", error);
//         }
//     };

//     const addCourse = async () => {
//         try {
//             // Send API request to add course with editedCourse state
//             await axios.post("http://localhost:3001/courses", editedCourse);
//             // Reset editedCourse state
//             setEditedCourse({});
//             // Fetch updated courses
//             fetchCourses();
//             // Close the modal
//             setShowAddModal(false);
//         } catch (error) {
//             console.error("Error adding course:", error);
//         }
//     };

//     const updateCourse = async (courseId, updatedFields) => {
//         try {
//             // Send API request to update course with updatedFields
//             await axios.put(`http://localhost:3001/courses/update/${courseId}`, updatedFields);
//             // Fetch updated courses
//             fetchCourses();
//             // Reset editing state
//             setEditingCourse(null);
//             // Reset edited course fields
//             setEditedCourse({});
//         } catch (error) {
//             console.error("Error updating course:", error);
//         }
//     };

//     return (
//         <div className="course-management-container">
//             <h2>Manage Courses</h2>
//             <div className="course-buttons">
//                 <button className="add-course-button" onClick={() => setShowAddModal(true)}>Add Course</button>
//             </div>
//             <table className="course-table">
//                 <thead>
//                     <tr>
//                         <th>Course Name</th>
//                         <th>Category</th>
//                         <th>Instructor</th>
//                         <th>Price</th>
//                         <th>Description</th>
//                         <th>Course Image</th>
//                         <th>Edit</th>
//                         <th>Delete</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {courses.map((course) => (
//                         <tr key={course.course_id}>
//                             <td>
//                                 {editingCourse === course.course_id ? (
//                                     <input
//                                         type="text"
//                                         value={editedCourse.course_name || course.course_name}
//                                         onChange={(e) => setEditedCourse({ ...editedCourse, course_name: e.target.value })}
//                                     />
//                                 ) : (
//                                     course.course_name
//                                 )}
//                             </td>
//                             <td>{course.category}</td>
//                             <td>{course.instructorName}</td>
//                             <td>
//                                 {editingCourse === course.course_id ? (
//                                     <input
//                                         type="number"
//                                         value={editedCourse.price || course.price}
//                                         onChange={(e) => setEditedCourse({ ...editedCourse, price: e.target.value })}
//                                     />
//                                 ) : (
//                                     course.price
//                                 )}
//                             </td>
//                             <td>
//                                 {editingCourse === course.course_id ? (
//                                     <textarea
//                                         value={editedCourse.description || course.description}
//                                         onChange={(e) => setEditedCourse({ ...editedCourse, description: e.target.value })}
//                                     />
//                                 ) : (
//                                     course.description
//                                 )}
//                             </td>
//                             <td>
//                                 {editingCourse === course.course_id ? (
//                                     <input
//                                         type="text"
//                                         value={editedCourse.course_image || course.course_image}
//                                         onChange={(e) => setEditedCourse({ ...editedCourse, course_image: e.target.value })}
//                                     />
//                                 ) : (
//                                     course.course_image
//                                 )}
//                             </td>
//                             <td>
//                                 {editingCourse === course.course_id ? (
//                                     <button className="save-button" onClick={() => updateCourse(course.course_id, editedCourse)}>Save</button>
//                                 ) : (
//                                     <button className="edit-button" onClick={() => {
//                                         setEditingCourse(course.course_id);
//                                         setEditedCourse(course); // Set editedCourse to current course when editing starts
//                                     }}>Edit</button>
//                                 )}
//                             </td>
//                             <td>
//                                 <button className="delete-button" onClick={() => setDeleteConfirmation(course)}>Delete</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//             {deleteConfirmation && (
//                 <div className="modal">
//                     <div className="modal-content">
//                         <p>Are you sure you want to delete {deleteConfirmation.course_name}?</p>
//                         <button className="confirm-button" onClick={() => deleteCourse(deleteConfirmation.course_id)}>Confirm</button>
//                         <button className="cancel-button" onClick={() => setDeleteConfirmation(null)}>Cancel</button>
//                     </div>
//                 </div>
//             )}
//             {showAddModal && (
//                 <div className="modal">
//                     <div className="modal-content">
//                         <h2>Add Course</h2>
//                         <label>Course Name:</label>
//                         <input
//                             type="text"
//                             value={editedCourse.course_name || ""}
//                             onChange={(e) => setEditedCourse({ ...editedCourse, course_name: e.target.value })}
//                         />
//                         <label>Category:</label>
//                         <select
//                             value={editedCourse.category_id || ""}
//                             onChange={(e) => setEditedCourse({ ...editedCourse, category_id: e.target.value })}
//                         >
//                             <option value="">Select Category</option>
//                             {categories.map((category) => (
//                                 <option key={category.category_id} value={category.category_id}>{category.category_name}</option>
//                             ))}
//                         </select>
//                         <label>Instructor:</label>
//                         <select
//                             value={editedCourse.instructor_id || ""}
//                             onChange={(e) => setEditedCourse({ ...editedCourse, instructor_id: e.target.value })}
//                         >
//                             <option value="">Select Instructor</option>
//                             {instructors.map((instructor) => (
//                                 <option key={instructor.user_id} value={instructor.user_id}>{instructor.username}</option>
//                             ))}
//                         </select>
//                         <label>Price:</label>
//                         <input
//                             type="number"
//                             value={editedCourse.price || ""}
//                             onChange={(e) => setEditedCourse({ ...editedCourse, price: e.target.value })}
//                         />
//                         <label>Description:</label>
//                         <textarea
//                             value={editedCourse.description || ""}
//                             onChange={(e) => setEditedCourse({ ...editedCourse, description: e.target.value })}
//                         />
//                         <label>Course Image:</label>
//                         <input
//                             type="text"
//                             value={editedCourse.course_image || ""}
//                             onChange={(e) => setEditedCourse({ ...editedCourse, course_image: e.target.value })}
//                         />
//                         <div className="modal-buttons">
//                             <button className="confirm-button" onClick={addCourse}>Add Course</button>
//                             <button className="cancel-button" onClick={() => {
//                                 setShowAddModal(false);
//                                 setEditedCourse({});
//                             }}>Cancel</button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default CourseManagement;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import './CourseManagement.css'; // Import CSS file for styling

// const CourseManagement = () => {
//     const [courses, setCourses] = useState([]);
//     const [editingCourse, setEditingCourse] = useState(null);
//     const [deleteConfirmation, setDeleteConfirmation] = useState(null);
//     const [editedCourse, setEditedCourse] = useState({}); // State to store edited course fields
//     const [showAddModal, setShowAddModal] = useState(false); // State to control visibility of add course modal
//     const [categories, setCategories] = useState([]); // State to store categories
//     const [instructors, setInstructors] = useState([]); // State to store instructors
//     const [courseImageFile, setCourseImageFile] = useState(null); // State to store the uploaded course image file

//     useEffect(() => {
//         fetchCourses();
//         fetchCategories();
//         fetchInstructors();
//     }, []);

//     const fetchCourses = async () => {
//         try {
//             const coursesResponse = await axios.get("http://localhost:3001/courses");
//             const categoriesResponse = await axios.get("http://localhost:3001/categories");
//             const coursesWithCategoryName = coursesResponse.data.map(course => ({
//                 ...course,
//                 category: categoriesResponse.data.find(cat => cat.category_id === course.category_id)?.category_name || "Unknown Category"
//             }));
//             setCourses(coursesWithCategoryName);
//         } catch (error) {
//             console.error("Error fetching Courses:", error);
//         }
//     };

//     const fetchCategories = async () => {
//         try {
//             const response = await axios.get("http://localhost:3001/categories");
//             setCategories(response.data);
//         } catch (error) {
//             console.error("Error fetching Categories:", error);
//         }
//     };

//     const fetchInstructors = async () => {
//         try {
//             const response = await axios.get("http://localhost:3001/user");
//             setInstructors(response.data);
//         } catch (error) {
//             console.error("Error fetching Instructors:", error);
//         }
//     };

//     const deleteCourse = async (courseId) => {
//         try {
//             await axios.delete(`http://localhost:3001/courses/${courseId}`);
//             fetchCourses();
//             setDeleteConfirmation(null);
//         } catch (error) {
//             console.error("Error deleting course:", error);
//         }
//     };

//     const addCourse = async () => {
//         try {
//             // Check if a file is selected
//             if (!courseImageFile) {
//                 console.error("No file selected.");
//                 return;
//             }

//             // Create a FormData object to send the file
//             const formData = new FormData();
//             formData.append('file', courseImageFile);

//             // Send the file to the backend for upload
//             const response = await axios.post("http://localhost:3001/courses/upload", formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });

//             // Extract the image path from the response
//             const imagePath = response.data.imagePath;

//             // Update the course data with the image path
//             const updatedCourse = { ...editedCourse, course_image: imagePath };

//             // Send API request to add course with updated course data
//             await axios.post("http://localhost:3001/courses", updatedCourse);

//             // Reset editedCourse state and course image file
//             setEditedCourse({});
//             setCourseImageFile(null);

//             // Fetch updated courses
//             fetchCourses();

//             // Close the modal
//             setShowAddModal(false);
//         } catch (error) {
//             console.error("Error adding course:", error);
//         }
//     };


//     const updateCourse = async (courseId, updatedFields) => {
//         try {
//             // Send API request to update course with updatedFields
//             await axios.put(`http://localhost:3001/courses/update/${courseId}`, updatedFields);
//             // Fetch updated courses
//             fetchCourses();
//             // Reset editing state
//             setEditingCourse(null);
//             // Reset edited course fields
//             setEditedCourse({});
//         } catch (error) {
//             console.error("Error updating course:", error);
//         }
//     };

//     return (
//         <div className="course-management-container">
//             <h2>Manage Courses</h2>
//             <div className="course-buttons">
//                 <button className="add-course-button" onClick={() => setShowAddModal(true)}>Add Course</button>
//             </div>
//             <table className="course-table">
//                 <thead>
//                     <tr>
//                         <th>Course Name</th>
//                         <th>Category</th>
//                         <th>Instructor</th>
//                         <th>Price</th>
//                         <th>Description</th>
//                         <th>Course Image</th>
//                         <th>Edit</th>
//                         <th>Delete</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {courses.map((course) => (
//                         <tr key={course.course_id}>
//                             <td>
//                                 {editingCourse === course.course_id ? (
//                                     <input
//                                         type="text"
//                                         value={editedCourse.course_name || course.course_name}
//                                         onChange={(e) => setEditedCourse({ ...editedCourse, course_name: e.target.value })}
//                                     />
//                                 ) : (
//                                     course.course_name
//                                 )}
//                             </td>
//                             <td>{course.category}</td>
//                             <td>{course.instructorName}</td>
//                             <td>
//                                 {editingCourse === course.course_id ? (
//                                     <input
//                                         type="number"
//                                         value={editedCourse.price || course.price}
//                                         onChange={(e) => setEditedCourse({ ...editedCourse, price: e.target.value })}
//                                     />
//                                 ) : (
//                                     course.price
//                                 )}
//                             </td>
//                             <td>
//                                 {editingCourse === course.course_id ? (
//                                     <textarea
//                                         value={editedCourse.description || course.description}
//                                         onChange={(e) => setEditedCourse({ ...editedCourse, description: e.target.value })}
//                                     />
//                                 ) : (
//                                     course.description
//                                 )}
//                             </td>
//                             <td>
//                                 {editingCourse === course.course_id ? (
//                                     <input
//                                         type="text"
//                                         value={editedCourse.course_image || course.course_image}
//                                         onChange={(e) => setEditedCourse({ ...editedCourse, course_image: e.target.value })}
//                                     />
//                                 ) : (
//                                     <img src={'../' + course.course_image} alt={course.course_name} style={{ maxWidth: '100px', maxHeight: '100px' }} />
//                                 )}
//                             </td>
//                             <td>
//                                 {editingCourse === course.course_id ? (
//                                     <button className="save-button" onClick={() => updateCourse(course.course_id, editedCourse)}>Save</button>
//                                 ) : (
//                                     <button className="edit-button" onClick={() => {
//                                         setEditingCourse(course.course_id);
//                                         setEditedCourse(course); // Set editedCourse to current course when editing starts
//                                     }}>Edit</button>
//                                 )}
//                             </td>
//                             <td>
//                                 <button className="delete-button" onClick={() => setDeleteConfirmation(course)}>Delete</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//             {deleteConfirmation && (
//                 <div className="modal">
//                     <div className="modal-content">
//                         <p>Are you sure you want to delete {deleteConfirmation.course_name}?</p>
//                         <button className="confirm-button" onClick={() => deleteCourse(deleteConfirmation.course_id)}>Confirm</button>
//                         <button className="cancel-button" onClick={() => setDeleteConfirmation(null)}>Cancel</button>
//                     </div>
//                 </div>
//             )}
//             {showAddModal && (
//                 <div className="modal">
//                     <div className="modal-content">
//                         <h2>Add Course</h2>
//                         <label>Course Name:</label>
//                         <input
//                             type="text"
//                             value={editedCourse.course_name || ""}
//                             onChange={(e) => setEditedCourse({ ...editedCourse, course_name: e.target.value })}
//                         />
//                         <label>Category:</label>
//                         <select
//                             value={editedCourse.category_id || ""}
//                             onChange={(e) => setEditedCourse({ ...editedCourse, category_id: e.target.value })}
//                         >
//                             <option value="">Select Category</option>
//                             {categories.map((category) => (
//                                 <option key={category.category_id} value={category.category_id}>{category.category_name}</option>
//                             ))}
//                         </select>
//                         <label>Instructor:</label>
//                         <select
//                             value={editedCourse.instructor_id || ""}
//                             onChange={(e) => setEditedCourse({ ...editedCourse, instructor_id: e.target.value })}
//                         >
//                             <option value="">Select Instructor</option>
//                             {instructors.map((instructor) => (
//                                 <option key={instructor.user_id} value={instructor.user_id}>{instructor.username}</option>
//                             ))}
//                         </select>
//                         <label>Price:</label>
//                         <input
//                             type="number"
//                             value={editedCourse.price || ""}
//                             onChange={(e) => setEditedCourse({ ...editedCourse, price: e.target.value })}
//                         />
//                         <label>Description:</label>
//                         <textarea
//                             value={editedCourse.description || ""}
//                             onChange={(e) => setEditedCourse({ ...editedCourse, description: e.target.value })}
//                         />
//                         <label>Course Image:</label>
//                         <input
//                             type="file"
//                             onChange={(e) => setCourseImageFile(e.target.files[0])}
//                         />
//                         <div className="modal-buttons">
//                             <button className="confirm-button" onClick={addCourse}>Add Course</button>
//                             <button className="cancel-button" onClick={() => {
//                                 setShowAddModal(false);
//                                 setEditedCourse({});
//                                 setCourseImageFile(null);
//                             }}>Cancel</button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default CourseManagement;


import React, { useState, useEffect } from "react";
import axios from "axios";
import './CourseManagement.css'; // Import CSS file for styling

const CourseManagement = () => {
    const [courses, setCourses] = useState([]);
    const [editingCourse, setEditingCourse] = useState(null);
    const [deleteConfirmation, setDeleteConfirmation] = useState(null);
    const [editedCourse, setEditedCourse] = useState({}); // State to store edited course fields
    const [showAddModal, setShowAddModal] = useState(false); // State to control visibility of add course modal
    const [categories, setCategories] = useState([]); // State to store categories
    const [instructors, setInstructors] = useState([]); // State to store instructors
    const [courseImageFile, setCourseImageFile] = useState(null); // State to store the uploaded course image file
    const [showConfirmation, setShowConfirmation] = useState(false); // State to control visibility of confirmation pop-up

    useEffect(() => {
        fetchCourses();
        fetchCategories();
        fetchInstructors();
    }, []);

    const fetchCourses = async () => {
        try {
            const coursesResponse = await axios.get("http://localhost:3001/courses");
            const categoriesResponse = await axios.get("http://localhost:3001/categories");
            const coursesWithCategoryName = coursesResponse.data.map(course => ({
                ...course,
                category: categoriesResponse.data.find(cat => cat.category_id === course.category_id)?.category_name || "Unknown Category"
            }));
            setCourses(coursesWithCategoryName);
        } catch (error) {
            console.error("Error fetching Courses:", error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get("http://localhost:3001/categories");
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching Categories:", error);
        }
    };

    const fetchInstructors = async () => {
        try {
            const response = await axios.get("http://localhost:3001/user");
            setInstructors(response.data);
        } catch (error) {
            console.error("Error fetching Instructors:", error);
        }
    };

    const deleteCourse = async (courseId) => {
        try {
            await axios.delete(`http://localhost:3001/courses/${courseId}`);
            fetchCourses();
            setDeleteConfirmation(null);
        } catch (error) {
            console.error("Error deleting course:", error);
        }
    };

    const addCourse = async () => {
        try {
            // Check if a file is selected
            if (!courseImageFile) {
                console.error("No file selected.");
                return;
            }

            // Create a FormData object to send the file
            const formData = new FormData();
            formData.append('file', courseImageFile);

            // Send the file to the backend for upload
            const response = await axios.post("http://localhost:3001/courses/upload", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Extract the image path from the response
            const imagePath = response.data.imagePath;

            // Update the course data with the image path
            const updatedCourse = { ...editedCourse, course_image: imagePath };

            // Send API request to add course with updated course data
            await axios.post("http://localhost:3001/courses", updatedCourse);

            // Reset editedCourse state and course image file
            setEditedCourse({});
            setCourseImageFile(null);

            // Fetch updated courses
            fetchCourses();

            // Close the modal
            setShowAddModal(false);

            // Show confirmation pop-up
            setShowConfirmation(true);

            setTimeout(() => {
                setShowConfirmation(false);
            }, 3000);
        } catch (error) {
            console.error("Error adding course:", error);
        }
    };

    const updateCourse = async (courseId, updatedFields) => {
        try {
            // Send API request to update course with updatedFields
            await axios.put(`http://localhost:3001/courses/update/${courseId}`, updatedFields);
            // Fetch updated courses
            fetchCourses();
            // Reset editing state
            setEditingCourse(null);
            // Reset edited course fields
            setEditedCourse({});
        } catch (error) {
            console.error("Error updating course:", error);
        }
    };

    return (
        <div className="course-management-container">
            <h2>Manage Courses</h2>
            <div className="course-buttons">
                <button className="add-course-button" onClick={() => setShowAddModal(true)}>Add Course</button>
            </div>
            <table className="course-table">
                <thead>
                    <tr>
                        <th>Course Name</th>
                        <th>Category</th>
                        <th>Instructor</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Course Image</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course) => (
                        <tr key={course.course_id}>
                            <td>
                                {editingCourse === course.course_id ? (
                                    <input
                                        type="text"
                                        value={editedCourse.course_name || course.course_name}
                                        onChange={(e) => setEditedCourse({ ...editedCourse, course_name: e.target.value })}
                                    />
                                ) : (
                                    course.course_name
                                )}
                            </td>
                            <td>{course.category}</td>
                            <td>{course.instructorName}</td>
                            <td>
                                {editingCourse === course.course_id ? (
                                    <input
                                        type="number"
                                        value={editedCourse.price || course.price}
                                        onChange={(e) => setEditedCourse({ ...editedCourse, price: e.target.value })}
                                    />
                                ) : (
                                    course.price
                                )}
                            </td>
                            <td>
                                {editingCourse === course.course_id ? (
                                    <textarea
                                        value={editedCourse.description || course.description}
                                        onChange={(e) => setEditedCourse({ ...editedCourse, description: e.target.value })}
                                    />
                                ) : (
                                    course.description
                                )}
                            </td>
                            <td>
                                {editingCourse === course.course_id ? (
                                    <input
                                        type="text"
                                        value={editedCourse.course_image || course.course_image}
                                        onChange={(e) => setEditedCourse({ ...editedCourse, course_image: e.target.value })}
                                    />
                                ) : (
                                    <img src={'../' + course.course_image} alt={course.course_name} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                                )}
                            </td>
                            <td>
                                {editingCourse === course.course_id ? (
                                    <button className="save-button" onClick={() => updateCourse(course.course_id, editedCourse)}>Save</button>
                                ) : (
                                    <button className="edit-button" onClick={() => {
                                        setEditingCourse(course.course_id);
                                        setEditedCourse(course); // Set editedCourse to current course when editing starts
                                    }}>Edit</button>
                                )}
                            </td>
                            <td>
                                <button className="delete-button" onClick={() => setDeleteConfirmation(course)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {deleteConfirmation && (
                <div className="modal">
                    <div className="modal-content">
                        <p>Are you sure you want to delete {deleteConfirmation.course_name}?</p>
                        <button className="confirm-button" onClick={() => deleteCourse(deleteConfirmation.course_id)}>Confirm</button>
                        <button className="cancel-button" onClick={() => setDeleteConfirmation(null)}>Cancel</button>
                    </div>
                </div>
            )}
            {showAddModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Add Course</h2>
                        <label>Course Name:</label>
                        <input
                            type="text"
                            value={editedCourse.course_name || ""}
                            onChange={(e) => setEditedCourse({ ...editedCourse, course_name: e.target.value })}
                        />
                        <label>Category:</label>
                        <select
                            value={editedCourse.category_id || ""}
                            onChange={(e) => setEditedCourse({ ...editedCourse, category_id: e.target.value })}
                        >
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                                <option key={category.category_id} value={category.category_id}>{category.category_name}</option>
                            ))}
                        </select>
                        <label>Instructor:</label>
                        <select
                            value={editedCourse.instructor_id || ""}
                            onChange={(e) => setEditedCourse({ ...editedCourse, instructor_id: e.target.value })}
                        >
                            <option value="">Select Instructor</option>
                            {instructors.map((instructor) => (
                                <option key={instructor.user_id} value={instructor.user_id}>{instructor.username}</option>
                            ))}
                        </select>
                        <label>Price:</label>
                        <input
                            type="number"
                            value={editedCourse.price || ""}
                            onChange={(e) => setEditedCourse({ ...editedCourse, price: e.target.value })}
                        />
                        <label>Description:</label>
                        <textarea
                            value={editedCourse.description || ""}
                            onChange={(e) => setEditedCourse({ ...editedCourse, description: e.target.value })}
                        />
                        <label>Course Image:</label>
                        <input
                            type="file"
                            onChange={(e) => setCourseImageFile(e.target.files[0])}
                        />
                        <div className="modal-buttons">
                            <button className="confirm-button" onClick={addCourse}>Add Course</button>
                            <button className="cancel-button" onClick={() => {
                                setShowAddModal(false);
                                setEditedCourse({});
                                setCourseImageFile(null);
                            }}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
            {showConfirmation && (
                <div className="modal">
                    <div className="modal-content">
                        <p>Course added successfully!</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CourseManagement;
