import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import Link
import Validation from './SignupValidation';
import './login_signup.css';

function Signup() {
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    
    const handleInput = (event) => {
        setValues(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Form submitted");

        const err = Validation(values);
        console.log("Validation errors:", err);
        setErrors(err);

        if (err.username == "" && err.email == "" && err.password == "") {
            console.log("Submitting form data:", values);
            axios.post('http://localhost:3001/user/signup', values)
                .then(res => {
                    console.log("Signup request successful:", res);
                    navigate('/login');
                })
                .catch(err => {
                    console.error("Signup request failed:", err);
                });
        } else {
            console.log("Form validation failed. Cannot submit.");
        }
    };

    return (
        <div className='custom-container'>
            <div className='custom-form-container'>
                <h2 className='custom-form-title'>Sign-Up</h2>
                <form action="" onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="name"><strong>Name</strong></label>
                        <input
                            type="text"
                            placeholder='Enter Name'
                            name='username'
                            onChange={handleInput}
                            className='custom-form-input'
                        />
                        {errors.username && <span className='custom-error-message'> {errors.username}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input
                            type="email"
                            placeholder='Enter Email'
                            name='email'
                            onChange={handleInput}
                            className='custom-form-input'
                        />
                        {errors.email && <span className='custom-error-message'> {errors.email}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input
                            type="password"
                            placeholder='Enter Password'
                            name='password'
                            onChange={handleInput}
                            className='custom-form-input'
                        />
                        {errors.password && <span className='custom-error-message'> {errors.password}</span>}
                    </div>
                    <button type='submit' className='custom-submit-btn'> Sign up</button>
                    {/* <p>You agree to our terms and policies</p> */}
                    <Link to="/login" className='custom-signup-link'>Login</Link>
                </form>
            </div>
        </div>
    );
}

export default Signup;
