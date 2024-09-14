import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import axios from 'axios';
import { useManageGjuha } from './services/LanguageAddDeleteService.jsx'; // Import the hook
import { useEditGjuhaModal } from './services/LanguageEditService.jsx'; // Import the useEditGjuhaModal hook
import { useManageNiveliGjuhesor } from './services/NiveliAddDeleteService.jsx'; // Import the useManageNiveliGjuhesor hook
import { useEditNiveliGjuhesorModal } from './services/NiveliEditService.jsx'; // Import the useEditNiveliGjuhesorModal hook
import '../css/ManageLanguages.css'; // Import your custom CSS

const ManageLanguages = () => {
    const [languages, setLanguages] = useState([]);
    const [languageLevels, setLanguageLevels] = useState([]);
    const token = localStorage.getItem('jwtToken');

    // Language hooks
    const {
        confirmDelete: confirmDeleteLanguage,
        AddLanguageModal,
        DeleteConfirmationModal: DeleteLanguageConfirmationModal,
        setShowAddLanguageModal
    } = useManageGjuha(setLanguages, token);

    const {
        openEditModal: openEditLanguageModal,
        EditLanguageModal
    } = useEditGjuhaModal(setLanguages, token);

    // NiveliGjuhesor hooks
    const {
        confirmDelete: confirmDeleteLevel,
        AddNiveliModal,
        DeleteConfirmationModal: DeleteLevelConfirmationModal,
        setShowAddNiveliModal
    } = useManageNiveliGjuhesor(setLanguageLevels, token);

    const {
        openEditModal: openEditLevelModal,
        EditNiveliModal
    } = useEditNiveliGjuhesorModal(setLanguageLevels, token);

    const fetchLanguages = useCallback(async () => {
        try {
            const response = await axios.get('https://localhost:7254/api/Gjuhet', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setLanguages(response.data);
        } catch (error) {
            console.error('Error fetching languages:', error);
        }
    }, [token]);

    const fetchLanguageLevels = useCallback(async () => {
        try {
            const response = await axios.get('https://localhost:7254/api/NiveliGjuhesor/get-all-NiveletGjuhesore', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setLanguageLevels(response.data);
        } catch (error) {
            console.error('Error fetching language levels:', error);
        }
    }, [token]);

    useEffect(() => {
        fetchLanguages();
        fetchLanguageLevels();
    }, [fetchLanguages, fetchLanguageLevels]);

    return (
        <Container fluid className="mt-4">
            <Row>
                <Col md={6}>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4>Gjuhët</h4>
                        <Button variant="outline-success" onClick={() => setShowAddLanguageModal(true)}>
                            <i className="bi bi-plus-lg"></i> Shto
                        </Button>
                    </div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th className="language-column">Gjuha</th>
                                <th className="table-actions">Edit</th>
                                <th className="table-actions">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {languages.map((language) => (
                                <tr key={language.id}>
                                    <td>{language.emriGjuhes}</td>
                                    <td>
                                        <Button 
                                            variant="primary" 
                                            className="btn btn-custom btn-sm custom-primary-btn"
                                            onClick={() => openEditLanguageModal(language.id)}
                                        >
                                            <i className="bi bi-pencil-fill me-2"></i> Edit
                                        </Button>
                                    </td>
                                    <td>
                                        <Button 
                                            variant="danger" 
                                            className="btn btn-custom btn-sm custom-danger-btn" 
                                            onClick={() => confirmDeleteLanguage(language.id)}
                                        >
                                            <i className="bi bi-trash-fill me-2"></i> Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
                <Col md={6}>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4>Niveli i Gjuhës</h4>
                        <Button variant="outline-success" onClick={() => setShowAddNiveliModal(true)}>
                            <i className="bi bi-plus-lg"></i> Shto
                        </Button>
                    </div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th className="language-column">Niveli</th>
                                <th className="table-actions">Edit</th>
                                <th className="table-actions">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {languageLevels.map((level) => (
                                <tr key={level.id}>
                                    <td>{level.niveli}</td>
                                    <td>
                                        <Button 
                                            variant="primary" 
                                            className="btn btn-custom btn-sm custom-primary-btn"
                                            onClick={() => openEditLevelModal(level.id)}
                                        >
                                            <i className="bi bi-pencil-fill me-2"></i> Edit
                                        </Button>
                                    </td>
                                    <td>
                                        <Button 
                                            variant="danger" 
                                            className="btn btn-custom btn-sm custom-danger-btn"
                                            onClick={() => confirmDeleteLevel(level.id)}
                                        >
                                            <i className="bi bi-trash-fill me-2"></i> Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>

            {/* Modals */}
            <AddLanguageModal />
            <DeleteLanguageConfirmationModal />
            <EditLanguageModal />
            <AddNiveliModal />
            <DeleteLevelConfirmationModal />
            <EditNiveliModal />
        </Container>
    );
};

export default ManageLanguages;

