import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import EditSidebar from '../components/EditSidebar.jsx';

function EditAftesia() {
    const { id } = useParams(); // Extract the ID from URL parameters
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        emri: '',
        emriInstitucionit: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchAftesia = async () => {
            try {
                const response = await axios.get(`https://localhost:7254/api/Aftesite/get-aftesia-by-id/${id}`); 
                setFormData({
                    emri: response.data.emri,
                    emriInstitucionit: response.data.emriInstitucionit
                });
            } catch (error) {
                console.error('Error gjatë marrjes se aftësisë:', error);
                setErrorMessage('Dështoi marrja e aftësive.');
            }
        };

        fetchAftesia();
    }, [id]);

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

            const response = await axios.put(
                `https://localhost:7254/api/Aftesite/update-aftesia-by-id/${id}`,
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 200) {
             setSuccessMessage('Aftesia u ndryshua me sukses!');
             setFormData({
                emri: '',
                emriInstitucionit: ''
            });
        } else {
        setErrorMessage('Diçka shkoi keq. Ju lutem provoni përsëri.');
          }         
        } catch (error) {
            console.error('Error gjatë ndryshimit të aftësisë:', error);
            if (error.response) {
                setErrorMessage(`Error: ${error.response.data}`);
            } else if (error.request) {
                setErrorMessage('Ju lutem provoni perseri!');
            } else {
                setErrorMessage('Error: Nuk mund të përfundojë kërkesa.');
            }
        }
    };

    const handleReset = () => {
        setFormData({
            emri: '',
            emriInstitucionit: ''
        });
    };

    return (
        <div className="container-fluid h-100 bg-light">
            <div className="row h-100">
                {/* Sidebar */}
                <div className="col-md-2 p-0">
                    <EditSidebar />
                </div>

                {/* Main Content */}
                <div className="col-md-10 d-flex justify-content-center py-5">
                    <div className="col-12 col-md-8 col-lg-6" style={{ marginTop: '3rem' }}>
                        <div className="text-center mb-4">
                            <h4 className="text-muted fst-italic">Perditso aftësitë tuaja</h4>
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

export default EditAftesia;
