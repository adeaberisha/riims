import React, { useState } from 'react';
import axios from 'axios';

function Aftesite() {
    const [formData, setFormData] = useState({
        emri: '',
        emriInstitucionit: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Retrieve token from localStorage
        const token = localStorage.getItem("jwtToken");

        if (!token) {
            alert("Token not found.");
            return;
        }

        try {
            const data = {
                emri: formData.emri,
                emriInstitucionit: formData.emriInstitucionit
            };

            const postResponse = await axios.post(
                `https://localhost:7254/api/Aftesite/add-aftesia`,
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (postResponse.status === 201) {
                alert('Skill added successfully!');
            } else {
                alert('Something went wrong. Please try again.');
            }

        } catch (error) {
            console.error('Error adding skill:', error);
            if (error.response) {
                console.error('Error response:', error.response.data);
            } else if (error.request) {
                console.error('Error request:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
            alert('Error adding skill. Please try again.');
        }
    };

    return (
        <div className="container-fluid h-100 bg-light">
            <div className="row h-100">
                <div className="col d-flex justify-content-center align-items-center mb-5 mt-4">
                    <div className="col-md-6 col-lg-5 col-xl-4">
                        <h4 className="text-center text-muted fst-italic m-3">Shtoni aftësitë tuaja</h4>
                        <form onSubmit={handleSubmit} className="border p-4 shadow-lg rounded bg-white">
                            <div className="form-group mb-3">
                                <label htmlFor="emri" className='form-label fw-bold'>Aftësia*</label>
                                <input type="text" className="form-control" id="emri" name="emri" value={formData.emri} onChange={handleChange} required />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="emriInstitucionit" className='form-label fw-bold'>Institucioni ku e kam zhvilluar këtë aftësi *</label>
                                <input type="text" className="form-control" id="emriInstitucionit" name="emriInstitucionit" value={formData.emriInstitucionit} onChange={handleChange} required />
                            </div>
                            <button type="submit" className="btn btn-primary w-100 active mb-2 mt-2">Ruaj</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Aftesite;
