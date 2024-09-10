import React, { useState } from 'react';
import axios from 'axios';

function Specializimet() {
    const [formData, setFormData] = useState({
        EmriInstitucionit: '',
        llojiIspecializimit: '',
        lokacionit: '',
        dataEFillimit: '',
        dataEMbarimit: '',
        aftesiteEfituara: '',
        pershkrimi: '',
        nrKredive: ''
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');  // Reset error message
        setSuccessMessage('');  // Reset success message
        const token = localStorage.getItem("jwtToken");

        if (!token) {
            setErrorMessage('Token not found. Please log in again.');
            return;
        }

        try {
            const data = {
                EmriInstitucionit: formData.EmriInstitucionit,
                llojiIspecializimit: formData.llojiIspecializimit,
                lokacionit: formData.lokacionit || null,
                dataEFillimit: formData.dataEFillimit,
                dataEMbarimit: formData.dataEMbarimit || null,
                aftesiteEfituara: formData.aftesiteEfituara || null,
                pershkrimi: formData.pershkrimi || null,
                nrKredive: formData.nrKredive || null
            };

            console.log('Submitting data:', data);  // Debug: Log the data being sent

            const response = await axios.post(
                'https://localhost:7254/api/Specializimet/add-specializim',
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log('Response:', response.data);  // Debug: Log the response

            // Check for success (201 or 200)
            if (response.status === 201 || response.status === 200) {
                setSuccessMessage('Specializimi u shtua me sukses!');
                setFormData({
                    EmriInstitucionit: '',
                    llojiIspecializimit: '',
                    lokacionit: '',
                    dataEFillimit: '',
                    dataEMbarimit: '',
                    aftesiteEfituara: '',
                    pershkrimi: '',
                    nrKredive: ''
                });
            } else {
                setErrorMessage('Diçka shkoi keq. Ju lutem provoni përsëri.');
            }

        } catch (error) {
            console.error('Error adding specializim:', error);
            if (error.response) {
                setErrorMessage('Gabim gjatë shtimit të specializimit.');
            } else if (error.request) {
                setErrorMessage('Nuk u mor përgjigje nga serveri. Ju lutem provoni përsëri.');
            } else {
                setErrorMessage('Gabim: Nuk mund të përfundohet kërkesa.');
            }
        }
    };

    return (
        <div className="container-fluid h-100 bg-light">
            <div className="row h-100">
                <div className="col d-flex justify-content-center align-items-center mb-5 mt-4">
                    <div className="col-md-6 col-lg-5 col-xl-4">
                        <h4 className="text-center text-muted fst-italic m-3">Shtoni specializimin</h4>
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
                        <form onSubmit={handleSubmit} className="border p-4 shadow-sm rounded">
                            <div className="form-group mb-3">
                                <label htmlFor="EmriInstitucionit" className='text-muted m-1'>Emri i institucionit*</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="EmriInstitucionit"
                                    name="EmriInstitucionit"
                                    value={formData.EmriInstitucionit}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label htmlFor="llojiIspecializimit" className='text-muted m-1'>Lloji i specializimit*</label>
                                <input type="text" className="form-control" id="llojiIspecializimit" name="llojiIspecializimit" value={formData.llojiIspecializimit} onChange={handleChange} required />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="lokacionit" className='text-muted m-1'>Lokacioni</label>
                                <input type="text" className="form-control" id="lokacionit" name="lokacionit" value={formData.lokacionit} onChange={handleChange} />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="dataEFillimit" className='text-muted m-1'>Data e fillimit*</label>
                                <input type="date" className="form-control" id="dataEFillimit" name="dataEFillimit" value={formData.dataEFillimit} onChange={handleChange} required />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="dataEMbarimit" className='text-muted m-1'>Data e mbarimit</label>
                                <input type="date" className="form-control" id="dataEMbarimit" name="dataEMbarimit" value={formData.dataEMbarimit} onChange={handleChange} />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="aftesiteEfituara" className='text-muted m-1'>Aftësitë e fituara</label>
                                <input type="text" className="form-control" id="aftesiteEfituara" name="aftesiteEfituara" value={formData.aftesiteEfituara} onChange={handleChange} />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="nrKredive" className='text-muted m-1'>Numri i kredive</label>
                                <input type="number" className="form-control" id="nrKredive" name="nrKredive" value={formData.nrKredive} onChange={handleChange} />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="pershkrimi" className='text-muted m-1'>Përshkrimi</label>
                                <textarea className="form-control" id="pershkrimi" name="pershkrimi" value={formData.pershkrimi} onChange={handleChange} />
                            </div>
                            <button type="submit" className="btn btn-primary w-100 active mb-2 mt-2">Add</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Specializimet;
