import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import Validation from './SignupValidation';
import './login_signup.css'


function Signup() {
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: ''
    });

    const history = useHistory();
    const [errors, setErrors] = useState({});

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
                    history.push('/');
                    setTimeout(() => {
                        window.location.reload();
                    }, 100);
                     // Navigate to homepage
                })
                .catch(err => {
                    console.error("Signup request failed:", err);
                });
        } else {
            console.log("Form validation failed. Cannot submit.");
        }
    };


    // return (
    //     <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
    //         <div className='bg-white p-3 rounded w-25'>
    //             <h2>Sign-Up</h2>
    //             <form action="" onSubmit={handleSubmit}>
    //                 <div className='mb-3'>
    //                     <label htmlFor="name"><strong>Name</strong></label>
    //                     <input
    //                         type="text"
    //                         placeholder='Enter Name'
    //                         name='name'
    //                         onChange={handleInput}
    //                         className='form-control rounded-0'
    //                     />
    //                     {errors.name && <span className='text-danger'> {errors.name}</span>}
    //                 </div>
    //                 <div className='mb-3'>
    //                     <label htmlFor="email"><strong>Email</strong></label>
    //                     <input
    //                         type="email"
    //                         placeholder='Enter Email'
    //                         name='email'
    //                         onChange={handleInput}
    //                         className='form-control rounded-0'
    //                     />
    //                     {errors.email && <span className='text-danger'> {errors.email}</span>}
    //                 </div>
    //                 <div className='mb-3'>
    //                     <label htmlFor="password"><strong>Password</strong></label>
    //                     <input
    //                         type="password"
    //                         placeholder='Enter Password'
    //                         name='password'
    //                         onChange={handleInput}
    //                         className='form-control rounded-0'
    //                     />
    //                     {errors.password && <span className='text-danger'> {errors.password}</span>}
    //                 </div>
    //                 <button type='submit' className='btn btn-success w-100 rounded-0'> Sign up</button>
    //                 <p>You agree to our terms and policies</p>
    //                 <Link to="/" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Login</Link>
    //             </form>
    //         </div>
    //     </div>
    // );

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
                    <a href="/login" className='custom-signup-link'>Login</a>
                </form>
            </div>
        </div>
    );
}

export default Signup;
