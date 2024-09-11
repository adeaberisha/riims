import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import Sidebar from '../components/Sidebar.jsx';
import { useParams, useNavigate } from 'react-router-dom';

const workTypes = [
    { value: 'Compressed Workweek', label: 'Compressed Workweek' },
    { value: 'Freelance/Contract Work', label: 'Freelance/Contract Work' },
    { value: 'Full-time Work', label: 'Full-time Work' },
    { value: 'Gig Work', label: 'Gig Work' },
    { value: 'Hybrid Work', label: 'Hybrid Work' },
    { value: 'Job Sharing', label: 'Job Sharing' },
    { value: 'On-site Work', label: 'On-site Work' },
    { value: 'Part-time Work', label: 'Part-time Work' },
    { value: 'Remote Work', label: 'Remote Work' },
    { value: 'Shift Work', label: 'Shift Work' },
    { value: 'Telecommuting', label: 'Telecommuting' },
];

function Eksperienca() {
    const { id } = useParams(); // Get ID from URL
    const navigate = useNavigate();

    const initialFormData = {
        titulli: '',
        llojiPunesimit: null,
        emriKompanise: null,
        lokacioni: '',
        llojiLokacionit: '',
        dataFillimit: '',
        dataMbarimit: '',
        pershkrimi: ''
    };

    const [formData, setFormData] = useState(initialFormData);
    const [institucionet, setInstitucionet] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInstitucionet = async () => {
            try {
                const response = await axios.get('https://localhost:7254/api/Institucioni/get-all-Institucionet');
                const options = response.data.map(institucion => ({
                    value: institucion.id,
                    label: institucion.emri
                }));
                setInstitucionet(options);
            } catch (error) {
                console.error('Error fetching institutions:', error);
                setErrorMessage('Failed to fetch institutions.');
            }
        };

        const fetchEksperienca = async () => {
            try {
                const response = await axios.get(`https://localhost:7254/api/Eksperienca/get-eksperienca-by-id/${id}`);
                setFormData({
                    titulli: response.data.Titulli || '',
                    llojiPunesimit: response.data.LlojiPunesimit || null,
                    emriKompanise: response.data.EmriInstitucionit || null,
                    lokacioni: response.data.Lokacioni || '',
                    llojiLokacionit: response.data.LlojiLokacionit || '',
                    dataFillimit: response.data.DataFillimit || '',
                    dataMbarimit: response.data.DataMbarimit || '',
                    pershkrimi: response.data.Pershkrimi || ''
                });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching experience:', error);
                setErrorMessage('Failed to fetch experience.');
                setLoading(false);
            }
        };

        fetchInstitucionet();
        fetchEksperienca();
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
            llojiPunesimit: selectedOption ? selectedOption.value : null
        });
    };

    const handleInstitutionChange = (selectedOption) => {
        setFormData({
            ...formData,
            emriKompanise: selectedOption ? selectedOption.label : null
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
                Titulli: formData.titulli,
                LlojiPunesimit: formData.llojiPunesimit,
                Lokacioni: formData.lokacioni,
                LlojiLokacionit: formData.llojiLokacionit,
                DataFillimit: formData.dataFillimit,
                DataMbarimit: formData.dataMbarimit || null,
                EmriInstitucionit: formData.emriKompanise,
                Pershkrimi: formData.pershkrimi || null
            };

            const response = await axios.put(
                `https://localhost:7254/api/Eksperienca/update-eksperienca-by-id/${id}`,
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 200) {
                setSuccessMessage('Eksperienca u përditësua me sukses!');
                setFormData(initialFormData); // Reset form data if necessary
                navigate('/your-redirect-path'); // Adjust this path to where you want to navigate after update
            } else {
                setErrorMessage('Diçka shkoi keq. Ju lutem provoni përsëri.');
            }

        } catch (error) {
            console.error('Error gjatë përditësimit të eksperiencës:', error);
            setErrorMessage('Ju lutem provoni përsëri.');
        }
    };

    const handleReset = () => {
        setFormData(initialFormData);
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

    if (loading) return <p>Loading...</p>;

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
                        <h4 className="text-center text-muted fst-italic mb-4">Edit Your Experience</h4>

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
                                        <label htmlFor="titulli" className='form-label fw-bold'>Titulli*</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="titulli"
                                            name="titulli"
                                            value={formData.titulli}
                                            onChange={handleChange}
                                            placeholder="Shkruani titullin e punës"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <div className="form-group">
                                        <label id="llojiPunesimit-label" className='form-label fw-bold'>Lloji i punësimit*</label>
                                        <Select
                                            aria-labelledby="llojiPunesimit-label"
                                            options={workTypes}
                                            value={workTypes.find(option => option.value === formData.llojiPunesimit) || null}
                                            onChange={handleSelectChange}
                                            placeholder="Zgjedhni llojin"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <div className="form-group">
                                        <label htmlFor="emriKompanise" className="form-label fw-bold">Institucioni*</label>
                                        <Select
                                            options={institucionet}
                                            value={institucionet.find(option => option.label === formData.emriKompanise) || null}
                                            onChange={handleInstitutionChange}
                                            placeholder="Zgjedhni institucionin"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <div className="form-group">
                                        <label htmlFor="lokacioni" className="form-label fw-bold">Lokacioni*</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="lokacioni"
                                            name="lokacioni"
                                            value={formData.lokacioni}
                                            onChange={handleChange}
                                            placeholder="Shkruani lokacionin"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <div className="form-group">
                                        <label htmlFor="llojiLokacionit" className='form-label fw-bold'>Lloji i lokacionit*</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="llojiLokacionit"
                                            name="llojiLokacionit"
                                            value={formData.llojiLokacionit}
                                            onChange={handleChange}
                                            placeholder="Shkruani llojin e lokacionit"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <div className="form-group">
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
                                </div>
                                <div className="col-md-6 mb-2">
                                    <div className="form-group">
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
                                </div>
                                <div className="col-12 mb-3">
                                    <div className="form-group">
                                        <label htmlFor="pershkrimi" className="form-label fw-bold">Përshkrimi</label>
                                        <textarea
                                            className="form-control"
                                            id="pershkrimi"
                                            name="pershkrimi"
                                            value={formData.pershkrimi}
                                            onChange={handleChange}
                                            rows="2"
                                            placeholder="Përshkruani eksperiencën tuaj"
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

export default Eksperienca;
