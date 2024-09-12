import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Select from 'react-select'; // Ensure you have react-select installed
import Sidebar from '../components/Sidebar.jsx'; // Adjust import as necessary

function EditEdukimi() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        FushaStudimit: '',
        NiveliAkademik: '',
        Institucioni: '',
        Lokacioni: '',
        DataFillimit: '',
        DataMbarimit: '',
        Pershkrimi: ''
    });
    const [niveletAkademike, setNiveletAkademike] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchNiveletAkademike = async () => {
            try {
                const response = await axios.get('https://localhost:7254/api/NiveliAkademik/get-all-NiveletAkademike');
                const options = response.data.map(niveliAkademik => ({
                    value: niveliAkademik.id,
                    label: niveliAkademik.lvl
                }));
                setNiveletAkademike(options);
            } catch (error) {
                console.error('Error gjatë marrjes së niveleve akademike:', error);
                setErrorMessage('Dështoi marrja e niveleve akademike.');
            }
        };
        const fetchEdukimi = async () => {
            const token = localStorage.getItem("jwtToken");

            if (!token) {
                setErrorMessage('Ju lutemi logohuni përsëri.');
                return;
            }

            try {
                const response = await axios.get(`https://localhost:7254/api/Edukimi/get-edukimi-by-id/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const formatDate = (isoDate) => {
                    if (!isoDate) return '';
                    const date = new Date(isoDate);
                    return date.toISOString().split('T')[0];
                };

                setFormData({
                    FushaStudimit: response.data.fushaStudimit,
                    NiveliAkademik: response.data.niveliAkademik || '',
                    Institucioni: response.data.institucioni,
                    Lokacioni: response.data.lokacioni,
                    DataFillimit: formatDate(response.data.dataFillimit),
                    DataMbarimit: formatDate(response.data.dataMbarimit) || '',
                    Pershkrimi: response.data.pershkrimi || ''
                });
            } catch (error) {
                console.error('Error gjatë marrjes së edukimit:', error);
                setErrorMessage('Dështoi marrja e edukimeve.');
            }
        };

        fetchNiveletAkademike();
        fetchEdukimi();
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSelectChange = (selectedOption) => {
        setFormData({
            ...formData,
            NiveliAkademik: selectedOption ? selectedOption.label : ''
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
                FushaStudimit: formData.FushaStudimit,
                NiveliAkademik: formData.NiveliAkademik,
                Institucioni: formData.Institucioni,
                Lokacioni: formData.Lokacioni,
                DataFillimit: formData.DataFillimit,
                DataMbarimit: formData.DataMbarimit || null,
                Pershkrimi: formData.Pershkrimi || null
            };

            const response = await axios.put(
                `https://localhost:7254/api/Edukimi/update-edukimi-by-id/${id}`,
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 200) {
                setSuccessMessage('Edukimi u përditësua me sukses!');
            } else {
                setErrorMessage('Diçka shkoi keq. Ju lutemi provoni përsëri.');
            }

        } catch (error) {
            console.error('Error updating edukimi:', error);
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
            FushaStudimit: '',
            NiveliAkademik: null,
            Institucioni: '',
            Lokacioni: '',
            DataFillimit: '',
            DataMbarimit: '',
            Pershkrimi: ''
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
                <div className="col-md-2 p-0">
                    <Sidebar />
                </div>
                <div className="col-md-10 d-flex flex-column align-items-center py-5">
                    <div className="col-12 col-md-10 col-lg-8 col-xl-6">
                        <h4 className="text-center text-muted fst-italic mb-4">Përditësoni edukimin tuaj</h4>
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
                                <div className="col-md-6 mb-2">
                                    <div className="form-group">
                                        <label htmlFor="FushaStudimit" className="form-label fw-bold">Fusha e studimit*</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="FushaStudimit"
                                            name="FushaStudimit"
                                            value={formData.FushaStudimit}
                                            onChange={handleChange}
                                            required
                                            placeholder="Shkruani fushën e studimit"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <div className="form-group">
                                        <label htmlFor="NiveliAkademik" className="form-label fw-bold">Niveli akademik*</label>
                                        <Select
                                            options={niveletAkademike}
                                            value={niveletAkademike.find(option => option.label === formData.NiveliAkademik) || null}
                                            onChange={handleSelectChange}
                                            placeholder="Zgjedhni nivelin"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <div className="form-group">
                                        <label htmlFor="Institucioni" className="form-label fw-bold">Institucioni*</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="Institucioni"
                                            name="Institucioni"
                                            value={formData.Institucioni}
                                            onChange={handleChange}
                                            required
                                            placeholder="Shkruani institucionin"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <div className="form-group">
                                        <label htmlFor="Lokacioni" className="form-label fw-bold">Lokacioni*</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="Lokacioni"
                                            name="Lokacioni"
                                            value={formData.Lokacioni}
                                            onChange={handleChange}
                                            required
                                            placeholder="Shkruani lokacionin"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <div className="form-group">
                                        <label htmlFor="DataFillimit" className="form-label fw-bold">Data e fillimit*</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="DataFillimit"
                                            name="DataFillimit"
                                            value={formData.DataFillimit}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <div className="form-group">
                                        <label htmlFor="DataMbarimit" className="form-label fw-bold">Data e mbarimit</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="DataMbarimit"
                                            name="DataMbarimit"
                                            value={formData.DataMbarimit}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-12 mb-3">
                                    <div className="form-group">
                                        <label htmlFor="Pershkrimi" className="form-label fw-bold">Përshkrimi</label>
                                        <textarea
                                            id="Pershkrimi"
                                            name="Pershkrimi"
                                            className="form-control"
                                            rows="2"
                                            value={formData.Pershkrimi}
                                            onChange={handleChange}
                                            placeholder="Shkruani përshkrimin"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-12 d-flex justify-content-between mb-2">
                                    <button type="button" className="btn btn-secondary" onClick={handleReset} style={{ width: 'calc(50% - 0.7rem)' }}>Anulo</button>
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

export default EditEdukimi;
