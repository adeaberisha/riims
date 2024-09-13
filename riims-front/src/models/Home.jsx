import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Home.css';
import { Link } from 'react-router-dom';
import ubtCampus from '../photos/ubtCampus.jpeg';
import defaultImage from '../photos/person.png';
import briefcase from '../photos/briefcase.png';
import book from '../photos/book.png';
import translate from '../photos/translate.png';
import honorsandawards from '../photos/honorsandawards.png';
import licenses from '../photos/licenses.png';
import project from '../photos/project.png';
import journal from '../photos/journal.png';
import list from '../photos/list.png';
import lightning from '../photos/lightning.png';
import usertie from '../photos/usertie.png';
import heart from '../photos/heart.png';
import star from '../photos/star.png';


function Home() {
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

    const formatDate = (isoDateString) => {
        const date = new Date(isoDateString);
        return date.toISOString().split('T')[0];
    };

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
            return response.data; 
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Error uploading image. Please try again.');
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

    return (
        <main>
          <div className="background-image-container">
                <img src={ubtCampus} alt="Background Image" className="background-image" />
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col-lg-7 pt-2">
                        <div className="user-details-container ml-4 pl-4">
                            <div className="row align-items-center">
                                <div className="col-lg-4 text-center">
                                    <img src={formData.foto} alt="User Image" className="user-photo" />
                                </div>
                                <div className="col-lg-8 px-0 ml-6">
                                    <h1 className="user-name">{`${formData.emri} ${formData.mbiemri}`}</h1>
                                    <p className="user-info my-3">{new Date(formData.dataELindjes).toLocaleDateString()}</p>
                                    <p className="user-info my-3">{`${formData.numriTelefonit}`}</p>
                                    <p className="user-info my-3">{`${formData.adresa}`}</p>
                                    <Link to="/edit-profile" className="btn btn-primary custom-btn-position active mb-3">Edit Profile</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-4 mb-4">
                <div className="row mt-2">
                    {/* Row 1 */}
                    <div className="col-md-4 mb-4">
                        <div className="box text-center bg-white shadow p-3 d-flex flex-column justify-content-center align-items-center">
                            <Link to="/personDetails" className="d-block text-decoration-none">
                                <img src={list} alt="list" style={{ width: '85px', height: 'auto' }} />
                                <div className="box-content mt-3">
                                    <h4 className="fst-italic mb-3" style={{ color: '#244082' }}>Shiko të gjithat</h4>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="col-md-4 mb-4">
                        <div className="box text-center bg-white shadow p-3 d-flex flex-column justify-content-center align-items-center">
                            <Link to="/aftesite" className="d-block text-decoration-none">
                                <img src={lightning} alt="usertie" style={{ width: '85px', height: 'auto' }} />
                                <div className="box-content mt-3">
                                    <h4 className="fst-italic mb-3" style={{ color: '#244082' }}>Aftesitë</h4>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="col-md-4 mb-4">
                        <div className="box text-center bg-white shadow p-3 d-flex flex-column justify-content-center align-items-center">
                            <Link to="/edukimi" className="d-block text-decoration-none">
                                <img src={book} alt="journal" style={{ width: '85px', height: 'auto' }} />
                                <div className="box-content mt-3">
                                    <h4 className="fst-italic mb-3" style={{ color: '#244082' }}>Edukimi</h4>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {/* Row 2 */}
                    <div className="col-md-4 mb-4">
                        <div className="box text-center bg-white shadow p-3 d-flex flex-column justify-content-center align-items-center">
                            <Link to="/eksperienca" className="d-block text-decoration-none">
                                <img src={briefcase} alt="briefcase" style={{ width: '85px', height: 'auto' }} />
                                <div className="box-content mt-3">
                                    <h4 className="fst-italic mb-3" style={{ color: '#244082' }}>Eksperienca</h4>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="col-md-4 mb-4">
                        <div className="box text-center bg-white shadow p-3 d-flex flex-column justify-content-center align-items-center">
                            <Link to="/gjuhet" className="d-block text-decoration-none">
                                <img src={translate} alt="translate" style={{ width: '85px', height: 'auto' }} />
                                <div className="box-content mt-3">
                                    <h4 className="fst-italic mb-3" style={{ color: '#244082' }}>Gjuhët</h4>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="col-md-4 mb-4">
                        <div className="box text-center bg-white shadow p-3 d-flex flex-column justify-content-center align-items-center">
                            <Link to="/licensat" className="d-block text-decoration-none">
                                <img src={licenses} alt="licenses" style={{ width: '85px', height: 'auto' }} />
                                <div className="box-content mt-3">
                                    <h4 className="fst-italic mb-3" style={{ color: '#244082' }}>Licencat</h4>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {/* Row 3 */}
                    <div className="col-md-4 mb-4">
                        <div className="box text-center bg-white shadow p-3 d-flex flex-column justify-content-center align-items-center">
                            <Link to="/mbikqyresitemave" className="d-block text-decoration-none">
                                <img src={usertie} alt="project" style={{ width: '85px', height: 'auto' }} />
                                <div className="box-content mt-3">
                                    <h4 className="fst-italic mb-3" style={{ color: '#244082' }}>Mbikqyresi I Temave</h4>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="col-md-4 mb-4">
                        <div className="box text-center bg-white shadow p-3 d-flex flex-column justify-content-center align-items-center">
                            <Link to="/honorsandawards" className="d-block text-decoration-none">
                                <img src={honorsandawards} alt="lightning" style={{ width: '85px', height: 'auto' }} />
                                <div className="box-content mt-3">
                                    <h4 className="fst-italic mb-3" style={{ color: '#244082' }}>Nderime dhe Cmime</h4>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="col-md-4 mb-4">
                        <div className="box text-center bg-white shadow p-3 d-flex flex-column justify-content-center align-items-center">
                            <Link to="/projekti" className="d-block text-decoration-none">
                                <img src={project} alt="honorsandawards" style={{ width: '85px', height: 'auto' }} />
                                <div className="box-content mt-3">
                                    <h4 className="fst-italic mb-3" style={{ color: '#244082' }}>Projektet</h4>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {/* Row 4 - Additional 3 Sections */}
                    <div className="col-md-4 mb-4">
                        <div className="box text-center bg-white shadow p-3 d-flex flex-column justify-content-center align-items-center">
                            <Link to="/publikimi" className="d-block text-decoration-none">
                                <img src={journal} alt="network" style={{ width: '85px', height: 'auto' }} />
                                <div className="box-content mt-3">
                                    <h4 className="fst-italic mb-3" style={{ color: '#244082' }}>Publikimet</h4>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="col-md-4 mb-4">
                        <div className="box text-center bg-white shadow p-3 d-flex flex-column justify-content-center align-items-center">
                            <Link to="/punavullnetare" className="d-block text-decoration-none">
                                <img src={heart} alt="volunteer" style={{ width: '85px', height: 'auto' }} />
                                <div className="box-content mt-3">
                                    <h4 className="fst-italic mb-3" style={{ color: '#244082' }}>Punet Vullnetare</h4>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="col-md-4 mb-4">
                        <div className="box text-center bg-white shadow p-3 d-flex flex-column justify-content-center align-items-center">
                            <Link to="/specializimet" className="d-block text-decoration-none">
                                <img src={star} alt="settings" style={{ width: '85px', height: 'auto' }} />
                                <div className="box-content mt-3">
                                    <h4 className="fst-italic mb-3" style={{ color: '#244082' }}>Specializimet</h4>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Home;
