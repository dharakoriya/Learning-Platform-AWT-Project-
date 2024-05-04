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

// import React, { useEffect, useState } from "react";
// import "./courses.css";
// import Heading from "../common/heading/Heading";
// import axios from "axios";
// // import jwt_decode from 'jwt-decode';


// const Onlinecourse = () => {
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get("http://localhost:3001/categories/count");
//       setCategories(response.data);
//       console.log("Category Data:", response.data);
//     } catch (error) {
//       console.error("Error fetching Categories:", error);
//     }
//   };
//   const userRole = localStorage.getItem('role');

//   // Decode token to extract user information
//   // const decodedToken = jwt_decode(token);

//   // Extract user role from decoded token
//   // const userRole = decodedToken.role;
//   return (
//     <section className="online" id="courses">
//       <div className="container">
//         <Heading subtitle="COURSES" title="Categories " />
//         {userRole === "Admin" && (
//           <a href={`/course/manage`} className="manage-btn">
//             Manage Categories
//           </a>
//         )}
//         <div className="content grid3">
//           {categories.map((category) => (
//             <a href={`/courses/category/${category.category_id}`} key={category.category_id}>

//               <div className="box" key={category.category_id}>
//                 <div className="img">
//                   <img src={category.category_image} alt={category.category_name} />
//                 </div>
//                 <h1>{category.category_name}</h1>
//                 <span>{category.course_count}+ Courses</span>
//               </div>
//             </a>
//           ))}
//         </div>
//         {/* {userRole === "Admin" && <a href={`/category/manage`}>Manage Categories</a>} */}
//       </div>
//     </section>
//   );
// };

// export default Onlinecourse;

import React, { useEffect, useState } from "react";
import "./courses.css";
import Heading from "../common/heading/Heading";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

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
  const userRole = localStorage.getItem('role');

  return (
    <section className="online" id="courses">
      <div className="container">
        <Heading subtitle="COURSES" title="Categories " />
        {userRole === "Admin" && (
          // Use Link instead of a tag
          <Link to={`/course/manage`} className="manage-btn">
            Manage Categories
          </Link>
        )}
        <div className="content grid3">
          {categories.map((category) => (
            // Use Link instead of a tag
            <Link to={`/courses/category/${category.category_id}`} key={category.category_id}>
              <div className="box" key={category.category_id}>
                <div className="img">
                  <img src={category.category_image} alt={category.category_name} />
                </div>
                <h1>{category.category_name}</h1>
                <span>{category.course_count}+ Courses</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Onlinecourse;
