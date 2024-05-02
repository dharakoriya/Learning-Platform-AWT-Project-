// CategoryManagement.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import './CategoryManagement.css'; // Import CSS file for styling

const CategoryManagement = () => {
    const [categories, setCategories] = useState([]);
    const [editingCategory, setEditingCategory] = useState(null);
    const [deleteConfirmation, setDeleteConfirmation] = useState(null);
    const [editedCategory, setEditedCategory] = useState({}); // State to store edited category fields
    const [showAddModal, setShowAddModal] = useState(false); // State to control visibility of add category modal
    const [categoryImageFile, setCategoryImageFile] = useState(null); // State to store the uploaded course image file
    const [showConfirmation, setShowConfirmation] = useState(false); // State to control visibility of confirmation pop-up

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get("http://localhost:3001/categories");
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching Categories:", error);
        }
    };

    const deleteCategory = async (categoryId) => {
        try {
            await axios.delete(`http://localhost:3001/categories/${categoryId}`);
            fetchCategories();
            setDeleteConfirmation(null);
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    const addCategory = async () => {
        try {

            // Check if a file is selected
            if (!categoryImageFile) {
                console.error("No file selected.");
                return;
            }

            const formData = new FormData();
            formData.append('file', categoryImageFile);


            const response = await axios.post("http://localhost:3001/categories/upload", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const imagePath = response.data.imagePath;


            const updateCategory = { ...editedCategory, category_image: imagePath };

            // Send API request to add category with editedCategory state
            await axios.post("http://localhost:3001/categories", updateCategory);
            // Reset editedCategory state
            setEditedCategory({});

            setCategoryImageFile(null);

            // Fetch updated categories
            fetchCategories();
            // Close the modal
            setShowAddModal(false);

            // Show confirmation pop-up
            setShowConfirmation(true);

            setTimeout(() => {
                setShowConfirmation(false);
            }, 3000);

        } catch (error) {
            console.error("Error adding category:", error);
        }
    };

    const updateCategory = async (categoryId, updatedFields) => {
        try {
            // Send API request to update category with updatedFields
            await axios.put(`http://localhost:3001/categories/${categoryId}`, updatedFields);
            // Fetch updated categories
            fetchCategories();
            // Reset editing state
            setEditingCategory(null);
            // Reset edited category fields
            setEditedCategory({});
        } catch (error) {
            console.error("Error updating category:", error);
        }
    };

    return (
        <div className="category-management-container">
            <h2>Manage Categories</h2>
            <div className="category-buttons">
                <button className="add-category-button" onClick={() => setShowAddModal(true)}>Add Category</button>
            </div>
            <table className="category-table">
                <thead>
                    <tr>
                        <th>Category Name</th>
                        <th>Description</th>
                        <th>Category Image</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category.category_id}>
                            <td>
                                {editingCategory === category.category_id ? (
                                    <input
                                        type="text"
                                        value={editedCategory.category_name || category.category_name}
                                        onChange={(e) => setEditedCategory({ ...editedCategory, category_name: e.target.value })}
                                    />
                                ) : (
                                    category.category_name
                                )}
                            </td>
                            <td>
                                {editingCategory === category.category_id ? (
                                    <input
                                        type="text"
                                        value={editedCategory.description || category.description}
                                        onChange={(e) => setEditedCategory({ ...editedCategory, description: e.target.value })}
                                    />
                                ) : (
                                    category.description
                                )}
                            </td>
                            <td>
                                {editingCategory === category.category_id ? (
                                    <input
                                        type="text"
                                        value={editedCategory.category_image || category.category_image}
                                        onChange={(e) => setEditedCategory({ ...editedCategory, category_image: e.target.value })}
                                    />
                                ) : (
                                    <img src={'../' + category.category_image} alt={category.category_image} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                                )}
                            </td>
                            {/* <td>
                                {editingCategory === category.category_id ? (
                                    <input
                                        type="file"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                // Assuming you have some function to upload the image and get its path
                                                uploadImageAndGetPath(file).then((imagePath) => {
                                                    setEditedCategory({ ...editedCategory, category_image: imagePath });
                                                });
                                            }
                                        }}
                                    />
                                ) : (
                                    <img src={category.category_image} alt="Category Image" />
                                )}
                            </td> */}

                            <td>
                                {editingCategory === category.category_id ? (
                                    <button className="save-button" onClick={() => updateCategory(category.category_id, editedCategory)}>Save</button>
                                ) : (
                                    <button className="edit-button" onClick={() => {
                                        setEditingCategory(category.category_id);
                                        setEditedCategory(category); // Set editedCategory to current category when editing starts
                                    }}>Edit</button>
                                )}
                            </td>
                            <td>
                                <button className="delete-button" onClick={() => setDeleteConfirmation(category)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
            {deleteConfirmation && (
                <div className="modal">
                    <div className="modal-content">
                        <p>Are you sure you want to delete {deleteConfirmation.category_name}?</p>
                        <button className="confirm-button" onClick={() => deleteCategory(deleteConfirmation.category_id)}>Confirm</button>
                        <button className="cancel-button" onClick={() => setDeleteConfirmation(null)}>Cancel</button>
                    </div>
                </div>
            )}
            {showAddModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Add Category</h2>
                        <label>Category Name:</label>
                        <input
                            type="text"
                            value={editedCategory.category_name || ""}
                            onChange={(e) => setEditedCategory({ ...editedCategory, category_name: e.target.value })}
                        />
                        <label>Description:</label>
                        <input
                            type="text"
                            value={editedCategory.description || ""}
                            onChange={(e) => setEditedCategory({ ...editedCategory, description: e.target.value })}
                        />
                        <label>Category Image:</label>
                        <input
                            type="file"
                            onChange={(e) => setCategoryImageFile(e.target.files[0])}
                        />
                        <div className="modal-buttons">
                            <button className="confirm-button" onClick={addCategory}>Add Category</button>
                            <button className="cancel-button" onClick={() => {
                                setShowAddModal(false);
                                setEditedCategory({});
                            }}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
            {showConfirmation && (
                <div className="modal">
                    <div className="modal-content">
                        <p>Category added successfully!</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryManagement;
