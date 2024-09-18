import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import EditSidebar from '../components/EditSidebar.jsx'; 

function EditPunaVullnetare() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        roli: '',
        dataFillimit: '',
        dataMbarimit: '',
        pershkrimi: '',
        emriInstitucionit: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchPunaVullnetare = async () => {
            const token = localStorage.getItem("jwtToken");
            if (!token) {
                setErrorMessage('Ju lutemi logohuni përsëri.');
                return;
            }

            try {
                const response = await axios.get(`https://localhost:7254/api/PunaVullnetare/get-puna-vullnetare-by-id/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                setFormData({
                    roli: response.data.roli,
                    dataFillimit: response.data.dataFillimit ? new Date(response.data.dataFillimit).toISOString().split('T')[0] : '',
                    dataMbarimit: response.data.dataMbarimit ? new Date(response.data.dataMbarimit).toISOString().split('T')[0] : '',
                    pershkrimi: response.data.pershkrimi || '',
                    emriInstitucionit: response.data.emriInstitucionit
                });
            } catch (error) {
                console.error('Error gjatë marrjes së punës vullnetare:', error);
                setErrorMessage('Dështoi marrja e punës vullnetare.');
            }
        };

        fetchPunaVullnetare();
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
            setErrorMessage('Ju lutemi logohuni përsëri.');
            return;
        }

        try {
            const data = {
                roli: formData.roli,
                dataFillimit: formData.dataFillimit,
                dataMbarimit: formData.dataMbarimit || null,
                pershkrimi: formData.pershkrimi || null,
                emriInstitucionit: formData.emriInstitucionit
            };

            const response = await axios.put(
                `https://localhost:7254/api/PunaVullnetare/update-puna-vullnetare-by-id/${id}`,
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 200) {
                setSuccessMessage('Puna vullnetare u përditësua me sukses!');
            } else {
                setErrorMessage('Diçka shkoi keq. Ju lutemi provoni përsëri.');
            }

        } catch (error) {
            console.error('Error gjatë ndryshimit të punës vullnetare:', error);
            if (error.response) {
                setErrorMessage(`Error: ${error.response.data}`);
            } else if (error.request) {
                setErrorMessage('Ju lutemi provoni përsëri.');
            } else {
                setErrorMessage('Ju lutemi provoni përsëri.');
            }
        }
    };

    const handleReset = () => {
        setFormData({
            roli: '',
            dataFillimit: '',
            dataMbarimit: '',
            pershkrimi: '',
            emriInstitucionit: ''
        });
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
                    <EditSidebar />
                </div>

                <div className="col-md-10 d-flex flex-column align-items-center py-5">
                    <div className="col-12 col-md-10 col-lg-8 col-xl-6" style={{ marginTop: '-1.4rem' }}>
                        <h4 className="text-center text-muted fst-italic mb-3">Përditësoni punën vullnetare</h4>

                        {successMessage && (
                            <div className="alert alert-success text-center mb-3" role="alert">
                                {successMessage}
                            </div>
                        )}

                        {errorMessage && (
                            <div className="alert alert-danger text-center mb-3" role="alert">
                                {errorMessage}
                            </div>
                        )}
                        
                        <form onSubmit={handleSubmit} className="p-3 border rounded shadow-sm bg-white">
                            <div className="form-group mb-2">
                                <label htmlFor="roli" className="form-label fw-bold">Roli*</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="roli"
                                    name="roli"
                                    value={formData.roli}
                                    onChange={handleChange}
                                    required
                                    placeholder="Shkruani rolin tuaj"
                                />
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="dataFillimit" className="form-label fw-bold">Data e fillimit*</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="dataFillimit"
                                    name="dataFillimit"
                                    value={formData.dataFillimit}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="dataMbarimit" className="form-label fw-bold">Data e mbarimit</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="dataMbarimit"
                                    name="dataMbarimit"
                                    value={formData.dataMbarimit}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="pershkrimi" className="form-label fw-bold">Përshkrimi</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="pershkrimi"
                                    name="pershkrimi"
                                    value={formData.pershkrimi}
                                    onChange={handleChange}
                                    placeholder="Opsionale"
                                />
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="emriInstitucionit" className="form-label fw-bold">Emri i institucionit*</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="emriInstitucionit"
                                    name="emriInstitucionit"
                                    value={formData.emriInstitucionit}
                                    onChange={handleChange}
                                    required
                                    placeholder="Shkruani emrin e institucionit"
                                />
                            </div>
                            <div className="d-flex justify-content-between">
                                <button type="button" className="btn btn-secondary" onClick={handleReset} style={{ width: 'calc(50% - 0.5rem)' }}>Anulo</button>
                                <button type="submit" className="btn btn-primary" style={{ width: 'calc(50% - 0.5rem)' }}>Ruaj</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditPunaVullnetare;
