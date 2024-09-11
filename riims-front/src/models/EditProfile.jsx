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
        NiveliAkademik: '',
        numriTelefonit: '',
        foto: defaultImage
    });
    const [niveliAkademikOptions, setNiveliAkademikOptions] = useState([]);
    const token = localStorage.getItem('jwtToken'); 
   

    useEffect(() => {
        if (token) {
            fetchData();
        } else {
            alert('Token not found. Please log in again.');
        }

        const savedFoto = localStorage.getItem("foto");
        if (savedFoto) {
            setFormData(prevFormData => ({
                ...prevFormData,
                foto: savedFoto
            }));
        }
    }, [token]);

    useEffect(() => {
        const fetchNiveliAkademik = async () => {
            try {
                const response = await axios.get('https://localhost:7254/api/NiveliAkademik/get-all-NiveletAkademike');
                const options = response.data.map(level => ({
                    value: level.id,
                    label: level.lvl
                }));
                setNiveliAkademikOptions(options);
            } catch (error) {
                console.error('Error fetching academic levels:', error);
                alert('Failed to fetch academic levels.');
            }
        };
        fetchNiveliAkademik();
    }, []);

    

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0]; 
    };
    
    // Usage
    const formattedDate = formatDate('2024-09-10T14:13:13.097');

    const fetchData = async () => {
        try {
            const response = await axios.get('https://localhost:7254/api/UserProfile/get-profile-by-id', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const personData = response.data;
            setFormData(prevFormData => ({
                ...prevFormData,
                ...personData,
                dataELindjes: personData.dataELindjes ? formatDate(personData.dataELindjes) : '',
                foto: personData.foto || localStorage.getItem("foto") || defaultImage
            }));
        } catch (error) {
            console.error('Error fetching person data:', error);
            alert('Error fetching profile data. Please try again.');
        }
    };
    
    const handleImageUpload = async (file) => {
        const formData = new FormData();
        formData.append('File', file);
        formData.append('FileName', file.name);
      
        try {
          const response = await axios.post('https://localhost:7254/api/Images/Upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          });
          const imageData = response.data;
          if (imageData && imageData.url) {
            setFormData(prevFormData => ({
              ...prevFormData,
              foto: imageData.url, // Update the profile picture with the uploaded image
            }));
            localStorage.setItem("foto", imageData.url);
          }
        } catch (error) {
          console.error('Gabim gjatë ngarkimit të imazhit', error);
          alert('Gabim gjatë ngarkimit të imazhit. Ju lutemi provoni përsëri.');
        }
      };
    
    

    const handleChange = async (e) => {
        if (e.target.name === "foto") {
            const file = e.target.files[0];
            if (file) {
                
                if (!file.type.startsWith('image/')) {
                    alert('Please select a valid image file.');
                    return;
                }
                if (file.size > 5 * 1024 * 1024) { 
                    alert('File size exceeds 5MB.');
                    return;
                }
    
               
                const imageData = await handleImageUpload(file);
                if (imageData && imageData.url) {
                    setFormData(prevFormData => ({
                        ...prevFormData,
                        foto: imageData.url 
                    }));
                    localStorage.setItem("foto", imageData.url);
                }
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
    
        const formDataToSend = {
            emri: formData.emri || '',
            mbiemri: formData.mbiemri || '',
            gjinia: formData.gjinia || '',
            adresa: formData.adresa || '',
            dataELindjes: formData.dataELindjes ? formatDate(formData.dataELindjes) : null,
            NiveliAkademik: formData.NiveliAkademik || '',  // Ensure this is included
            numriTelefonit: formData.numriTelefonit || '',
            foto: formData.foto || ''
        };
    
        console.log('Submitting data:', formDataToSend);
    
        try {
            const response = await axios.put('https://localhost:7254/api/UserProfile/update-profile', formDataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            localStorage.setItem("foto", formData.foto);
            alert('Profile updated successfully!');
        } catch (error) {
            if (error.response && error.response.data) {
                const validationErrors = error.response.data.errors;
                console.error('Validation errors:', validationErrors);
                alert(`Error updating profile: ${Object.values(validationErrors).flat().join(', ')}`);
            } else {
                console.error('Error updating profile:', error.message);
                alert(`Error updating profile: ${error.message}`);
            }
        }
    };
    
    
    return (
        <div className="container mt-5 mb-3">
            <div className="row justify-content-center">
                <div className="col-md-4 text-center">
                    <div className="card mb-3">
                        <div className="card-body">
                            <h4 className='fst-italic mb-4 '>Edit Profile</h4>
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
                                    <label htmlFor="NiveliAkademik" className='text-muted'>Niveli Akademik</label>
                                    <select
                                        className="form-control"
                                        id="NiveliAkademik"
                                        name="NiveliAkademik"
                                        value={formData.NiveliAkademik || ''}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Academic Level</option>
                                        {niveliAkademikOptions.map(level => (
                                            <option key={level.value} value={level.value}>
                                                {level.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6 mb-3 d-flex align-items-end">
                                <div className="form-group flex-grow-1">
                                    <label htmlFor="numriTelefonit" className='text-muted'>Numri i Telefonit</label>
                                    <input type="text" className="form-control" id="numriTelefonit" name="numriTelefonit" value={formData.numriTelefonit || ''} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col-md-6 mb-3 d-flex align-items-end">
                                <div className="form-group flex-grow-1">
                                    <button type="submit" className="btn btn-primary active btn-block">Save Changes</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;
