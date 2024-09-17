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
            console.log('NiveliGjuhesor u mor me sukses:', niveli); // Log the full response
            return niveli;
        } else {
            const errorMessage = await response.text();
            console.error(`Dështoi të merret NiveliGjuhesor me ID ${id}. Status: ${response.status}, Message: ${errorMessage}`);
        }
    } catch (error) {
        console.error(`Gabim gjatë marrjes së NivelitGjuhesor: ${error}`);
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
            console.log(`NiveliGjuhesor me ID ${id} u përditësua me sukses.`);
        } else {
            const errorMessage = await response.text();
            console.error(`Dështoi të përditësohet NiveliGjuhesor me ID ${id}. Status: ${response.status}, Message: ${errorMessage}`);
        }
    } catch (error) {
        console.error(`Gabim gjatë përditësimit të NivelitGjuhesor: ${error}`);
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
            console.error('Gabim gjatë marrjes së detajeve të NivelitGjuhesor  :', error);
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
                console.error('Gabim gjatë përditësimit të NivelitGjuhesor:', error);
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
