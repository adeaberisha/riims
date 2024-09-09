import React, { useState } from 'react';
import axios from 'axios';

function Specializimet() {
    const [formData, setFormData] = useState({
        emriIinstitucionit: '',
        llojiIspecializimit: '',
        lokacionit: '',
        dataEFillimit: '',
        dataEMbarimit: '',
        aftesiteEfituara: '',
        pershkrimi: '',
        nrKredive: ''
    });

    const [otherInstitution, setOtherInstitution] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Special case for dropdown
        if (name === 'emriIinstitucionit' && value === 'Other') {
            setOtherInstitution(true); // Show the custom input for "Other"
        } else if (name === 'emriIinstitucionit') {
            setOtherInstitution(false); // Hide the custom input for "Other"
            setFormData({
                ...formData,
                emriIinstitucionit: value
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleCustomInstitutionChange = (e) => {
        setFormData({
            ...formData,
            emriIinstitucionit: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("jwtToken");
        if (!token) {
            alert("Token not found.");
            return;
        }

        try {
            const data = {
                emriInstitucionit: formData.emriIinstitucionit,
                llojiIspecializimit: formData.llojiIspecializimit,
                lokacionit: formData.lokacionit,
                dataEFillimit: formData.dataEFillimit,
                dataEMbarimit: formData.dataEMbarimit,
                aftesiteEfituara: formData.aftesiteEfituara,
                pershkrimi: formData.pershkrimi,
                nrKredive: formData.nrKredive
            };

            const postResponse = await axios.post(
                `https://localhost:7254/api/Specializimet/add-specializim`,
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (postResponse.status === 201) {
                alert('Specialization added successfully!');
            } else {
                alert('Something went wrong. Please try again.');
            }

        } catch (error) {
            console.error('Error adding specialization:', error);
            alert('Error adding specialization. Please try again.');
        }
    };

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100 bg-light mb-4">
            <div className="col-md-6 col-lg-5 col-xl-4">
                <h4 className="text-center text-muted fst-italic m-3">Shtoni specializimin</h4>
                <form onSubmit={handleSubmit} className="border p-4 shadow-lg rounded bg-white">
                    <div className="form-group mb-3">
                        <label htmlFor="emriIinstitucionit" className='form-label fw-bold'>Emri i institucionit*</label>
                        <input
                            list="institucionet"
                            className="form-control"
                            id="emriIinstitucionit"
                            name="emriIinstitucionit"
                            value={formData.emriIinstitucionit}
                            onChange={handleChange}
                            required
                        />
                        <datalist id="institucionet">
                            <option value="UBT" />
                            <option value="UP" />
                            <option value="Other" />
                        </datalist>
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="llojiIspecializimit" className='form-label fw-bold'>Lloji i specializimit*</label>
                        <input type="text" className="form-control" id="llojiIspecializimit" name="llojiIspecializimit" value={formData.llojiIspecializimit} onChange={handleChange} required />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="lokacionit" className='form-label fw-bold'>Lokacioni</label>
                        <input type="text" className="form-control" id="lokacionit" name="lokacionit" value={formData.lokacionit} onChange={handleChange} />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="dataEFillimit" className='form-label fw-bold'>Data e fillimit*</label>
                        <input type="date" className="form-control" id="dataEFillimit" name="dataEFillimit" value={formData.dataEFillimit} onChange={handleChange} required />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="dataEMbarimit" className='form-label fw-bold'>Data e mbarimit</label>
                        <input type="date" className="form-control" id="dataEMbarimit" name="dataEMbarimit" value={formData.dataEMbarimit} onChange={handleChange} />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="aftesiteEfituara" className='form-label fw-bold'>Aftësitë e fituara</label>
                        <input type="text" className="form-control" id="aftesiteEfituara" name="aftesiteEfituara" value={formData.aftesiteEfituara} onChange={handleChange} />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="nrKredive" className='form-label fw-bold'>Numri i kredive</label>
                        <input type="number" className="form-control" id="nrKredive" name="nrKredive" value={formData.nrKredive} onChange={handleChange} />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="pershkrimi" className='form-label fw-bold'>Përshkrimi</label>
                        <textarea className="form-control" id="pershkrimi" name="pershkrimi" value={formData.pershkrimi} onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 active mb-2 mt-2">Add</button>
                </form>
            </div>
        </div>
    );
}

export default Specializimet;
