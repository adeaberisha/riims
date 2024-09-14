import React, { useState, useCallback } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Function to fetch Gjuha by ID with token
async function fetchGjuhaById(id, token) {
    try {
        const response = await fetch(`https://localhost:7254/api/Gjuhet/get-gjuhet/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const gjuha = await response.json();
            console.log('Fetched Gjuha:', gjuha); // Log the full response
            return gjuha;
        } else {
            const errorMessage = await response.text();
            console.error(`Failed to fetch Gjuha with ID ${id}. Status: ${response.status}, Message: ${errorMessage}`);
        }
    } catch (error) {
        console.error(`Error fetching Gjuha: ${error}`);
    }
}

// Function to update Gjuha by ID with token
async function updateGjuhaById(id, updatedGjuha, token) {
    try {
        const response = await fetch(`https://localhost:7254/api/Gjuhet/update-gjuha-by-id/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updatedGjuha)
        });

        if (response.ok) {
            console.log(`Gjuha with ID ${id} updated successfully.`);
        } else {
            const errorMessage = await response.text();
            console.error(`Failed to update Gjuha with ID ${id}. Status: ${response.status}, Message: ${errorMessage}`);
        }
    } catch (error) {
        console.error(`Error updating Gjuha: ${error}`);
    }
}

// Edit Gjuha Modal Component
export function useEditGjuhaModal(setGjuhet, token) {
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [currentLanguage, setCurrentLanguage] = useState('');

    // Fetch the current Gjuha details when editing
    const fetchGjuha = useCallback(async (id) => {
        try {
            const gjuha = await fetchGjuhaById(id, token);
            if (gjuha) {
                setCurrentLanguage(gjuha.emriGjuhes); // Ensure the field name is correct
            }
        } catch (error) {
            console.error('Error fetching Gjuha details:', error);
        }
    }, [token]);

    // Show the modal and load Gjuha data
    const openEditModal = useCallback((id) => {
        setCurrentId(id);
        fetchGjuha(id);
        setShowEditModal(true);
    }, [fetchGjuha]);

    // Update logic
    const handleUpdateLanguage = useCallback(async () => {
        if (currentLanguage.trim()) {
            try {
                await updateGjuhaById(currentId, { emriGjuhes: currentLanguage }, token);
                setGjuhet(prevGjuhet => prevGjuhet.map(gjuha => gjuha.id === currentId ? { ...gjuha, emriGjuhes: currentLanguage } : gjuha));
                setShowEditModal(false);
            } catch (error) {
                console.error('Error updating language:', error);
            }
        }
    }, [currentLanguage, currentId, token, setGjuhet]);

    const EditLanguageModal = () => (
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Ndrysho Gjuhën</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Gjuha</Form.Label>
                        <Form.Control
                            type="text"
                            value={currentLanguage}
                            onChange={(e) => setCurrentLanguage(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                    Mbyll
                </Button>
                <Button variant="primary" onClick={handleUpdateLanguage}>
                    Ruaj
                </Button>
            </Modal.Footer>
        </Modal>
    );

    return {
        openEditModal,
        EditLanguageModal,
    };
}

