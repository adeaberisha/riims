import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import EditSidebar from '../components/EditSidebar.jsx';

function EditMbikqyres() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        titulliTemes: '',
        studenti: '',
        data: '',
        emriDepartamentit: ''
    });
    const [departamentet, setDepartamentet] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchDepartamentet = async () => {
            try {
                const token = localStorage.getItem("jwtToken");
                if (!token) throw new Error('Token not found');

                const response = await axios.get('https://localhost:7254/api/Departamenti/get-all-departamentet', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const options = response.data.map(departamenti => ({
                    value: departamenti.id,
                    label: departamenti.emri
                }));
                setDepartamentet(options);
            } catch (error) {
                console.error('Error gjatë marrjes së departamenteve:', error.response ? error.response.data : error.message);
                setErrorMessage('Dështoi marrja e departamenteve.');
            }
        };

        fetchDepartamentet();
    }, []);

    useEffect(() => {
        const fetchMbikqyres = async () => {
            const token = localStorage.getItem("jwtToken");
            if (!token) {
                setErrorMessage('Ju lutemi logohuni përsëri.');
                return;
            }

            try {
                const response = await axios.get(`https://localhost:7254/api/MbikqyresITemave/get-mbikqyres-by-id/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                setFormData({
                    titulliTemes: response.data.titulliTemes,
                    studenti: response.data.studenti,
                    data: response.data.data ? new Date(response.data.data).toISOString().split('T')[0] : '',
                    emriDepartamentit: response.data.emriDepartamentit || ''
                });
            } catch (error) {
                console.error('Error gjatë marrjes së mbikqyrësit:', error);
                setErrorMessage('Dështoi marrja e detajeve mbi mbikqyrësin.');
            }
        };

        fetchMbikqyres();
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
            emriDepartamentit: selectedOption ? selectedOption.label : ''
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
                titulliTemes: formData.titulliTemes,
                studenti: formData.studenti,
                data: formData.data,
                emriDepartamentit: formData.emriDepartamentit
            };

            const response = await axios.put(
                `https://localhost:7254/api/MbikqyresITemave/update-mbikqyres-by-id/${id}`,
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 200) {
                setSuccessMessage('Mbikqyrësi u përditësua me sukses!');
            } else {
                setErrorMessage('Diçka shkoi keq. Ju lutemi provoni përsëri.');
            }
        } catch (error) {
            console.error('Error updating mbikqyres:', error);
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
            titulliTemes: '',
            studenti: '',
            data: '',
            emriDepartamentit: ''
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
                    <EditSidebar />
                </div>
                <div className="col-md-10 d-flex flex-column align-items-center py-5">
                    <div className="col-12 col-md-10 col-lg-8 col-xl-6">
                        <h4 className="text-center text-muted fst-italic mb-4">Përditësoni mbikqyrësin e temave</h4>
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
                                        <label htmlFor="titulliTemes" className="form-label fw-bold">Titulli i temës*</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="titulliTemes"
                                            name="titulliTemes"
                                            value={formData.titulliTemes}
                                            onChange={handleChange}
                                            required
                                            placeholder="Shkruani titullin e temës suaj"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <div className="form-group">
                                        <label htmlFor="studenti" className="form-label fw-bold">Studenti*</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="studenti"
                                            name="studenti"
                                            value={formData.studenti}
                                            onChange={handleChange}
                                            placeholder="Shkruani studentin"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <div className="form-group">
                                        <label htmlFor="data" className="form-label fw-bold">Data*</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="data"
                                            name="data"
                                            value={formData.data}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <div className="form-group">
                                        <label htmlFor="emriDepartamentit" className="form-label fw-bold">Departamenti*</label>
                                        <Select
                                            options={departamentet}
                                            value={departamentet.find(option => option.label === formData.emriDepartamentit) || null}
                                            onChange={handleSelectChange}
                                            placeholder="Zgjedhni departamentin"
                                            required
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

export default EditMbikqyres;