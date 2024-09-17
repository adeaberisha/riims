import React, { useState, useCallback } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Function to delete Gjuha by ID with token
async function deleteGjuhaById(id, token) {
    try {
        const response = await fetch(`https://localhost:7254/api/Gjuhet/delete-gjuha-by-id/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            console.log(`Gjuha me ID ${id} fshihet me sukses.`);
        } else {
            console.error(`Dështoi fshirja e Gjuhes me ID ${id}. Status: ${response.status}`);
        }
    } catch (error) {
        console.error(`Gabim gjatë fshirjes së Gjuhës: ${error}`);
    }
}

// Function to add Gjuha with token
async function addGjuha(gjuha, token) {
    try {
        const response = await fetch('https://localhost:7254/api/Gjuhet/add-gjuha', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(gjuha)
        });

        if (response.ok) {
            console.log('Gjuha u shtua me sukses.');
            const newGjuha = await response.json(); // Ensure we get the newly added Gjuha
            return newGjuha;
        } else {
            console.error(`Dështoi shtimi i Gjuhes. Status: ${response.status}`);
        }
    } catch (error) {
        console.error(`Gabim gjatë shtimit të Gjuhes: ${error}`);
    }
}

// Hook for delete and add Gjuha modals
export function useManageGjuha(setGjuhet, token) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddLanguageModal, setShowAddLanguageModal] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [newLanguage, setNewLanguage] = useState('');

    // Delete logic
    const handleDeleteClick = useCallback(async () => {
        if (currentId !== null) {
            try {
                await deleteGjuhaById(currentId, token);
                setGjuhet(prevGjuhet => prevGjuhet.filter(gjuha => gjuha.id !== currentId));
                setShowDeleteModal(false);
            } catch (error) {
                console.error(`Error handling delete: ${error}`);
            }
        }
    }, [currentId, token, setGjuhet]);

    const confirmDelete = useCallback((id) => {
        setCurrentId(id);
        setShowDeleteModal(true);
    }, []);

    const cancelDelete = useCallback(() => {
        setShowDeleteModal(false);
    }, []);

    // Add logic
    const handleAddLanguage = useCallback(async () => {
        if (newLanguage.trim()) {
            try {
                const newGjuha = await addGjuha({ emriGjuhes: newLanguage }, token); // Ensure we get the new Gjuha
                if (newGjuha) {
                    setGjuhet(prevGjuhet => [newGjuha, ...prevGjuhet]); // Add new Gjuha to the top
                    setNewLanguage(''); // Clear input field
                    setShowAddLanguageModal(false); // Close modal
                }
            } catch (error) {
                console.error(`Gabim gjatë shtimit të Gjuhes: ${error}`);
            }
        }
    }, [newLanguage, token, setGjuhet]);

    const AddLanguageModal = () => (
        <Modal show={showAddLanguageModal} onHide={() => setShowAddLanguageModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Shto gjuhën</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Gjuha</Form.Label>
                        <Form.Control
                            type="text"
                            value={newLanguage}
                            onChange={(e) => setNewLanguage(e.target.value)}
                            placeholder="Shkruani gjuhën"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowAddLanguageModal(false)}>
                    Mbyll
                </Button>
                <Button variant="primary" onClick={handleAddLanguage}>
                    Ruaj
                </Button>
            </Modal.Footer>
        </Modal>
    );

    const DeleteConfirmationModal = () => (
        <Modal show={showDeleteModal} onHide={cancelDelete}>
            <Modal.Header closeButton>
                <Modal.Title>Konfirmo Fshirjen</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Dëshironi ta fshini këtë gjuhë?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={cancelDelete}>Mbyll</Button>
                <Button variant="danger" onClick={handleDeleteClick}>Fshij</Button>
            </Modal.Footer>
        </Modal>
    );

    return {
        confirmDelete,
        AddLanguageModal,
        DeleteConfirmationModal,
        setShowAddLanguageModal
    };
}
