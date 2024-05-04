import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './CourseDetail.css';
import axios from 'axios';

const CourseDetail = () => {
    const { courseId } = useParams();

    const [course, setCourse] = useState(null); // Initialize course state as null
    const userJSON = localStorage.getItem('user'); // Retrieve the user data from localStorage
    const user = JSON.parse(userJSON);
    console.log("user in course", user);

    useEffect(() => {
        fetchCourses(); // Fetch all courses
    }, []); // Fetch courses only once when the component mounts

    const fetchCourses = async () => {
        try {
            const response = await axios.get('http://localhost:3001/courses');
            console.log('Course Data:', response);
            // Filter the courses array to get the course with the matching courseId
            const courseData = response.data.find(course => course.course_id === Number(courseId));

            setCourse(courseData); // Set fetched course data to state
            console.log('Course Data:', courseData);
        } catch (error) {
            console.error('Error fetching Courses:', error);
        }
    };
    const enrollNow = async () => {
        try {
            const enrollmentData = {
                user_id: user.user_id,
                course_id: courseId
            };
            console.log('Enrollment Data:', enrollmentData);
            await axios.post('http://localhost:3001/enrollments', enrollmentData);
            alert('Enrollment successful!');
        } catch (error) {
            console.error('Error enrolling:', error);
        }
    };
    if (!course) {
        return <div>Loading...</div>; // Render loading indicator until course data is fetched
    }

    // Fetch course data from backend (replace with your implementation)
    // const course = {
    //     name: 'Mastering React for Web Development',
    //     imageUrl: '../../images/courses/888.jpg', // Replace with actual image URL
    //     category: 'Web Development',
    //     instructorName: 'John Doe',
    //     price: 49.99,
    //     description: `
    //   This comprehensive course will guide you through everything you need to know 
    //   to build modern and interactive web applications with React. You'll learn the 
    //   fundamentals of React, including components, props, state management, and more. 
    //   By the end of the course, you'll be able to confidently build your own React apps
    //   and take your web development skills to the next level.
    // `,
    //     lectures: 15,
    //     quizzes: 10,
    //     assignments: 5,
    // };

    return (
        <div className="course-detail">
            <section className="heroien">
                <div className="hero-content">
                    <h1>{course.name}</h1>
                    <p>
                        Category: {course.cat_name} | Instructor: {course.instructorName}
                    </p>
                </div>
                <img src={`../../${course.course_image}`} alt={course.course_name} className="hero-image" />
            </section>
            <section className="contentt">
                <div className="containerr">
                    <div className="description">
                        <h2>Course Name</h2>
                        <div dangerouslySetInnerHTML={{ __html: course.course_name }} />
                        <h2>Course Description</h2>
                        <div dangerouslySetInnerHTML={{ __html: course.description }} />
                    </div>
                    <div className="key-features">
                        <h2>Key Features</h2>
                        <ul className="feature-list">
                            <li>
                                <i className="fas fa-play-circle"></i> {course.total_lectures}+ Lectures
                            </li>
                            <li>
                                <i className="fas fa-question-circle"></i> {course.quizzes}1+ Quizzes
                            </li>
                            <li>
                                <i className="fas fa-file-alt"></i> {course.assignments}2+ Assignments
                            </li>
                        </ul>
                    </div>
                    <div className="instructor">
                        <h2>About the Instructor</h2>
                        <div className="instructor-bio">
                            {/* Add instructor bio and image (optional) */}
                            <p>{/* Instructor bio text here */}</p>
                            <img
                                src={`../../${course.instructorImage}`}
                                alt="Instructor"
                                className="instructor-image"
                            />
                        </div>
                    </div>
                </div>
            </section>
            <section className="cta">
                <div className="container">
                    <Link to={`/courses/course-detail/video/${course.course_id}`} className='primary-btn'>
                        {/* Add onClick event to handle enrollment */}
                        <button onClick={enrollNow}>ENROLL NOW !</button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default CourseDetail;
