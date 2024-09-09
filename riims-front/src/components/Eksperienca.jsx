import React, { useState } from 'react';
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

function Eksperienca() {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Retrieve token from localStorage
        const token = localStorage.getItem("jwtToken");
    
        console.log('Retrieved token:', token); // Make sure this matches the key used in login
        
        if (!token) {
            alert("Token not found.");
            return;
        }
        
        try {
            // Prepare the payload
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
        
            // Call the backend API
            const postResponse = await axios.post(
                `https://localhost:7254/api/Eksperienca/add-eksperienca`,
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
        
            if (postResponse.status === 201) {
                alert('Experience added successfully!');
            } else {
                alert('Something went wrong. Please try again.');
            }
        
        } catch (error) {
            console.error('Error adding experience:', error);
            if (error.response) {
                console.error('Error response:', error.response.data);
                console.error('Error status:', error.response.status);
            } else if (error.request) {
                console.error('Error request:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
            console.error('Error config:', error.config);
            alert('Error adding experience. Please try again.');
        }
    };
    
    
    

    return (
        <div className="container-fluid d-flex align-items-center justify-content-center min-vh-100 bg-light" style={{ backgroundColor: '#f8f9fa' }}>
            <div className="row w-100 mb-4">
                <div className="col d-flex justify-content-center mb-4">
                    <div className="col-md-8 col-lg-6 col-xl-4">
                        <h4 className="text-center text-muted fst-italic m-3">Shtoni eksperiencën tuaj profesionale</h4>
                        <form onSubmit={handleSubmit} className="border p-4 shadow-sm rounded bg-white">
                            <div className="form-group mb-3">
                                <label htmlFor="titulli" className='text-muted m-1'>Titulli*</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="titulli"
                                    name="titulli"
                                    value={formData.titulli}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label id="llojiPunesimit-label" className='text-muted m-1'>Lloji i punësimit*</label>
                                <Select
                                    aria-labelledby="llojiPunesimit-label"
                                    options={workTypes}
                                    value={workTypes.find(option => option.value === formData.llojiPunesimit)}
                                    onChange={handleSelectChange}
                                    placeholder="Zgjedhni një lloj të punësimit"
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="emriKompanise" className='text-muted m-1'>Emri i kompanisë*</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="emriKompanise"
                                    name="emriKompanise"
                                    value={formData.emriKompanise}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="lokacioni" className='text-muted m-1'>Lokacioni*</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lokacioni"
                                    name="lokacioni"
                                    value={formData.lokacioni}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="llojiLokacionit" className='text-muted m-1'>Lloji i lokacionit*</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="llojiLokacionit"
                                    name="llojiLokacionit"
                                    value={formData.llojiLokacionit}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="dataFillimit" className='text-muted m-1'>Data e punësimit*</label>
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
                                <label htmlFor="dataMbarimit" className='text-muted m-1'>Data e përfundimit</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="dataMbarimit"
                                    name="dataMbarimit"
                                    value={formData.dataMbarimit}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="pershkrimi" className='text-muted m-1'>Përshkrimi</label>
                                <textarea
                                    className="form-control"
                                    id="pershkrimi"
                                    name="pershkrimi"
                                    value={formData.pershkrimi}
                                    onChange={handleChange}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100 active mb-2 mt-2">Ruaj</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Eksperienca;
