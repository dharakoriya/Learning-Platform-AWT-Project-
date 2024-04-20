import React, { useEffect, useState } from "react";
import "./courses.css";
import Heading from "../common/heading/Heading";
import axios from 'axios';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3001/categories/');
      setCategories(response.data); // Assuming response.data is an array of category objects
      console.log('Category Data:', response.data);
      console.log(response.data.course_count);
    } catch (error) {
      console.error('Error fetching Categories:', error);
    }
  };

  return (
    <section className='online' id="courses">
      <div className='container'>
        <Heading subtitle='COURSES' title='Browse Our Online Courses' />
        <div className='content grid3'>
          {categories.map((category) => (
            <div className='box' key={category.category_id}>
              <div className='img'>
                <img src={category.category_image} alt={category.category_name} />
              </div>
              <h1>{category.category_name}</h1>
              <span>{category.course_count}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Categories;
