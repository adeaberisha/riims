import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import Sidebar from '../components/Sidebar.jsx';

function Aftesite() {
    const initialFormData = {
        emri: '',
        emriInstitucionit: ''
    };

    const [formData, setFormData] = useState(initialFormData);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => setErrorMessage(''), 6000);
            return () => clearTimeout(timer);
        }
        if (successMessage) {
            const timer = setTimeout(() => setSuccessMessage(''), 6000);
            return () => clearTimeout(timer);
        }
    }, [errorMessage, successMessage]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        const token = localStorage.getItem("jwtToken");

        if (!token) {
            setErrorMessage('Ju lutem logohuni përsëri.');
            return;
        }

        try {
            const data = {
                emri: formData.emri,
                emriInstitucionit: formData.emriInstitucionit
            };

            const response = await axios.post(
                `https://localhost:7254/api/Aftesite/add-aftesia`,
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 201) {
                setSuccessMessage('Aftësia u shtua me sukses!');
                setFormData(initialFormData); // Reset form data on success
            } else {
                setErrorMessage('Diçka shkoi keq. Ju lutem provoni përsëri.');
            }

        } catch (error) {
            console.error('Error adding skill:', error);
            setErrorMessage('Ju lutem provoni përsëri.');
        }
    };

    const handleReset = () => {
        setFormData(initialFormData); // Reset form data
    };

    return (
        <div className="container-fluid h-100 bg-light">
            <div className="row h-100">
                {/* Sidebar */}
                <div className="col-md-2 p-0">
                    <Sidebar />
                </div>

                {/* Main Content */}
                <div className="col-md-10 d-flex justify-content-center py-5" style={{ marginTop: '5rem' }}>
                    <div className="col-12 col-md-8 col-lg-6">
                        <div className="text-center mb-4">
                            <h4 className="text-muted fst-italic">Shtoni aftësitë tuaja</h4>
                        </div>
                        
                        {errorMessage && (
                            <div className="alert alert-danger text-center mb-3" role="alert">
                                {errorMessage}
                            </div>
                        )}
                        
                        {successMessage && (
                            <div className="alert alert-success text-center mb-3" role="alert">
                                {successMessage}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="border p-4 shadow-lg rounded bg-white">
                            <div className="form-group mb-3">
                                <label htmlFor="emri" className="form-label fw-bold">Aftësia*</label>
                                <input 
                                  type="text" 
                                  className="form-control" 
                                  id="emri" 
                                  name="emri" 
                                  value={formData.emri} 
                                  onChange={handleChange} 
                                  required 
                                  placeholder="Shkruani aftësinë"
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="emriInstitucionit" className="form-label fw-bold">Institucioni ku e keni zhvilluar këtë aftësi *</label>
                                <input 
                                  type="text" 
                                  className="form-control" 
                                  id="emriInstitucionit" 
                                  name="emriInstitucionit" 
                                  value={formData.emriInstitucionit} 
                                  onChange={handleChange} 
                                  required 
                                  placeholder="Shkruani institucionin"
                                />
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                                <button 
                                  type="button" 
                                  className="btn btn-secondary" 
                                  onClick={handleReset} 
                                  style={{ width: 'calc(50% - 0.7rem)' }}
                                >
                                  Anulo
                                </button>
                                <button 
                                  type="submit" 
                                  className="btn btn-primary" 
                                  style={{ width: 'calc(50% - 0.7rem)' }}
                                >
                                  Ruaj
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Aftesite;
