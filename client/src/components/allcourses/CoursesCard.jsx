import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./courses.css";

const CoursesCard = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:3001/courses');

      setCourses(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching Courses:', error);
    }
  };

  return (
    <section className='coursesCard'>
      <div className='container grid2'>
        {courses.map(course => (
          <div className='items' key={course.course_id}>
            <div className='content flex'>
              <div className='left'>
                <div className='img'>
                  <img src={course.course_image} alt={course.course_name} />
                </div>
              </div>
              <div className='text'>
                <h1>{course.course_name}</h1>
                <div className='rate'>
                  {/* Rating component */}
                </div>
                <div className='details'>
                  {/* <span>Instructor: {course.User.username}</span> */}
                  {/* Additional details */}
                  {/* <span>Total Time: {course.totalTime}</span> */}
                </div>
              </div>
            </div>
            <div className='price'>
              <h3>${course.price.toFixed(2)}</h3>
            </div>
            <button className='outline-btn'>ENROLL NOW !</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CoursesCard;
