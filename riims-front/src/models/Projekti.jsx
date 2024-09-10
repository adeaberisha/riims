import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

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

    const [institucionet, setInstitucionet] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

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
        fetchInstitucionet();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSelectChange = (selectedOption) => {
        setFormData({
            ...formData,
            EmriInstitucionit: selectedOption ? selectedOption.value : ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Reset error message before submission
        setSuccessMessage(''); // Reset success message before submission
        const token = localStorage.getItem("jwtToken");

        if (!token) {
            setErrorMessage('Token not found. Please log in again.');
            return;
        }

        try {
            // Prepare the payload
            const data = {
                emriProjektit: formData.emriProjektit,
                startDate: formData.startDate,
                endDate: formData.endDate || null,
                collaborators: formData.collaborators || null,
                description: formData.description,
                asocohet: formData.asocohet,
                EmriInstitucionit: formData.EmriInstitucionit
            };

            // Call the backend API
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
                setSuccessMessage('Project added successfully!');
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
                setErrorMessage('Something went wrong. Please try again.');
            }

        } catch (error) {
            console.error('Error adding project:', error);
            if (error.response) {
                setErrorMessage(`Error: ${error.response.data}`);
            } else if (error.request) {
                setErrorMessage('No response from the server. Please try again.');
            } else {
                setErrorMessage('Error: Could not complete the request.');
            }
        }
    };

    return (
        <div className="container-fluid h-100 bg-light">
            <div className="row h-100">
                <div className="col-md-2 col-xl-2 px-0">
                    {/* Sidebar or other content */}
                </div>
                <div className="col d-flex justify-content-center align-items-center mb-5 mt-4">
                    <div className="col-md-6 col-lg-5 col-xl-4">
                        <h4 className="text-center text-muted fst-italic m-3">Shtoni projektet tuaja</h4>

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

                        <form onSubmit={handleSubmit} className="border p-4 shadow-lg rounded bg-white">
                            <div className="form-group mb-3">
                                <label htmlFor="emriProjektit" className="form-label fw-bold">Projekti*</label>
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    id="emriProjektit"
                                    name="emriProjektit"
                                    value={formData.emriProjektit}
                                    onChange={handleChange}
                                    required
                                    placeholder="Shkruani emrin e projektit"
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="startDate" className="form-label fw-bold">Data e fillimit*</label>
                                <input
                                    type="date"
                                    className="form-control form-control-lg"
                                    id="startDate"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="endDate" className="form-label fw-bold">Data e mbarimit</label>
                                <input
                                    type="date"
                                    className="form-control form-control-lg"
                                    id="endDate"
                                    name="endDate"
                                    value={formData.endDate}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="collaborators" className="form-label fw-bold">Bashkpuntorë</label>
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    id="collaborators"
                                    name="collaborators"
                                    value={formData.collaborators}
                                    onChange={handleChange}
                                    placeholder="Shkruani bashkëpunëtorët"
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="description" className="form-label fw-bold">Përshkrimi*</label>
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    placeholder="Shkruani përshkrimin"
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="asocohet" className="form-label fw-bold">Asocohet*</label>
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    id="asocohet"
                                    name="asocohet"
                                    value={formData.asocohet}
                                    onChange={handleChange}
                                    required
                                    placeholder="Shkruani asocimin"
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="EmriInstitucionit" className="form-label fw-bold">Emri i Institucionit*</label>
                                <Select
                                    options={institucionet}
                                    value={institucionet.find(option => option.value === formData.EmriInstitucionit)}
                                    onChange={handleSelectChange}
                                    placeholder="Zgjedhni një institucion"
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100 py-2">Ruaj</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Projekti;
