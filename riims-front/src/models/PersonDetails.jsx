import React, { useState, useEffect } from 'react';
import axios from 'axios';
import defaultImage from '../photos/person.png';
import '../css/PersonDetails.css';
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

    if (loading) {
        return <p>Loading user information...</p>;
    }
    if (error) {
        return <p>{error}</p>;
    }
    return (
        <div className="container mt-4 mb-4">
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
                            <p>Data e Lindjes: {userData.dataELindjes}</p>
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
                    <div id="relatedAftesiteCollapse" className="accordion-collapse collapse " aria-labelledby="relatedAftesiteHeading" data-bs-parent="#relatedAftesiteAccordion">
                        <div className="accordion-body">
                            {aftesite.map((aftesia, index) => (
                                <div key={index}>
                                    <p>Aftesia: {aftesia.emri}</p>
                                    <p>Emri Institucionit: {aftesia.emriInstitucionit}</p>
                                    <div>
                                        <button className="btn btn-primary me-2">Edit</button>
                                        <button className="btn btn-danger" onClick={() => confirmDelete(aftesia.id)}>Delete</button>
                                    </div>
                                    {index !== aftesia.length - 1 && <hr />}
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
                    <div id="edukimiCollapse" className="accordion-collapse collapse " aria-labelledby="edukimiHeading" data-bs-parent="#edukimiAccordion">
                        <div className="accordion-body">
                            {edukimi.map((edukimi, index) => (
                                <div key={index}>
                                    <p>Emri Institucionit: {edukimi.institucioni}</p>
                                    <p>Fusha Studimit: {edukimi.fushaStudimit}</p>
                                    <p>Lokacioni: {edukimi.lokacioni}</p>
                                    <p>Data Fillimit: {new Date(edukimi.dataFillimit).toLocaleDateString()}</p>
                                    <p>Data Mbarimit: {new Date(edukimi.dataMbarimit).toLocaleDateString()}</p>
                                    <p>Niveli Akademik: {edukimi.niveliAkademik}</p>
                                    <p>Pershkrimi: {edukimi.pershkrimi}</p>
                                    <div>
                                        <button className="btn btn-primary me-2">Edit</button>
                                        <button className="btn btn-danger" onClick={() => requestDelete(edukimi.id)}>Delete</button>
                                    </div>
                                    {index !== edukimi.length - 1 && <hr />}
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
                    <div id="eksperiencatCollapse" className="accordion-collapse collapse " aria-labelledby="eksperiencatHeading" data-bs-parent="#eksperiencatAccordion">
                        <div className="accordion-body">
                            {eksperienca.map((exp, index) => (
                                <div key={index}>
                                    <p>Titulli: {exp.titulli}</p>
                                    <p>Lloji Punesimit: {exp.llojiPunesimit}</p>
                                    <p>Emri Kompanise: {exp.emriInstitucionit}</p>
                                    <p>Lokacioni: {exp.lokacioni}</p>
                                    <p>Lloji Lokacionit: {exp.llojiLokacionit}</p>
                                    <p>Data Fillimit: {new Date(exp.dataFillimit).toLocaleDateString()}</p>
                                    {exp.dataMbarimit && <p>Data Mbarimit: {new Date(exp.dataMbarimit).toLocaleDateString()}</p>}
                                    {exp.pershkrimi && <p>Pershkrimi: {exp.pershkrimi}</p>}
                                    <button className="btn btn-primary me-2">Edit</button>
                                    <button className="btn btn-danger" onClick={() => triggerEksperiencaDelete(exp.id)}>Delete</button>
                                    {index !== exp.length - 1 && <hr />}
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
                    <div id="gjuhetCollapse" className="accordion-collapse collapse " aria-labelledby="gjuhetHeading" data-bs-parent="#gjuhetAccordion">
                        <div className="accordion-body">
                            {gjuhet.map((gjuhet, index) => (
                                <div key={index}>
                                    <p>Emri Gjuhes: {gjuhet.emriGjuhes}</p>
                                    <p>Niveli Gjuhesor: {gjuhet.niveliGjuhesor}</p>
                                    <div>
                                        <button className="btn btn-primary me-2">Edit</button>
                                        <button className="btn btn-danger" onClick={() => triggerUserGjuhetDelete(gjuhet.id)}>Delete</button>
                                    </div>
                                    {index !== gjuhet.length - 1 && <hr />}
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
                    <div id="honorsAndAwardsCollapse" className="accordion-collapse collapse " aria-labelledby="honorsAndAwardsHeading" data-bs-parent="#accordion">
                        <div className="accordion-body">
                            {honorsAndAwards.map((award, index) => (
                                <div key={index}>
                                    <p>Titulli: {award.titulli}</p>
                                    <p>Issuer: {award.issuer}</p>
                                    <p>Institucioni:{award.emriInstitucionit}</p>
                                    <p>Data Eleshimit: {new Date(award.dataEleshimit).toLocaleDateString()}</p>
                                    <p>Pershkrimi: {award.pershkrimi}</p>
                                    <div>
                                        <button className="btn btn-primary me-2">Edit</button>
                                        <button className="btn btn-danger" onClick={() => triggerHonorDelete(award.id)}>Delete</button>
                                    </div>
                                    {index !== honorsAndAwards.length - 1 && <hr />}
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
                    <div id="licensatCollapse" className="accordion-collapse collapse " aria-labelledby="licensatHeading" data-bs-parent="#accordion">
                        <div className="accordion-body">
                            {licensat.map((license, index) => (
                                <div key={index}>
                                    <p>Emri: {license.emri}</p>
                                    <p>Emri Institucionit: {license.emriInstitucionit}</p>
                                    <p>Data Leshimit: {new Date(license.dataLeshimit).toLocaleDateString()}</p>
                                    <p>Data Skadimit: {license.dataSkadimit ? new Date(license.dataSkadimit).toLocaleDateString() : 'N/A'}</p>
                                    {license.credentialId && <p>Credential ID: {license.credentialId}</p>}
                                    {license.credentialUrl && <p>Credential URL: {license.credentialUrl}</p>}
                                    <div>
                                        <button className="btn btn-primary me-2">Edit</button>
                                        <button className="btn btn-danger" onClick={() => triggerLicensaDelete(license.id)}>Delete</button>
                                    </div>
                                    {index !== licensat.length - 1 && <hr />}
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
                    <div id="mbikqyresITemaveCollapse" className="accordion-collapse collapse " aria-labelledby="mbikqyresITemaveHeading" data-bs-parent="#accordion">
                        <div className="accordion-body">
                            {mbikqyresITemave.map((item, index) => (
                                <div key={index}>
                                    <p>Titulli Temes: {item.titulliTemes}</p>
                                    <p>Studenti: {item.studenti}</p>
                                    <p>Data: {new Date(item.data).toLocaleDateString()}</p>
                                    <p>Departamenti: {item.emriDepartamentit}</p>
                                    <div>
                                        <button className="btn btn-primary me-2">Edit</button>
                                        <button className="btn btn-danger" onClick={() => triggerMbikqyresDelete(item.id)}>Delete</button>
                                    </div>
                                    {index !== mbikqyresITemave.length - 1 && <hr />}
                                </div>
                            ))}
                        </div>
                        <MbikqyresDeleteModal />
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="projektiHeading">
                        <button className="accordion-button custom-accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#projektiCollapse" aria-expanded="true" aria-controls="projektiCollapse" >
                            Projekti
                        </button>
                    </h2>
                    <div id="projektiCollapse" className="accordion-collapse collapse " aria-labelledby="projektiHeading" data-bs-parent="#accordion">
                        <div className="accordion-body">
                            {projekti.map((projekt, index) => (
                                <div key={index}>
                                    <p>Emri Projektit: {projekt.emriProjektit}</p>
                                    <p>Institucioni: {projekt.emriInstitucionit}</p>
                                    <p>Start Date: {new Date(projekt.startDate).toLocaleDateString()}</p>
                                    <p>End Date: {projekt.endDate ? new Date(projekt.endDate).toLocaleDateString() : 'Ongoing'}</p>
                                    <p>Collaborators: {projekt.collaborators || 'None'}</p>
                                    <p>Description: {projekt.description}</p>
                                    <p>Asocohet: {projekt.asocohet}</p>
                                    <div>
                                        <button className="btn btn-primary me-2">Edit</button>
                                        <button className="btn btn-danger" onClick={() => triggerProjektiDelete(projekt.id)}>Delete</button>
                                    </div>
                                    {index !== projekti.length - 1 && <hr />}
                                </div>
                            ))}
                        </div>
                        <ProjektiDeleteModal />
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="publikimetHeading">
                        <button className="accordion-button custom-accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#publikimetCollapse" aria-expanded="true" aria-controls="publikimetCollapse" >
                            Publikimet
                        </button>
                    </h2>
                    <div id="publikimetCollapse" className="accordion-collapse collapse " aria-labelledby="publikimetHeading" data-bs-parent="#accordion">
                        <div className="accordion-body">
                            {publikimi.map((publication, index) => (
                                <div key={index}>
                                    <p>Titulli: {publication.titulli}</p>
                                    <p>Lloji Publikimit: {publication.llojiPublikimit}</p>
                                    <p>Data Publikimit: {new Date(publication.dataPublikimi).toLocaleDateString()}</p>
                                    <p>Departamenti: {publication.emriDepartamentit}</p>
                                    <p>Linku Publikimit: {publication.linkuPublikimit ? publication.linkuPublikimit : "N/A"}</p>
                                    <p>Autori Kryesor: {publication.autoriKryesor ? "Yes" : "No"}</p>
                                    <div>
                                        <button className="btn btn-primary me-2">Edit</button>
                                        <button className="btn btn-danger" onClick={() => triggerPublikimiDelete(publication.id)}>Delete</button>
                                    </div>
                                    {index !== publikimi.length - 1 && <hr />}
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
                    <div id="punaVullnetareCollapse" className="accordion-collapse collapse " aria-labelledby="punaVullnetareHeading" data-bs-parent="#accordion">
                        <div className="accordion-body">
                            {punaVullnetare.map((puna, index) => (
                                <div key={index}>
                                    <p>Emri i Institucionit: {puna.emriInstitucionit}</p>
                                    <p>Roli: {puna.roli}</p>
                                    <p>Data Fillimit: {new Date(puna.dataFillimit).toLocaleDateString()}</p>
                                    <p>Data Mbarimit: {puna.dataMbarimit ? new Date(puna.dataMbarimit).toLocaleDateString() : "N/A"}</p>
                                    <p>Pershkrimi: {puna.pershkrimi ? puna.pershkrimi : "N/A"}</p>
                                    <div>
                                        <button className="btn btn-primary me-2">Edit</button>
                                        <button className="btn btn-danger" onClick={() => triggerPunaVullnetareDelete(puna.id)}>Delete</button>
                                    </div>
                                    {index !== punaVullnetare.length - 1 && <hr />}
                                </div>
                            ))}
                        </div>
                        <PunaVullnetareDeleteModal />
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="specializimetHeading">
                        <button className="accordion-button custom-accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#specializimetCollapse" aria-expanded="true" aria-controls="specializimetCollapse" >
                            Specializimet
                        </button>
                    </h2>
                    <div id="specializimetCollapse" className="accordion-collapse collapse " aria-labelledby="specializimetHeading" data-bs-parent="#accordion">
                        <div className="accordion-body">
                            {specializimi.map((spec, index) => (
                                <div key={index}>
                                    <p>Emri i Institucionit: {spec.emriInstitucionit}</p>
                                    <p>Lloji i Specializimit: {spec.llojiIspecializimit}</p>
                                    <p>Lokacioni: {spec.lokacionit ? spec.lokacionit : "N/A"}</p>
                                    <p>Data e Fillimit: {new Date(spec.dataEFillimit).toLocaleDateString()}</p>
                                    <p>Data e Mbarimit: {spec.dataEMbarimit ? new Date(spec.dataEMbarimit).toLocaleDateString() : "N/A"}</p>
                                    <p>Aftesite e Fituara: {spec.aftesiteEfituara ? spec.aftesiteEfituara : "N/A"}</p>
                                    <p>Pershkrimi: {spec.pershkrimi ? spec.pershkrimi : "N/A"}</p>
                                    <p>Numri i Kredive: {spec.nrKredive ? spec.nrKredive : "N/A"}</p>
                                    <div>
                                        <button className="btn btn-primary me-2">Edit</button>
                                        <button className="btn btn-danger" onClick={() => triggerSpecializimDelete(spec.id)}>Delete</button>
                                    </div>
                                    {index !== specializimi.length - 1 && <hr />}
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