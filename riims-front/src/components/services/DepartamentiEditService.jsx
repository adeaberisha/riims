import React, { useState, useCallback } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Function to fetch Departamenti by ID with token
async function fetchDepartamentiById(id, token) {
    try {
        const response = await fetch(`https://localhost:7254/api/Departamenti/get-departamenti-by-id/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const departamenti = await response.json();
            console.log('Departamenti u mor me sukses:', departamenti); // Log the full response
            return departamenti;
        } else {
            const errorMessage = await response.text();
            console.error(`Dështoi të merret Departamenti me ID ${id}. Status: ${response.status}, Message: ${errorMessage}`);
        }
    } catch (error) {
        console.error(`Gabim gjatë marrjes së Departamentit: ${error}`);
    }
}

// Function to update Departamenti by ID with token
async function updateDepartamentiById(id, updatedDepartamenti, token) {
    try {
        const response = await fetch(`https://localhost:7254/api/Departamenti/update-departamenti/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updatedDepartamenti)
        });

        if (response.ok) {
            console.log(`Departamenti me ID ${id} u përditësua me sukses.`);
        } else {
            const errorMessage = await response.text();
            console.error(`Dështoi të përditësohet Departamenti me ID ${id}. Status: ${response.status}, Message: ${errorMessage}`);
        }
    } catch (error) {
        console.error(`Gabim gjatë përditësimit të Departamentit: ${error}`);
    }
}

// Edit Departamenti Modal Component
export function useEditDepartamentiModal(setDepartamente, token) {
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [currentDepartamenti, setCurrentDepartamenti] = useState('');
    const [currentInstitucioni, setCurrentInstitucioni] = useState('');

    // Fetch the current Departamenti details when editing
    const fetchDepartamenti = useCallback(async (id) => {
        try {
            const departamenti = await fetchDepartamentiById(id, token);
            if (departamenti) {
                setCurrentDepartamenti(departamenti.emri); // Emri nga DTO
                setCurrentInstitucioni(departamenti.emriInstitucionit); // EmriInstitucionit nga DTO
            }
        } catch (error) {
            console.error('Gabim gjatë marrjes së detajeve të Departamentit:', error);
        }
    }, [token]);

    // Show the modal and load Departamenti data
    const openEditModal = useCallback((id) => {
        setCurrentId(id);
        fetchDepartamenti(id);
        setShowEditModal(true);
    }, [fetchDepartamenti]);

    // Update logic
    const handleUpdateDepartamenti = useCallback(async () => {
        if (currentDepartamenti.trim() && currentInstitucioni.trim()) {
            try {
                const updatedDepartamenti = {
                    emri: currentDepartamenti,
                    emriInstitucionit: currentInstitucioni
                };

                await updateDepartamentiById(currentId, updatedDepartamenti, token);
                setDepartamente(prevDepartamente => prevDepartamente.map(departamenti => 
                    departamenti.id === currentId ? { ...departamenti, emri: currentDepartamenti, emriInstitucionit: currentInstitucioni } : departamenti
                ));
                setShowEditModal(false);
            } catch (error) {
                console.error('Gabim gjatë përditësimit të Departamentit:', error);
            }
        }
    }, [currentDepartamenti, currentInstitucioni, currentId, token, setDepartamente]);

    const EditDepartamentiModal = () => (
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Ndrysho departamentin</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Emri i Departamentit</Form.Label>
                        <Form.Control
                            type="text"
                            value={currentDepartamenti}
                            onChange={(e) => setCurrentDepartamenti(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Emri i Institucionit</Form.Label>
                        <Form.Control
                            type="text"
                            value={currentInstitucioni}
                            onChange={(e) => setCurrentInstitucioni(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                    Mbyll
                </Button>
                <Button variant="primary" onClick={handleUpdateDepartamenti}>
                    Ruaj
                </Button>
            </Modal.Footer>
        </Modal>
    );

    return {
        openEditModal,
        EditDepartamentiModal,
    };
}