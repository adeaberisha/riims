import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select'; // Assuming you're using react-select

function Gjuhet() {
    const [formData, setFormData] = useState({
        EmriGjuhes: '',
        Niveli: ''
    });

    const [languageOptions, setLanguageOptions] = useState([]);
    const [niveliGjuhesorOptions, setNiveliGjuhesorOptions] = useState([]);

    useEffect(() => {
        // Fetch languages
        axios.get('https://localhost:7254/api/Gjuhet')
            .then(response => {
                const options = response.data.map(lang => ({ value: lang.Id, label: lang.EmriGjuhes }));
                setLanguageOptions(options);
            })
            .catch(error => {
                console.error('Error fetching languages:', error);
            });

        // Fetch language levels
        axios.get('https://localhost:7254/api/NiveliGjuhesor/get-all-NiveletGjuhesore')
            .then(response => {
                const options = response.data.map(level => ({ value: level.Id, label: level.Niveli }));
                setNiveliGjuhesorOptions(options);
            })
            .catch(error => {
                console.error('Error fetching language levels:', error);
            });
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleLanguageChange = (selectedOption) => {
        setFormData({
            ...formData,
            EmriGjuhes: selectedOption ? selectedOption.value : ''
        });
    };

    const handleLevelChange = (selectedOption) => {
        setFormData({
            ...formData,
            Niveli: selectedOption ? selectedOption.value : ''
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
                EmriGjuhes: formData.EmriGjuhes,
                Niveli: formData.Niveli
            };
        
            const postResponse = await axios.post(
                `https://localhost:7254/api/UserGjuhet/add-userGjuhet`,
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
        
            if (postResponse.status === 201) {
                alert('Skill added successfully!');
            } else {
                alert('Something went wrong. Please try again.');
            }
        
        } catch (error) {
            console.error('Error adding experience:', error);
            alert('Error adding experience. Please try again.');
        }
    };

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <div className="col-md-6 col-lg-5 col-xl-4">
                <h4 className="text-center text-muted fst-italic m-3">Shtoni gjuhën në të cilën jeni i aftë</h4>
                <form onSubmit={handleSubmit} className="border p-4 shadow-lg rounded bg-white">
                    <div className="form-group mb-3">
                        <label htmlFor="EmriGjuhes" className='form-label fw-bold'>Emri i gjuhës*</label>
                        <Select
                            id="EmriGjuhes"
                            name="EmriGjuhes"
                            value={languageOptions.find(option => option.value === formData.EmriGjuhes)}
                            onChange={handleLanguageChange}
                            options={languageOptions}
                            placeholder="Zgjedhni gjuhën"
                            isClearable
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="Niveli" className='form-label fw-bold'>Niveli gjuhësor</label>
                        <Select
                            id="Niveli"
                            name="Niveli"
                            value={niveliGjuhesorOptions.find(option => option.value === formData.Niveli)}
                            onChange={handleLevelChange}
                            options={niveliGjuhesorOptions}
                            placeholder="Zgjedhni nivelin"
                            isClearable
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 active mb-2 mt-2">Ruaj</button>
                </form>
            </div>
        </div>
    );
}

export default Gjuhet;
