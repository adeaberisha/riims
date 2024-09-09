import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import defaultImage from '../photos/person.png';

function EditProfile() {
    const [formData, setFormData] = useState({
        emri: '',
        mbiemri: '',
        gjinia: '',
        adresa: '',
        dataELindjes: '',
        titulliAkademik: '',
        numriTelefonit: '',
        foto: defaultImage
    });
    const [userId, setUserId] = useState('');
    const token = localStorage.getItem('authToken'); 
    useEffect(() => {
        const userId = localStorage.getItem("userId");
        setUserId(userId);
        fetchData(userId);

        const savedFoto = localStorage.getItem("foto");
        if (savedFoto) {
            setFormData(prevFormData => ({
                ...prevFormData,
                foto: savedFoto
            }));
        }
    }, []);

    const fetchData = async (userId) => {
        try {
            const response = await axios.get(`https://localhost:7254/api/User/get-person-by-id/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const personData = response.data;
            setFormData(prevFormData => ({
                ...prevFormData,
                ...personData,
                foto: personData.foto || localStorage.getItem("foto") || defaultImage
            }));
        } catch (error) {
            console.error('Error fetching person data:', error);
        }
    };

    const handleChange = (e) => {
        if (e.target.name === "foto") {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const imageDataUrl = reader.result;
                    setFormData(prevFormData => ({
                        ...prevFormData,
                        foto: imageDataUrl
                    }));
                };
                reader.readAsDataURL(file);
            }
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
        }
    };

    const handleRemovePhoto = () => {
        setFormData(prevFormData => ({
            ...prevFormData,
            foto: defaultImage
        }));
        localStorage.removeItem("foto"); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const fullUrl = `https://localhost:7254/api/User/update-person-by-id/${userId}`;
            await axios.put(fullUrl, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            localStorage.setItem("foto", formData.foto);
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating person:', error.response ? error.response.data : error.message);
            alert('Error updating profile. Please try again.');
        }
    };

    return (
        <div className="container mt-5 mb-3">
            <div className="row justify-content-center">
                <div className="col-md-4 text-center">
                    <div className="card mb-3">
                        <div className="card-body">
                            <h4 className='fst-italic mb-4'>Edit Profile</h4>
                            {formData.foto && (
                                <div className="mb-3">
                                    <img src={formData.foto} alt="Selected" className="img-thumbnail" style={{ width: '200px', height: '200px' }} />
                                </div>
                            )}
                            <button
                                type="button"
                                className="btn btn-danger mb-3"
                                onClick={handleRemovePhoto}
                            >
                                Remove Photo
                            </button>
                            <input
                                type="file"
                                className="form-control mb-3"
                                id="foto"
                                name="foto"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <div className="form-group">
                                    <label htmlFor="emri" className='text-muted'>Emri</label>
                                    <input type="text" className="form-control" id="emri" name="emri" value={formData.emri || ''} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col-md-6 mb-3">
                                <div className="form-group">
                                    <label htmlFor="mbiemri" className='text-muted'>Mbiemri</label>
                                    <input type="text" className="form-control" id="mbiemri" name="mbiemri" value={formData.mbiemri || ''} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col-md-6 mb-3">
                                <div className="form-group">
                                    <label htmlFor="gjinia" className='text-muted'>Gjinia</label>
                                    <input type="text" className="form-control" id="gjinia" name="gjinia" value={formData.gjinia || ''} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col-md-6 mb-3">
                                <div className="form-group">
                                    <label htmlFor="adresa" className='text-muted'>Adresa</label>
                                    <input type="text" className="form-control" id="adresa" name="adresa" value={formData.adresa || ''} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col-md-6 mb-3">
                                <div className="form-group">
                                    <label htmlFor="dataELindjes" className='text-muted'>Data e Lindjes</label>
                                    <input type="date" className="form-control" id="dataELindjes" name="dataELindjes" value={formData.dataELindjes || ''} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col-md-6 mb-3">
                                <div className="form-group">
                                    <label htmlFor="titulliAkademik" className='text-muted'>Niveli Akademik</label>
                                    <input type="text" className="form-control" id="titulliAkademik" name="titulliAkademik" value={formData.titulliAkademik || ''} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col-md-6 mb-3 d-flex align-items-end">
                                <div className="form-group flex-grow-1">
                                    <label htmlFor="numriTelefonit" className='text-muted'>Numri i Telefonit</label>
                                    <input type="text" className="form-control" id="numriTelefonit" name="numriTelefonit" value={formData.numriTelefonit || ''} onChange={handleChange} />
                                </div>
                                <button type="submit" className="btn btn-primary ms-3">Update Profile</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;
