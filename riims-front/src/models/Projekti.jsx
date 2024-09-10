import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar.jsx';

function Projekti() {
    const [formData, setFormData] = useState({
        emriProjektit: '',
        startDate: '',
        endDate: '',
        collaborators: '',
        description: '',
        asocohet: '',
        EmriInstitucionit: ''
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

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
            setErrorMessage('Token not found. Please log in again.');
            return;
        }

        try {
            const data = {
                emriProjektit: formData.emriProjektit,
                startDate: formData.startDate,
                endDate: formData.endDate || null,
                collaborators: formData.collaborators || null,
                description: formData.description,
                asocohet: formData.asocohet,
                EmriInstitucionit: formData.EmriInstitucionit
            };

            const postResponse = await axios.post(
                `https://localhost:7254/api/Projekti/add-projekti`,
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (postResponse.status === 201) {
                setSuccessMessage('Projekti u shtua me sukses!');
                setFormData({
                    emriProjektit: '',
                    startDate: '',
                    endDate: '',
                    collaborators: '',
                    description: '',
                    asocohet: '',
                    EmriInstitucionit: ''
                });
            } else {
                setErrorMessage('Diçka shkoi keq. Ju lutem provoni përsëri.');
            }

        } catch (error) {
            console.error('Error gjatë shtimit të projektit:', error);
            if (error.response) {
                setErrorMessage(`Error: ${error.response.data}`);
            } else if (error.request) {
                setErrorMessage('Ju lutem provoni përsëri.');
            } else {
                setErrorMessage('Ju lutem provoni përsëri.');
            }
        }
    };

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

    return (
        <div className="container-fluid h-100 bg-light">
            <div className="row h-100">
                {/* Sidebar */}
                <div className="col-md-2 p-0">
                    <Sidebar />
                </div>

                {/* Main Content */}
                <div className="col-md-10 d-flex flex-column align-items-center py-5">
                    <div className="col-12 col-md-10 col-lg-8 col-xl-6">
                        <h4 className="text-center text-muted fst-italic mb-4">Shtoni projektet tuaja</h4>

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

                        <form onSubmit={handleSubmit} className="p-3 border rounded shadow bg-white" style={{ marginTop: '1rem' }}>
                            <div className="row">
                                <div className="col-md-12 mb-2">
                                    <div className="form-group">
                                        <label htmlFor="emriProjektit" className="form-label fw-bold">Emri i projektit*</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="emriProjektit"
                                            name="emriProjektit"
                                            value={formData.emriProjektit}
                                            onChange={handleChange}
                                            required
                                            placeholder="Shkruani emrin e projektit"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <div className="form-group">
                                        <label htmlFor="startDate" className="form-label fw-bold">Data e fillimit*</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="startDate"
                                            name="startDate"
                                            value={formData.startDate}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <div className="form-group">
                                        <label htmlFor="endDate" className="form-label fw-bold">Data e mbarimit</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="endDate"
                                            name="endDate"
                                            value={formData.endDate}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <div className="form-group">
                                        <label htmlFor="collaborators" className="form-label fw-bold">Bashkëpunëtorët</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="collaborators"
                                            name="collaborators"
                                            value={formData.collaborators}
                                            onChange={handleChange}
                                            placeholder="Shkruani bashkëpunëtorët"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <div className="form-group">
                                        <label htmlFor="description" className="form-label fw-bold">Përshkrimi*</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="description"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            required
                                            placeholder="Shkruani përshkrimin"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="form-group">
                                        <label htmlFor="asocohet" className="form-label fw-bold">Asocohet*</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="asocohet"
                                            name="asocohet"
                                            value={formData.asocohet}
                                            onChange={handleChange}
                                            required
                                            placeholder="Shkruani asocimin"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="form-group">
                                        <label htmlFor="EmriInstitucionit" className="form-label fw-bold">Institucioni*</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="EmriInstitucionit"
                                            name="EmriInstitucionit"
                                            value={formData.EmriInstitucionit}
                                            onChange={handleChange}
                                            required
                                            placeholder="Shkruani institucionin"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-12 d-flex justify-content-between mb-2">
                                    <button type="button" className="btn btn-secondary" onClick={() => setFormData({
                                        emriProjektit: '',
                                        startDate: '',
                                        endDate: '',
                                        collaborators: '',
                                        description: '',
                                        asocohet: '',
                                        EmriInstitucionit: ''
                                    })} style={{ width: 'calc(50% - 0.7rem)' }}>Anulo</button>
                                    <button type="submit" className="btn btn-primary" style={{ width: 'calc(50% - 0.7rem)' }}>Ruaj</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Projekti;
