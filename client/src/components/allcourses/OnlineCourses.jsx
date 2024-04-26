// import React, { useEffect, useState } from "react";
// import "./courses.css";
// import Heading from "../common/heading/Heading";
// import axios from "axios";

// const Categories = () => {
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get('http://localhost:3001/categories/count');
//       setCategories(response.data);
//       console.log('Category Data:', response.data);
//     } catch (error) {
//       console.error('Error fetching Categories:', error);
//     }
//   };

//   return (
//     <section className='online' id="courses">
//       <div className='container'>
//         <Heading subtitle='COURSES' title='Browse Our Online Courses' />
//         <div className='content grid3'>
//           {categories.map((category) => (
//             <a href={`/courses/category/${category.category_id}`} key={category.category_id}>
//               <div className='box' key={category.category_id}>
//                 <div className='img'>
//                   <img src={category.category_image} alt={category.category_name} />
//                 </div>
//                 <h1>{category.category_name}</h1>
//                 <span>{category.course_count}+ Courses</span>
//               </div>
//             </a>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

// export default Categories;

// Onlinecourse.jsx

import React, { useEffect, useState } from "react";
import "./courses.css";
import Heading from "../common/heading/Heading";
import axios from "axios";

const Onlinecourse = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3001/categories/count");
      setCategories(response.data);
      console.log("Category Data:", response.data);
    } catch (error) {
      console.error("Error fetching Categories:", error);
    }
  };

  return (
    <section className="online" id="courses">
      <div className="container">
        <Heading subtitle="COURSES" title="Browse Our Online Courses" />
        <div className="content grid3">
          {categories.map((category) => (
            <a href={`/courses/category/${category.category_id}`} key={category.category_id}>

              <div className="box" key={category.category_id}>
                <div className="img">
                  <img src={category.category_image} alt={category.category_name} />
                </div>
                <h1>{category.category_name}</h1>
                <span>{category.course_count}+ Courses</span>
              </div>
            </a>
          ))}
        </div>
        <a href={`/category/manage`}>Manage Categories</a>
      </div>
    </section>
  );
};

export default Onlinecourse;