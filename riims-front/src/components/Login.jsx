import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import RiimsLogo from '../photos/riims-logo.png';
import './css/Login.css'; 

const Login = ({ onLogin }) => {
    const [formData, setFormData] = useState({ Username: '', Password: '' });
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
        if (e.target.id === 'Username') {
            setEmailError('');
        } else if (e.target.id === 'Password') {
            setPasswordError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');     
        setPasswordError('');
    
        try {
            const response = await axios.post("https://localhost:7254/api/Auth/Login", formData, {
                headers: { 'Content-Type': 'application/json' }
            });
    
            if (response.status === 200) {
                localStorage.setItem("jwtToken", response.data.JwtToken);
                onLogin(); 
                navigate("/home");
            } else {
                setError("Login failed. Please check your credentials.");
            }
        } catch (error) {
            if (error.response) {               
                setError(error.response.data.message || "Login failed. Please check your credentials.");
            } else if (error.request) {               
                setError("Network error. Please try again later.");
            } else {
                setError("An error occurred during login.");               
            }
        }
    };

    return (
        <div className="container-fluid">
            <div className="row vh-100">
                {/* Login form */}
                <div className="col-lg-6 d-flex align-items-center justify-content-center bg-light">
                    <div className="register-form-container p-5 w-75">
                        <div className="text-center mb-4">
                            <img 
                                src={RiimsLogo} 
                                style={{ width: '220px' }} 
                                alt="Riims Logo" 
                            />
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="Username" className="form-label">Email address</label>
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    id="Username" 
                                    placeholder="Enter email" 
                                    value={formData.Username}
                                    onChange={handleChange}
                                    required 
                                />
                                {emailError && <p className="text-danger">{emailError}</p>} {/* Display email error */}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Password" className="form-label">Password</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    id="Password" 
                                    placeholder="Enter password" 
                                    value={formData.Password}
                                    onChange={handleChange}
                                    required 
                                />
                                {passwordError && <p className="text-danger">{passwordError}</p>} {/* Display password error */}
                            </div>
                            {error && <p className="text-danger">{error}</p>} {/* Display login error */}
                            <div className="text-center pt-2 mb-3">
                                <button className="btn btn-dark-blue w-50" type="submit">Sign in</button>
                                {/* <a className="text-muted d-block mt-2" href="#!">Forgot password?</a> */}
                            </div>
                            <div className="d-flex flex-row align-items-center justify-content-center">
                                <p className="mb-0">Don't have an account?</p>
                                <Link to="/register" className="btn btn-outline-danger mx-2">Sign Up</Link>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Blue section */}
                <div className="col-lg-6 d-flex align-items-center bg-dark-blue text-white">
                    <div className="text-white p-5">
                        <h4>Research Innovation and Information Management System</h4>
                        <p>
                            Welcome to RIIMS, the platform where research and innovation come together. 
                            Manage information, collaborate with colleagues, and streamline your research process.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
