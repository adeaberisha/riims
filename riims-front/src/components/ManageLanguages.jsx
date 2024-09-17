import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import axios from 'axios';
import AddGjuhaModal from './services/AddGjuhaModal'; 
import EditGjuhaModal from './services/EditGjuhaModal'; 
import DeleteGjuhaModal from './services/DeleteGjuhaModal';
import AddNiveliGjuhesModal from './services/AddNiveliGjuhesorModal'; 
import EditNiveliGjuhesModal from './services/EditNiveliGjuhesorModal'; 
import '../css/ManageLanguages.css';

const ManageLanguages = () => {
    const [languages, setLanguages] = useState([]);
    const [niveliGjuhes, setNiveliGjuhes] = useState([]); 
    const [showAddGjuhaModal, setShowAddGjuhaModal] = useState(false);
    const [showEditGjuhaModal, setShowEditGjuhaModal] = useState(false);
    const [showDeleteGjuhaModal, setShowDeleteGjuhaModal] = useState(false);
    const [showAddNiveliGjuhesModal, setShowAddNiveliGjuhesModal] = useState(false);
    const [showEditNiveliGjuhesModal, setShowEditNiveliGjuhesModal] = useState(false);
    const [currentGjuhe, setCurrentGjuhe] = useState(null);
    const [currentNiveliGjuhes, setCurrentNiveliGjuhes] = useState(null); 
    const token = localStorage.getItem('jwtToken');

    const fetchLanguages = useCallback(async () => {
        try {
            const response = await axios.get('https://localhost:7254/api/Gjuhet/get-all-gjuhet', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (Array.isArray(response.data)) {
                setLanguages(response.data);
            } else {
                console.error('Unexpected response data format:', response.data);
            }
        } catch (error) {
            console.error('Error fetching languages:', error);
        }
    }, [token]);

    const fetchNiveliGjuhes = useCallback(async () => {
        try {
            const response = await axios.get('https://localhost:7254/api/NiveliGjuhesor/get-all-NiveletGjuhesore', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (Array.isArray(response.data)) {
                setNiveliGjuhes(response.data);
            } else {
                console.error('Unexpected response data format:', response.data);
            }
        } catch (error) {
            console.error('Error fetching niveli gjuhes:', error);
        }
    }, [token]);

    useEffect(() => {
        fetchLanguages();
        fetchNiveliGjuhes();
    }, [fetchLanguages, fetchNiveliGjuhes]);

    const handleAddGjuhe = (newGjuhe) => {
        setLanguages((prevLanguages) => [newGjuhe, ...prevLanguages]);
    };

    const handleEditGjuhe = (updatedGjuhe) => {
        setLanguages((prevLanguages) =>
            prevLanguages.map((gjuhe) =>
                gjuhe.id === updatedGjuhe.id ? updatedGjuhe : gjuhe
            )
        );
    };

    const handleDeleteGjuhe = (id) => {
        setLanguages((prevLanguages) =>
            prevLanguages.filter((gjuhe) => gjuhe.id !== id)
        );
    };

    const handleAddNiveliGjuhes = (newNiveliGjuhes) => {
        setNiveliGjuhes((prevNiveliGjuhes) => [newNiveliGjuhes, ...prevNiveliGjuhes]);
    };

    const handleEditNiveliGjuhes = (updatedNiveliGjuhes) => {
        setNiveliGjuhes((prevNiveliGjuhes) =>
            prevNiveliGjuhes.map((niveli) =>
                niveli.id === updatedNiveliGjuhes.id ? updatedNiveliGjuhes : niveli
            )
        );
    };

    const handleEditGjuheClick = (gjuhe) => {
        setCurrentGjuhe(gjuhe);
        setShowEditGjuhaModal(true);
    };

    const handleDeleteGjuheClick = (gjuhe) => {
        setCurrentGjuhe(gjuhe);
        setShowDeleteGjuhaModal(true);
    };

    const handleEditNiveliGjuhesClick = (niveli) => {
        setCurrentNiveliGjuhes(niveli);
        setShowEditNiveliGjuhesModal(true);
    };

    return (
        <Container fluid className="mt-4">
            <Row>
                <Col md={6}>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4>Gjuhët</h4>
                        <Button variant="outline-success" onClick={() => setShowAddGjuhaModal(true)}>
                            <i className="bi bi-plus-lg"></i> Add
                        </Button>
                    </div>
                    <Table striped bordered hover className="custom-table">
                        <thead>
                            <tr>
                                <th className="language-column">Gjuha</th>
                                <th className="table-actions">Edit</th>
                                <th className="table-actions">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {languages.length > 0 ? (
                                languages.map((gjuhe) => (
                                    <tr key={gjuhe.id}>
                                        <td>{gjuhe.emriGjuhes || 'No Name'}</td>
                                        <td>
                                            <Button
                                                variant="primary"
                                                className="btn btn-custom btn-sm custom-primary-btn"
                                                onClick={() => handleEditGjuheClick(gjuhe)}
                                            >
                                                <i className="bi bi-pencil-fill me-2"></i> Edit
                                            </Button>
                                        </td>
                                        <td>
                                            <Button
                                                variant="danger"
                                                className="btn btn-custom btn-sm"
                                                onClick={() => handleDeleteGjuheClick(gjuhe)}
                                            >
                                                <i className="bi bi-trash-fill me-2"></i> Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="text-center">No Data Available</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Col>

                <Col md={6}>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4>Niveli Gjuhesor</h4>
                        <Button variant="outline-success" onClick={() => setShowAddNiveliGjuhesModal(true)}>
                            <i className="bi bi-plus-lg"></i> Add
                        </Button>
                    </div>
                    <Table striped bordered hover className="custom-table">
                        <thead>
                            <tr>
                                <th className="language-column">Niveli</th>
                                <th className="table-actions">Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {niveliGjuhes.length > 0 ? (
                                niveliGjuhes.map((niveli) => (
                                    <tr key={niveli.id}>
                                        <td>{niveli.niveli || 'No Level'}</td>
                                        <td>
                                            <Button
                                                variant="primary"
                                                className="btn btn-custom btn-sm custom-primary-btn"
                                                onClick={() => handleEditNiveliGjuhesClick(niveli)}
                                            >
                                                <i className="bi bi-pencil-fill me-2"></i> Edit
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="2" className="text-center">No Data Available</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Col>
            </Row>

            {/* Add Language Modal */}
            <AddGjuhaModal
                show={showAddGjuhaModal}
                onClose={() => setShowAddGjuhaModal(false)}
                onSave={handleAddGjuhe}
                token={token}
            />

            {/* Edit Language Modal */}
            {currentGjuhe && (
                <EditGjuhaModal
                    show={showEditGjuhaModal}
                    onClose={() => setShowEditGjuhaModal(false)}
                    onSave={handleEditGjuhe}
                    token={token}
                    gjuhe={currentGjuhe}
                />
            )}

            {/* Delete Language Modal */}
            {currentGjuhe && (
                <DeleteGjuhaModal
                    show={showDeleteGjuhaModal}
                    onClose={() => setShowDeleteGjuhaModal(false)}
                    onDelete={handleDeleteGjuhe}
                    token={token}
                    gjuhe={currentGjuhe}
                />
            )}

            {/* Add Niveli Gjuhes Modal */}
            <AddNiveliGjuhesModal
                show={showAddNiveliGjuhesModal}
                onClose={() => setShowAddNiveliGjuhesModal(false)}
                onSave={handleAddNiveliGjuhes}
                token={token}
            />

            {/* Edit Niveli Gjuhes Modal */}
            {currentNiveliGjuhes && (
                <EditNiveliGjuhesModal
                    show={showEditNiveliGjuhesModal}
                    onClose={() => setShowEditNiveliGjuhesModal(false)}
                    onSave={handleEditNiveliGjuhes}
                    token={token}
                    niveli={currentNiveliGjuhes}
                />
            )}
        </Container>
    );
};

export default ManageLanguages;
