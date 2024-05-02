import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Validation from './LoginValidation';
import './login_signup.css'

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const history = useHistory();
    const [errors, setErrors] = useState({});
    const [backendError, setBackendError] = useState([]);

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
                            console.log("Login role:", res.data.data.user.role);

                            history.push('/');
                            setTimeout(() => {
                                window.location.reload();
                            }, 100);
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


    // return (
    //     <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
    //         <div className='bg-white p-3 rounded w-25'>
    //             <h2>Sign-In</h2>
    //             {backendError ? backendError.map(e => (
    //                 <p key={e.msg} className='text-danger'>{e.msg}</p>
    //             )) : <span></span>}
    //             <form action="" onSubmit={handleSubmit}>
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
    //                 <button type='submit' className='btn btn-success w-100 rounded-0'> Log in</button>
    //                 <p>You agree to our terms and policies</p>
    //                 <Link to="/signup" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Create Account</Link>
    //             </form>
    //         </div>
    //     </div>
    // );
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
                    <a href="/signup" className='custom-signup-link'>Create Account</a>
                </form>
            </div>
        </div>
    );
}

export default Login;
