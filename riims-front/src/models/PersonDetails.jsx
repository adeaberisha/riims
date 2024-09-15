import React, { useState, useEffect } from 'react';
import axios from 'axios';
import defaultImage from '../photos/person.png';
import '../css/PersonDetails.css';
import { Link } from 'react-router-dom';
import { useDeleteAftesia } from '../DeleteModals/DeleteAftesia.jsx';
import { useDeleteEdukimi } from '../DeleteModals/DeleteEdukimi.jsx';
import { useDeleteEksperienca } from '../DeleteModals/DeleteEksperienca.jsx';
import { useDeleteUserGjuhet } from '../DeleteModals/DeleteGjuhet.jsx';
import { useDeleteHonor } from '../DeleteModals/DeleteHonors.jsx';
import { useDeleteLicensa } from '../DeleteModals/DeleteLicensa.jsx';
import { useDeleteMbikqyres } from '../DeleteModals/DeleteMbikqyres.jsx';
import { useDeleteProjekti } from '../DeleteModals/DeleteProjekti.jsx';
import { useDeletePublikimi } from '../DeleteModals/DeletePublikimi.jsx';
import { useDeletePunaVullnetare } from '../DeleteModals/DeletePunaVullnetare.jsx';
import { useDeleteSpecializim } from '../DeleteModals/DeleteSpecializimi.jsx';
import { useNavigate } from 'react-router-dom';
import { useHideEducation, useHideExperience } from '../components/useHideItems'; 

function PersonDetails() {
    const [userData, setUserData] = useState({
        emri: '',
        mbiemri: '',
        gjinia: '',
        adresa: '',
        dataELindjes: '',
        titulliAkademik: '',
        numriTelefonit: '',
        foto: defaultImage
    });
    const [aftesite, setAftesite] = useState([]);
    const [edukimi, setEdukimi] = useState([]);
    const [eksperienca, setEksperienca] = useState([]);
    const [gjuhet, setGjuhet] = useState([]);
    const [honorsAndAwards, setHonorsAndAwards] = useState([]);
    const [licensat, setLicensat] = useState([]);
    const [mbikqyresITemave, setMbikqyresITemave] = useState([]);
    const [projekti, setProjekti] = useState([]);
    const [publikimi, setPublikimi] = useState([]);
    const [punaVullnetare, setPunaVullnetare] = useState([]);
    const [specializimi, setSpecializimi] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Use the custom hooks for hidden items
    const [hiddenEducation, toggleHideEducation] = useHideEducation();
    const [hiddenExperience, toggleHideExperience] = useHideExperience();

    const { confirmDelete, DeleteConfirmationModal } = useDeleteAftesia(setAftesite);
    const { requestDelete, EdukimiDeleteModal } = useDeleteEdukimi(setEdukimi);
    const { triggerEksperiencaDelete, EksperiencaConfirmDeleteModal } = useDeleteEksperienca(setEksperienca);
    const { triggerUserGjuhetDelete, UserGjuhetConfirmDeleteModal } = useDeleteUserGjuhet(setGjuhet);
    const { triggerHonorDelete, HonorDeleteConfirmationModal } = useDeleteHonor(setHonorsAndAwards);
    const { triggerLicensaDelete, LicensaDeleteModal } = useDeleteLicensa(setLicensat);
    const { triggerMbikqyresDelete, MbikqyresDeleteModal } = useDeleteMbikqyres(setMbikqyresITemave);
    const { triggerProjektiDelete, ProjektiDeleteModal } = useDeleteProjekti(setProjekti);
    const { triggerPublikimiDelete, PublikimiDeleteModal } = useDeletePublikimi(setPublikimi);
    const { triggerPunaVullnetareDelete, PunaVullnetareDeleteModal } = useDeletePunaVullnetare(setPunaVullnetare);
    const { triggerSpecializimDelete, SpecializimDeleteModal } = useDeleteSpecializim(setSpecializimi);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("jwtToken");
                if (!token) {
                    console.error("Token not found. Please log in again.");
                    setError("Token not found. Please log in again.");
                    return;
                }

                const response = await axios.get(`https://localhost:7254/api/UserProfile/get-profile-by-id`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                console.log('User data fetched:', response.data);
                setUserData(response.data);

                // Fetch other data with the same token
                const fetchData = async (url, setter) => {
                    try {
                        const res = await axios.get(url, {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'application/json'
                            }
                        });
                        console.log(`${url} data fetched:`, res.data);
                        setter(res.data);
                    } catch (error) {
                        console.error(`Error fetching data from ${url}:`, error);
                        setError(`Error fetching data from ${url}.`);
                    }
                };

                await fetchData('https://localhost:7254/api/Aftesite/get-aftesite-by-person-id', setAftesite);
                await fetchData('https://localhost:7254/api/Edukimi/get-edukimet-by-person-id', setEdukimi);
                await fetchData('https://localhost:7254/api/Eksperienca/get-eksperiencat-by-person-id', setEksperienca);
                await fetchData('https://localhost:7254/api/UserGjuhet/get-userGjuhet-by-person-id', setGjuhet);
                await fetchData('https://localhost:7254/api/HonorsAndAwards/get-honors-by-person-id', setHonorsAndAwards);
                await fetchData('https://localhost:7254/api/Licensat/get-licensat', setLicensat);
                await fetchData('https://localhost:7254/api/MbikqyresITemave/get-mbikqyresit-by-person-id', setMbikqyresITemave);
                await fetchData('https://localhost:7254/api/Projekti/get-projekti-by-person-id', setProjekti);
                await fetchData('https://localhost:7254/api/Publikimi/get-publikimet', setPublikimi);
                await fetchData('https://localhost:7254/api/PunaVullnetare/get-punet-vullnetare-by-person-id', setPunaVullnetare);
                await fetchData('https://localhost:7254/api/Specializimet/get-specializimet-by-person-id', setSpecializimi);

            } catch (error) {
                console.error("Error fetching user data:", error);
                setError("Error fetching user data.");
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, []);

    // Function to handle viewing CV
    const handleViewCV = () => {
        navigate('/thecv', {
            state: {
                user: userData,
                education: edukimi.filter(ed => !hiddenEducation.includes(ed.id)),
                experience: eksperienca.filter(ex => !hiddenExperience.includes(ex.id)),
                languages: gjuhet
            }
        });
    };

    if (loading) {
        return <p>Loading user information...</p>;
    }
    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="container mt-4 mb-4">
            <div className="text-center mt-4">
                <button className="btn btn-primary" onClick={handleViewCV}>View CV</button>
            </div>
            <div className="accordion" id="accordionDetails">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="personalDetailsHeading">
                        <button className="accordion-button custom-accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#personalDetailsCollapse" aria-expanded="true" aria-controls="personalDetailsCollapse">
                            {userData.emri} {userData.mbiemri}
                        </button>
                    </h2>
                    <div id="personalDetailsCollapse" className="accordion-collapse collapse" aria-labelledby="personalDetailsHeading" data-bs-parent="#accordionDetails">
                        <div className="accordion-body">
                            <p>Titulli Akademik: {userData.niveliAkademik}</p>
                            <p>Adresa: {userData.adresa}</p>
                            <p>Gjinia: {userData.gjinia}</p>
                            <p>Data e Lindjes: {new Date(userData.dataELindjes).toLocaleDateString()}</p>
                            <p>Numri Telefonit: {userData.numriTelefonit}</p>
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="relatedAftesiteHeading">
                        <button className="accordion-button custom-accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#relatedAftesiteCollapse" aria-expanded="true" aria-controls="relatedAftesiteCollapse">
                            Aftesite
                        </button>
                    </h2>
                    <div id="relatedAftesiteCollapse" className="accordion-collapse collapse" aria-labelledby="relatedAftesiteHeading" data-bs-parent="#relatedAftesiteAccordion">
                        <div className="accordion-body">
                            {aftesite.map((aftesia, index) => (
                                <div key={index} className="d-flex justify-content-between align-items-center mb-3">
                                    <div className="me-3">
                                        <p className="mb-0">Aftesia: {aftesia.emri}</p>
                                        <p className="mb-0">Emri Institucionit: {aftesia.emriInstitucionit}</p>
                                    </div>
                                    <div>
                                        <Link to={`/EditAftesia/${aftesia.id}`} className="btn custom-button custom-button-edit me-2">Edit</Link>
                                        <button className="btn custom-button custom-button-delete" onClick={() => confirmDelete(aftesia.id)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <DeleteConfirmationModal />
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="edukimiHeading">
                        <button className="accordion-button custom-accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#edukimiCollapse" aria-expanded="true" aria-controls="edukimiCollapse">
                            Edukimi
                        </button>
                    </h2>
                    <div id="edukimiCollapse" className="accordion-collapse collapse" aria-labelledby="edukimiHeading" data-bs-parent="#edukimiAccordion">
                        <div className="accordion-body">
                            {edukimi.map((ed, index) => (
                                <div key={index} className="d-flex justify-content-between align-items-center mb-3">
                                    <div className="me-3">
                                        <p className="mb-0">Emri Institucionit: {ed.institucioni}</p>
                                        <p className="mb-0">Fusha Studimit: {ed.fushaStudimit}</p>
                                        <p className="mb-0">Lokacioni: {ed.lokacioni}</p>
                                        <p className="mb-0">Data Fillimit: {new Date(ed.dataFillimit).toLocaleDateString()}</p>
                                        {ed.dataMbarimit && (
                                            <p className="mb-0">Data Mbarimit: {new Date(ed.dataMbarimit).toLocaleDateString()}</p>
                                        )}
                                        <p className="mb-0">Niveli Akademik: {ed.niveliAkademik}</p>
                                        {ed.pershkrimi && (
                                            <p className="mb-0">Pershkrimi: {ed.pershkrimi}</p>
                                        )}
                                    </div>
                                    <div>
                                        <button className="btn btn-secondary me-2" onClick={() => toggleHideEducation(ed.id)}>
                                            <i className={`bi ${hiddenEducation.includes(ed.id) ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                                        </button>
                                        <Link to={`/EditGjuhet/${ed.id}`} className="btn custom-button custom-button-edit me-2">Edit</Link>
                                        <button className="btn custom-button custom-button-delete" onClick={() => triggerUserGjuhetDelete(ed.id)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <EdukimiDeleteModal />
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header" id="eksperiencatHeading">
                        <button className="accordion-button custom-accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#eksperiencatCollapse" aria-expanded="true" aria-controls="eksperiencatCollapse">
                            Eksperiencat
                        </button>
                    </h2>
                    <div id="eksperiencatCollapse" className="accordion-collapse collapse" aria-labelledby="eksperiencatHeading" data-bs-parent="#eksperiencatAccordion">
                        <div className="accordion-body">
                            {eksperienca.map((exp, index) => (
                                <div key={index} className="d-flex justify-content-between align-items-center mb-3">
                                    <div className="me-3">
                                        <p className="mb-0">Titulli: {exp.titulli}</p>
                                        <p className="mb-0">Lloji Punesimit: {exp.llojiPunesimit}</p>
                                        <p className="mb-0">Emri Kompanise: {exp.emriInstitucionit}</p>
                                        <p className="mb-0">Lokacioni: {exp.lokacioni}</p>
                                        <p className="mb-0">Lloji Lokacionit: {exp.llojiLokacionit}</p>
                                        <p className="mb-0">Data Fillimit: {new Date(exp.dataFillimit).toLocaleDateString()}</p>
                                        {exp.dataMbarimit && (
                                            <p className="mb-0">Data Mbarimit: {new Date(exp.dataMbarimit).toLocaleDateString()}</p>
                                        )}
                                        {exp.pershkrimi && (
                                            <p className="mb-0">Pershkrimi: {exp.pershkrimi}</p>
                                        )}
                                    </div>
                                    <div>
                                        <Link to={`/EditEksperienca/${exp.id}`} className="btn btn-primary me-2">Edit</Link>
                                        <button className="btn btn-danger" onClick={() => triggerEksperiencaDelete(exp.id)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <EksperiencaConfirmDeleteModal />
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header" id="gjuhetHeading">
                        <button className="accordion-button custom-accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#gjuhetCollapse" aria-expanded="true" aria-controls="gjuhetCollapse">
                            Gjuhet
                        </button>
                    </h2>
                    <div id="gjuhetCollapse" className="accordion-collapse collapse" aria-labelledby="gjuhetHeading" data-bs-parent="#gjuhetAccordion">
                        <div className="accordion-body">
                            {gjuhet.map((gjuhet, index) => (
                                <div key={index} className="d-flex justify-content-between align-items-center mb-3">
                                    <div className="me-3">
                                        <p className="mb-0">Emri Gjuhes: {gjuhet.emriGjuhes}</p>
                                        <p className="mb-0">Niveli Gjuhesor: {gjuhet.niveliGjuhesor}</p>
                                    </div>
                                    <div>
                                        <Link to={`/EditGjuhet/${gjuhet.id}`} className="btn custom-button custom-button-edit me-2">Edit</Link>
                                        <button className="btn custom-button custom-button-delete" onClick={() => triggerUserGjuhetDelete(gjuhet.id)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <UserGjuhetConfirmDeleteModal />
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="honorsAndAwardsHeading">
                        <button className="accordion-button custom-accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#honorsAndAwardsCollapse" aria-expanded="true" aria-controls="honorsAndAwardsCollapse">
                            Honors and Awards
                        </button>
                    </h2>
                    <div id="honorsAndAwardsCollapse" className="accordion-collapse collapse" aria-labelledby="honorsAndAwardsHeading" data-bs-parent="#accordion">
                        <div className="accordion-body">
                            {honorsAndAwards.map((award, index) => (
                                <div key={index} className="d-flex justify-content-between align-items-center mb-3">
                                    <div className="me-3">
                                        <p className="mb-0">Titulli: {award.titulli}</p>
                                        <p className="mb-0">Issuer: {award.issuer}</p>
                                        <p className="mb-0">Institucioni: {award.emriInstitucionit}</p>
                                        <p className="mb-0">Data Eleshimit: {new Date(award.dataEleshimit).toLocaleDateString()}</p>
                                        <p className="mb-0">Pershkrimi: {award.pershkrimi}</p>
                                    </div>
                                    <div>
                                        <Link to={`/EditHonorsAndAwards/${award.id}`} className="btn custom-button custom-button-edit me-2">Edit</Link>
                                        <button className="btn custom-button custom-button-delete" onClick={() => triggerHonorDelete(award.id)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <HonorDeleteConfirmationModal />
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="licensatHeading">
                        <button className="accordion-button custom-accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#licensatCollapse" aria-expanded="true" aria-controls="licensatCollapse">
                            Licensat
                        </button>
                    </h2>
                    <div id="licensatCollapse" className="accordion-collapse collapse" aria-labelledby="licensatHeading" data-bs-parent="#accordion">
                        <div className="accordion-body">
                            {licensat.map((license, index) => (
                                <div key={index} className="d-flex justify-content-between align-items-center mb-3">
                                    <div className="me-3">
                                        <p className="mb-0">Emri: {license.emri}</p>
                                        <p className="mb-0">Emri Institucionit: {license.emriInstitucionit}</p>
                                        <p className="mb-0">Data Leshimit: {new Date(license.dataLeshimit).toLocaleDateString()}</p>
                                        {license.dataSkadimit && (
                                            <p className="mb-0">Data Skadimit: {new Date(license.dataSkadimit).toLocaleDateString()}</p>
                                        )}
                                        {license.credentialId && <p className="mb-0">Credential ID: {license.credentialId}</p>}
                                        {license.credentialUrl && <p className="mb-0">Credential URL: {license.credentialUrl}</p>}
                                    </div>
                                    <div>
                                        <Link to={`/EditLicensa/${license.id}`} className="btn custom-button custom-button-edit me-2">Edit</Link>
                                        <button className="btn custom-button custom-button-delete" onClick={() => triggerLicensaDelete(license.id)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <LicensaDeleteModal />
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="mbikqyresITemaveHeading">
                        <button className="accordion-button custom-accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#mbikqyresITemaveCollapse" aria-expanded="true" aria-controls="mbikqyresITemaveCollapse">
                            Mbikqyres i Temave
                        </button>
                    </h2>
                    <div id="mbikqyresITemaveCollapse" className="accordion-collapse collapse" aria-labelledby="mbikqyresITemaveHeading" data-bs-parent="#accordion">
                        <div className="accordion-body">
                            {mbikqyresITemave.map((item, index) => (
                                <div key={index} className="d-flex justify-content-between align-items-center mb-3">
                                    <div className="me-3">
                                        <p className="mb-0">Titulli Temes: {item.titulliTemes}</p>
                                        <p className="mb-0">Studenti: {item.studenti}</p>
                                        <p className="mb-0">Data: {new Date(item.data).toLocaleDateString()}</p>
                                        <p className="mb-0">Departamenti: {item.emriDepartamentit}</p>
                                    </div>
                                    <div>
                                        <Link to={`/EditMbikqyres/${item.id}`} className="btn custom-button custom-button-edit me-2">Edit</Link>
                                        <button className="btn custom-button custom-button-delete" onClick={() => triggerMbikqyresDelete(item.id)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <MbikqyresDeleteModal />
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="projektiHeading">
                        <button className="accordion-button custom-accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#projektiCollapse" aria-expanded="true" aria-controls="projektiCollapse">
                            Projekti
                        </button>
                    </h2>
                    <div id="projektiCollapse" className="accordion-collapse collapse" aria-labelledby="projektiHeading" data-bs-parent="#accordion">
                        <div className="accordion-body">
                            {projekti.map((projekt, index) => (
                                <div key={index} className="d-flex justify-content-between align-items-center mb-3">
                                    <div className="me-3">
                                        <p className="mb-0">Emri Projektit: {projekt.emriProjektit}</p>
                                        <p className="mb-0">Institucioni: {projekt.emriInstitucionit}</p>
                                        <p className="mb-0">Data e Fillimit: {new Date(projekt.startDate).toLocaleDateString()}</p>
                                        {projekt.endDate && <p className="mb-0">Data e Mbarimit: {new Date(projekt.endDate).toLocaleDateString()}</p>}
                                        {projekt.collaborators && <p className="mb-0">Bashkëpunëtorët: {projekt.collaborators}</p>}
                                        <p className="mb-0">Asocohet: {projekt.asocohet}</p>
                                    </div>
                                    <div>
                                        <Link to={`/EditProjekti/${projekt.id}`} className="btn custom-button custom-button-edit me-2">Edit</Link>
                                        <button className="btn custom-button custom-button-delete" onClick={() => triggerProjektiDelete(projekt.id)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <ProjektiDeleteModal />
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="publikimetHeading">
                        <button className="accordion-button custom-accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#publikimetCollapse" aria-expanded="true" aria-controls="publikimetCollapse">
                            Publikimet
                        </button>
                    </h2>
                    <div id="publikimetCollapse" className="accordion-collapse collapse" aria-labelledby="publikimetHeading" data-bs-parent="#accordion">
                        <div className="accordion-body">
                            {publikimi.map((publication, index) => (
                                <div key={index} className="d-flex justify-content-between align-items-center mb-3">
                                    <div className="me-3">
                                        <p className="mb-0">Titulli: {publication.titulli}</p>
                                        <p className="mb-0">Lloji Publikimit: {publication.llojiPublikimit}</p>
                                        <p className="mb-0">Data Publikimit: {new Date(publication.dataPublikimi).toLocaleDateString()}</p>
                                        <p className="mb-0">Departamenti: {publication.emriDepartamentit}</p>
                                        {publication.linkuPublikimit && <p className="mb-0">Linku Publikimit: {publication.linkuPublikimit}</p>}
                                        {publication.autoriKryesor !== undefined && <p className="mb-0">Autori Kryesor: {publication.autoriKryesor ? "Yes" : "No"}</p>}
                                    </div>
                                    <div>
                                        <Link to={`/EditPublikimi/${publication.id}`} className="btn custom-button custom-button-edit me-2">Edit</Link>
                                        <button className="btn custom-button custom-button-delete" onClick={() => triggerPublikimiDelete(publication.id)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <PublikimiDeleteModal />
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="punaVullnetareHeading">
                        <button className="accordion-button custom-accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#punaVullnetareCollapse" aria-expanded="true" aria-controls="punaVullnetareCollapse">
                            Puna Vullnetare
                        </button>
                    </h2>
                    <div id="punaVullnetareCollapse" className="accordion-collapse collapse" aria-labelledby="punaVullnetareHeading" data-bs-parent="#accordion">
                        <div className="accordion-body">
                            {punaVullnetare.map((puna, index) => (
                                <div key={index} className="d-flex justify-content-between align-items-center mb-3">
                                    <div className="me-3">
                                        <p className="mb-0">Emri i Institucionit: {puna.emriInstitucionit}</p>
                                        <p className="mb-0">Roli: {puna.roli}</p>
                                        <p className="mb-0">Data Fillimit: {new Date(puna.dataFillimit).toLocaleDateString()}</p>
                                        {puna.dataMbarimit && <p className="mb-0">Data Mbarimit: {new Date(puna.dataMbarimit).toLocaleDateString()}</p>}
                                        {puna.pershkrimi && <p className="mb-0">Pershkrimi: {puna.pershkrimi}</p>}
                                    </div>
                                    <div>
                                        <Link to={`/EditPunaVullnetare/${puna.id}`} className="btn custom-button custom-button-edit me-2">Edit</Link>
                                        <button className="btn custom-button custom-button-delete" onClick={() => triggerPunaVullnetareDelete(puna.id)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <PunaVullnetareDeleteModal />
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="specializimetHeading">
                        <button className="accordion-button custom-accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#specializimetCollapse" aria-expanded="true" aria-controls="specializimetCollapse">
                            Specializimet
                        </button>
                    </h2>
                    <div id="specializimetCollapse" className="accordion-collapse collapse" aria-labelledby="specializimetHeading" data-bs-parent="#accordion">
                        <div className="accordion-body">
                            {specializimi.map((spec, index) => (
                                <div key={index} className="d-flex justify-content-between align-items-center mb-3">
                                    <div className="me-3">
                                        <p className="mb-0">Emri i Institucionit: {spec.emriInstitucionit}</p>
                                        <p className="mb-0">Lloji i Specializimit: {spec.llojiIspecializimit}</p>
                                        {spec.lokacionit && <p className="mb-0">Lokacioni: {spec.lokacionit}</p>}
                                        <p className="mb-0">Data e Fillimit: {new Date(spec.dataEFillimit).toLocaleDateString()}</p>
                                        {spec.dataEMbarimit && <p className="mb-0">Data e Mbarimit: {new Date(spec.dataEMbarimit).toLocaleDateString()}</p>}
                                        {spec.aftesiteEfituara && <p className="mb-0">Aftesite e Fituara: {spec.aftesiteEfituara}</p>}
                                        {spec.pershkrimi && <p className="mb-0">Pershkrimi: {spec.pershkrimi}</p>}
                                        {spec.nrKredive > 0 && <p className="mb-0">Numri i Kredive: {spec.nrKredive}</p>}
                                    </div>
                                    <div>
                                        <Link to={`/EditSpecializim/${spec.id}`} className="btn custom-button custom-button-edit me-2">Edit</Link>
                                        <button className="btn custom-button custom-button-delete" onClick={() => triggerSpecializimDelete(spec.id)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <SpecializimDeleteModal />
                    </div>
                </div>
            </div>

        </div>
    );
}
export default PersonDetails;