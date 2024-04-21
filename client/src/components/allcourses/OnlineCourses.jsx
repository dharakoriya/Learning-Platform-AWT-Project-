// import React, { useEffect, useState } from "react";
// import "./courses.css";
// import Heading from "../common/heading/Heading";
// import axios from 'axios';

// const Categories = () => {
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get('http://localhost:3001/categories/');
//       setCategories(response.data); // Assuming response.data is an array of category objects
//       console.log('Category Data:', response.data);
//     } catch (error) {
//       console.error('Error fetching Categories:', error);
//     }
//   };
import React, { useEffect, useState } from "react";
import "./courses.css";
import Heading from "../common/heading/Heading";
import axios from "axios";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

    const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3001/categories/count');
      setCategories(response.data); // Assuming response.data is an array of category objects
      console.log('Category Data:', response.data);
    } catch (error) {
      console.error('Error fetching Categories:', error);
    }
  };
  // const fetchCategories = async () => {
  //   try {
  //     // Fetch categories and their course counts
  //     const [categoriesResponse, courseCountsResponse] = await Promise.all([
  //       axios.get('http://localhost:3001/categories/'),
  //       axios.get('http://localhost:3001/categories/count')
  //     ]);

  //     console.log('Categories Response:', categoriesResponse.data);
  //     console.log('Course Counts Response:', courseCountsResponse.data);

  //     // Combine category data with course counts
  //     const categoriesWithCounts = categoriesResponse.data.map(category => ({
  //       ...category,
  //       course_count: (courseCountsResponse.data.find(item => item.category_id === category.category_id)?.count || 0)
        
  //     }));

  //     setCategories(categoriesWithCounts);
  //     console.log('Category Data with Course Counts:', categoriesWithCounts);
  //   } catch (error) {
  //     console.error('Error fetching Categories:', error);
  //   }
  // };


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
              <span>{category.course_count}+ Courses</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Categories;
