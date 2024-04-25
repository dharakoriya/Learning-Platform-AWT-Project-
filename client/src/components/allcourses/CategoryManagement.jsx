// CategoryManagement.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";

const CategoryManagement = () => {
    const [categories, setCategories] = useState([]);

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

    // Function to delete category
    const deleteCategory = async (categoryId) => {
        try {
            await axios.delete(`http://localhost:3001/categories/${categoryId}`);
                fetchCategories(); // Fetch categories again to update the list
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    // Function to edit category
    // Implement as per your requirement

    // Function to add new category
    // Implement as per your requirement

    return (
        <div>
            <h2>Manage Categories</h2>
            <ul>
                {categories.map((category) => (
                    <li key={category.category_id}>
                        <div>{category.category_name}</div>
                        <button>Edit</button>
                        <button onClick={() => deleteCategory(category.category_id)}>Delete</button>
                    </li>
                ))}
            </ul>
            {/* Button to add new category */}
            <button>Add New Category</button>
        </div>
    );
};

export default CategoryManagement;