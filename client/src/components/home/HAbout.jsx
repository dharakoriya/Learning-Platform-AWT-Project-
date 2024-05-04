import React, { useEffect, useState } from "react"
import Heading from "../common/heading/Heading"
import "../allcourses/courses.css"
import axios from "axios"
import Onlinecourse from "../allcourses/OnlineCourses"
import { Link } from "react-router-dom"
const HAbout = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:3001/courses');

      setCourses(response.data);
      console.log('Couser Data:', response.data);
    } catch (error) {
      console.error('Error fetching Courses:', error);
    }
  };
  return (
    <>
      <section className='homeAbout'>
        <div className='container'>
          <Onlinecourse />
          <Heading subtitle='our courses' title='explore our popular online courses' />
          <div className='coursesCard'>
            {/* copy code form  coursesCard */}
            <div className='container grid2'>
              {courses.slice(0, 3).map(course => (
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
                        {/* Apply fa-star class from font awesome */}
                        <i className='fa fa-star'></i>
                        <i className='fa fa-star'></i>
                        <i className='fa fa-star'></i>
                        <i className='fa fa-star'></i>
                        <i className='fa fa-star'></i>
                        <label htmlFor=''>{course.rating ? `(${course.rating.toFixed(1)})` : '(No rating)'}</label>
                      </div>
                      <div className='details'>
                        {/* Display instructor's name if available */}
                        {/* <span>Instructor: {course.instructorName ? course.instructorName : 'Unknown'}</span> */}
                        {/* Apply the box and dimg classes */}
                        <div className='box'>
                          <div className='dimg'>
                            <img src={course.instructorImage} alt='User' />
                          </div>
                          <div className='para'>
                            <h4> by {course.instructorName}</h4>
                          </div>
                        </div>
                        {/* Additional details */}
                        <span>{course.total_lectures} lectures ({course.total_length} hrs)</span>
                      </div>
                    </div>
                  </div>
                  <div className='price'>
                    <h3>₹{course.price}/-</h3>
                  </div>
                  <Link to={`/courses/course-detail/${course.course_id}`}>
                    <button className='outline-btn'>ENROLL NOW !</button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        
      </section>
    </>
  )
}

export default HAbout
