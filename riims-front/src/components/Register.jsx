import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import RiimsLogo from '../photos/riims-logo.png';
import './css/Register.css'; 

const Register = () => {
    const [formData, setFormData] = useState({ Username: '', Password: '', ConfirmPassword: '' });
    const [error, setError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const validatePassword = (password) => {
        const minLength = 6;
        const hasUppercase = /[A-Z]/.test(password);

        if (password.length < minLength) {
            return `Password must be at least ${minLength} characters long.`;
        }
        if (!hasUppercase) {
            return 'Password must contain at least one uppercase letter.';
        }
        return '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setPasswordError('');
       
        if (formData.Password !== formData.ConfirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        const passwordValidationError = validatePassword(formData.Password);
        if (passwordValidationError) {
            setPasswordError(passwordValidationError);
            return;
        }

        try {
            const response = await axios.post("https://localhost:7254/api/Auth/Register", {
                Username: formData.Username,
                Password: formData.Password,
                Roles: [] 
            }, {
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.status === 200) {
                window.alert('Registration successful!');
                navigate("/login");
            } else {
                setError("Registration failed. Please check your details.");
                window.alert("Registration failed. Please check your details.");
            }
        } catch (error) {
            if (error.response) {
                console.error("Error response:", error.response.data);
                setError(error.response.data || "Registration failed. Please try again.");
                window.alert(error.response.data || "Registration failed. Please try again.");
            } else if (error.request) {
                console.error("Error request:", error.request);
                setError("Network error. Please try again later.");
                window.alert("Network error. Please try again later.");
            } else {
                console.error("Error message:", error.message);
                setError("An error occurred during registration.");
                window.alert("An error occurred during registration.");
            }
        }
    };

    return (
        <div className="container-fluid">
            <div className="row vh-100">
                <div className="col-lg-6 d-flex align-items-center bg-dark-blue text-white">
                    <div className="text-white p-5">
                        <h4>Research Innovation and Information Management System</h4>
                        <p>
                            Welcome to RIIMS, the platform where research and innovation come together. 
                            Manage information, collaborate with colleagues, and streamline your research process.
                        </p>
                    </div>
                </div>

                <div className="col-lg-6 d-flex align-items-center justify-content-center bg-light">
                    <div className="register-form-container p-4 w-75">
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
                                {passwordError && <p className="text-danger">{passwordError}</p>} {/* Display password validation error */}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="ConfirmPassword" className="form-label">Confirm Password</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    id="ConfirmPassword" 
                                    placeholder="Confirm password"
                                    value={formData.ConfirmPassword}
                                    onChange={handleChange}
                                    required 
                                />
                            </div>
                            {error && <p className="text-danger">{error}</p>} {/* */}
                            <div className="text-center pt-2 mb-3">
                                <button className="btn btn-dark-blue w-50" type="submit">Sign Up</button>
                            </div>
                            <div className="d-flex flex-row align-items-center justify-content-center">
                                <p className="mb-0">Already have an account?</p>
                                <Link to="/login" className="btn btn-outline-danger mx-2">Sign In</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
