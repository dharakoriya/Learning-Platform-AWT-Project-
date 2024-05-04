import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 
import Validation from './LoginValidation';
import './login_signup.css';

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const [backendError, setBackendError] = useState([]);
    const navigate = useNavigate();

    const handleInput = (event) => {
        setValues(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
        console.log(event.target.value)
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Form submitted");

        const err = Validation(values);
        console.log("Validation errors:", err);
        setErrors(err);

        if (err.email == "" && err.password == "") {
            console.log("Form validation passed");

            axios.post('http://localhost:3001/user/login', values)
                .then(res => {
                    console.log("Response received:", res);

                    if (res.data.errors) {
                        console.log("Backend errors:", res.data.errors);
                        setBackendError(res.data.errors);
                    } else {
                        console.log("No backend errors");
                        setBackendError([]);

                        if (res.data.message === "Success") {
                            console.log("Login successful");
                            localStorage.setItem('role', res.data.data.user.role);
                            localStorage.setItem('user', JSON.stringify(res.data.data.user));
                            console.log("User data:", res.data.data.user);

                            console.log("Login role:", res.data.data.user.role);
                            navigate('/');

                        } else {
                            console.log("No record existed");
                            alert("No record existed");
                        }
                    }
                })
                .catch(err => {
                    console.error("Error during login:", err);
                    setBackendError([{ msg: "An error occurred during login" }]);
                });
        } else {
            console.log("Form validation failed");
        }
    };

    return (
        <div className='custom-container'>
            <div className='custom-form-container'>
                <h2 className='custom-form-title'>Sign-In</h2>
                {backendError ? backendError.map(e => (
                    <p key={e.msg} className='custom-error-message'>{e.msg}</p>
                )) : <span></span>}
                <form action="" onSubmit={handleSubmit}>
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
                    <button type='submit' className='custom-submit-btn'> Log in</button>
                    {/* <p>You agree to our terms and policies</p> */}
                    <Link to="/signup" className='custom-signup-link'>Create Account</Link>
                </form>
            </div>
        </div>
    );
}

export default Login;
