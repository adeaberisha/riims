import React, { useState, useCallback } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Function to fetch NiveliGjuhesor by ID with token
async function fetchNiveliGjuhesorById(id, token) {
    try {
        const response = await fetch(`https://localhost:7254/api/NiveliGjuhesor/get-NiveletGjuhesore-by-id/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const niveli = await response.json();
            console.log('Fetched NiveliGjuhesor:', niveli); // Log the full response
            return niveli;
        } else {
            const errorMessage = await response.text();
            console.error(`Failed to fetch NiveliGjuhesor with ID ${id}. Status: ${response.status}, Message: ${errorMessage}`);
        }
    } catch (error) {
        console.error(`Error fetching NiveliGjuhesor: ${error}`);
    }
}

// Function to update NiveliGjuhesor by ID with token
async function updateNiveliGjuhesorById(id, updatedNiveli, token) {
    try {
        const response = await fetch(`https://localhost:7254/api/NiveliGjuhesor/update-NivelinGjuhesore-by-id/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updatedNiveli)
        });

        if (response.ok) {
            console.log(`NiveliGjuhesor with ID ${id} updated successfully.`);
        } else {
            const errorMessage = await response.text();
            console.error(`Failed to update NiveliGjuhesor with ID ${id}. Status: ${response.status}, Message: ${errorMessage}`);
        }
    } catch (error) {
        console.error(`Error updating NiveliGjuhesor: ${error}`);
    }
}

// Edit NiveliGjuhesor Modal Component
export function useEditNiveliGjuhesorModal(setNiveliGjuhesore, token) {
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [currentNiveli, setCurrentNiveli] = useState('');

    // Fetch the current NiveliGjuhesor details when editing
    const fetchNiveliGjuhesor = useCallback(async (id) => {
        try {
            const niveli = await fetchNiveliGjuhesorById(id, token);
            if (niveli) {
                setCurrentNiveli(niveli.niveli); // Ensure the field name is correct
            }
        } catch (error) {
            console.error('Error fetching NiveliGjuhesor details:', error);
        }
    }, [token]);

    // Show the modal and load NiveliGjuhesor data
    const openEditModal = useCallback((id) => {
        setCurrentId(id);
        fetchNiveliGjuhesor(id);
        setShowEditModal(true);
    }, [fetchNiveliGjuhesor]);

    // Update logic
    const handleUpdateNiveli = useCallback(async () => {
        if (currentNiveli.trim()) {
            try {
                await updateNiveliGjuhesorById(currentId, { niveli: currentNiveli }, token);
                setNiveliGjuhesore(prevNiveli => prevNiveli.map(niveli => niveli.id === currentId ? { ...niveli, niveli: currentNiveli } : niveli));
                setShowEditModal(false);
            } catch (error) {
                console.error('Error updating NiveliGjuhesor:', error);
            }
        }
    }, [currentNiveli, currentId, token, setNiveliGjuhesore]);

    const EditNiveliModal = () => (
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Ndrysho nivelin gjuhësor</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Niveli</Form.Label>
                        <Form.Control
                            type="text"
                            value={currentNiveli}
                            onChange={(e) => setCurrentNiveli(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                    Mbyll
                </Button>
                <Button variant="primary" onClick={handleUpdateNiveli}>
                    Ruaj
                </Button>
            </Modal.Footer>
        </Modal>
    );

    return {
        openEditModal,
        EditNiveliModal,
    };
}
