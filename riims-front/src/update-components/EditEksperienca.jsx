import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

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

function Eksperienca({ id }) {
    const [formData, setFormData] = useState({
        titulli: '',
        llojiPunesimit: '',
        emriKompanise: '',
        lokacioni: '',
        llojiLokacionit: '',
        dataFillimit: '',
        dataMbarimit: '',
        pershkrimi: ''
    });
    const [institucionet, setInstitucionet] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchInstitucionet = async () => {
            try {
                const response = await axios.get('https://localhost:7254/api/Institucioni/get-all-Institucionet');
                const options = response.data.map(institucion => ({
                    value: institucion.emri,
                    label: institucion.emri
                }));
                setInstitucionet(options);
            } catch (error) {
                console.error('Error fetching institutions:', error);
                setErrorMessage('Failed to fetch institutions.');
            }
        };

        fetchInstitucionet();

        if (id) {
            const fetchExperienceData = async () => {
                try {
                    const response = await axios.get(`https://localhost:7254/api/Eksperienca/get-eksperienca-by-id/${id}`);
                    const data = response.data;

                    setFormData({
                        titulli: data.Titulli,
                        llojiPunesimit: data.LlojiPunesimit,
                        emriKompanise: data.EmriInstitucionit,
                        lokacioni: data.Lokacioni,
                        llojiLokacionit: data.LlojiLokacionit,
                        dataFillimit: data.DataFillimit.split('T')[0],
                        dataMbarimit: data.DataMbarimit ? data.DataMbarimit.split('T')[0] : '',
                        pershkrimi: data.Pershkrimi || ''
                    });
                } catch (error) {
                    console.error('Error fetching experience data:', error);
                    setErrorMessage('Failed to fetch experience data.');
                }
            };

            fetchExperienceData();
        }
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
            llojiPunesimit: selectedOption ? selectedOption.value : ''
        });
    };

    const handleInstitutionChange = (selectedOption) => {
        setFormData({
            ...formData,
            emriKompanise: selectedOption ? selectedOption.value : ''
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
                Titulli: formData.titulli,
                LlojiPunesimit: formData.llojiPunesimit,
                Lokacioni: formData.lokacioni,
                LlojiLokacionit: formData.llojiLokacionit,
                DataFillimit: formData.dataFillimit,
                DataMbarimit: formData.dataMbarimit || null,
                EmriInstitucionit: formData.emriKompanise,
                Pershkrimi: formData.pershkrimi || null
            };

            const url = id
                ? `https://localhost:7254/api/Eksperienca/update-eksperienca-by-id/${id}`
                : `https://localhost:7254/api/Eksperienca/add-eksperienca`;

            const method = id ? 'put' : 'post';

            const postResponse = await axios({
                method,
                url,
                data,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (postResponse.status === (id ? 200 : 201)) {
                setSuccessMessage('Experience saved successfully!');
                setFormData({
                    titulli: '',
                    llojiPunesimit: '',
                    emriKompanise: '',
                    lokacioni: '',
                    llojiLokacionit: '',
                    dataFillimit: '',
                    dataMbarimit: '',
                    pershkrimi: ''
                });
            } else {
                setErrorMessage('Something went wrong. Please try again.');
            }

        } catch (error) {
            console.error('Error saving experience:', error);
            setErrorMessage('Error: Could not complete the request.');
        }
    };

    return (
        <div className="container-fluid h-100 bg-light mb-4 mt-4">
            <div className="row h-100 mt-4">
                <div className="col d-flex justify-content-center mb-4">
                    <div className="col-md-8 col-lg-6 col-xl-4">
                        <h4 className="text-center text-muted fst-italic m-3">{id ? 'Edit Experience' : 'Add Your Professional Experience'}</h4>

                        {errorMessage && (
                            <div className="alert alert-danger text-center" role="alert">
                                {errorMessage}
                            </div>
                        )}

                        {successMessage && (
                            <div className="alert alert-success text-center" role="alert">
                                {successMessage}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="border p-4 shadow-lg rounded bg-white" style={{ boxShadow: '10px 10px 12px rgba(0, 0, 0, 0.1)' }}>
                            <div className="form-group mb-3">
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
                            <div className="form-group mb-3">
                                <label id="llojiPunesimit-label" className='form-label fw-bold'>Lloji i punësimit*</label>
                                <Select
                                    aria-labelledby="llojiPunesimit-label"
                                    options={workTypes}
                                    value={workTypes.find(option => option.value === formData.llojiPunesimit)}
                                    onChange={handleSelectChange}
                                    placeholder="Zgjedhni llojin e punësimit"
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="emriKompanise" className='form-label fw-bold'>Emri i institucionit*</label>
                                <Select
                                    options={institucionet}
                                    value={institucionet.find(option => option.value === formData.emriKompanise)}
                                    onChange={handleInstitutionChange}
                                    placeholder="Zgjedhni institucionin"
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="lokacioni" className='form-label fw-bold'>Lokacioni*</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lokacioni"
                                    name="lokacioni"
                                    value={formData.lokacioni}
                                    onChange={handleChange}
                                    placeholder="Shkruani lokacionin e punës"
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
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
                            <div className="form-group mb-3">
                                <label htmlFor="dataFillimit" className='form-label fw-bold'>Data e fillimit*</label>
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
                            <div className="form-group mb-3">
                                <label htmlFor="dataMbarimit" className='form-label fw-bold'>Data e përfundimit</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="dataMbarimit"
                                    name="dataMbarimit"
                                    value={formData.dataMbarimit}
                                    onChange={handleChange}
                                    placeholder="Shkruani datën e përfundimit (opsionale)"
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="pershkrimi" className='form-label fw-bold'>Përshkrimi</label>
                                <textarea
                                    className="form-control"
                                    id="pershkrimi"
                                    name="pershkrimi"
                                    value={formData.pershkrimi}
                                    onChange={handleChange}
                                    placeholder="Shkruani përshkrimin e punës (opsionale)"
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100 active mb-2 mt-2">{id ? 'Update' : 'Save'}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Eksperienca;
