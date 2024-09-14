import React, { useState, useCallback } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Function to delete NiveliGjuhesor by ID with token
async function deleteNiveliGjuhesorById(id, token) {
    try {
        const response = await fetch(`https://localhost:7254/api/NiveliGjuhesor/delete-NivelinGjuhesore-by-id/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            console.log(`NiveliGjuhesor with ID ${id} deleted successfully.`);
        } else {
            console.error(`Failed to delete NiveliGjuhesor with ID ${id}. Status: ${response.status}`);
        }
    } catch (error) {
        console.error(`Error deleting NiveliGjuhesor: ${error}`);
    }
}

// Function to add NiveliGjuhesor with token
async function addNiveliGjuhesor(niveli, token) {
    try {
        const response = await fetch('https://localhost:7254/api/NiveliGjuhesor/add-NivelinGjuhesore', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(niveli)
        });

        if (response.ok) {
            console.log('NiveliGjuhesor added successfully.');
            const newNiveli = await response.json(); // Ensure we get the newly added NiveliGjuhesor
            return newNiveli;
        } else {
            console.error(`Failed to add NiveliGjuhesor. Status: ${response.status}`);
        }
    } catch (error) {
        console.error(`Error adding NiveliGjuhesor: ${error}`);
    }
}

// Hook for delete and add NiveliGjuhesor modals
export function useManageNiveliGjuhesor(setNiveliGjuhesore, token) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddNiveliModal, setShowAddNiveliModal] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [newNiveli, setNewNiveli] = useState('');

    // Delete logic
    const handleDeleteClick = useCallback(async () => {
        if (currentId !== null) {
            try {
                await deleteNiveliGjuhesorById(currentId, token);
                setNiveliGjuhesore(prevNiveli => prevNiveli.filter(niveli => niveli.id !== currentId));
                setShowDeleteModal(false);
            } catch (error) {
                console.error(`Error handling delete: ${error}`);
            }
        }
    }, [currentId, token, setNiveliGjuhesore]);

    const confirmDelete = useCallback((id) => {
        setCurrentId(id);
        setShowDeleteModal(true);
    }, []);

    const cancelDelete = useCallback(() => {
        setShowDeleteModal(false);
    }, []);

    // Add logic
    const handleAddNiveli = useCallback(async () => {
        if (newNiveli.trim()) {
            try {
                const newNiveliItem = await addNiveliGjuhesor({ niveli: newNiveli }, token); // Ensure we get the new NiveliGjuhesor
                if (newNiveliItem) {
                    setNiveliGjuhesore(prevNiveli => [newNiveliItem, ...prevNiveli]); // Add new NiveliGjuhesor to the top
                    setNewNiveli(''); // Clear input field
                    setShowAddNiveliModal(false); // Close modal
                }
            } catch (error) {
                console.error(`Error adding NiveliGjuhesor: ${error}`);
            }
        }
    }, [newNiveli, token, setNiveliGjuhesore]);

    const AddNiveliModal = () => (
        <Modal show={showAddNiveliModal} onHide={() => setShowAddNiveliModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Shto nivelin gjuhësor</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Niveli</Form.Label>
                        <Form.Control
                            type="text"
                            value={newNiveli}
                            onChange={(e) => setNewNiveli(e.target.value)}
                            placeholder="Shkruani nivelin gjuhësor"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowAddNiveliModal(false)}>
                    Mbyll
                </Button>
                <Button variant="primary" onClick={handleAddNiveli}>
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
                <p>Dëshironi ta fshini këtë nivel gjuhësor?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={cancelDelete}>Mbyll</Button>
                <Button variant="danger" onClick={handleDeleteClick}>Fshij</Button>
            </Modal.Footer>
        </Modal>
    );

    return {
        confirmDelete,
        AddNiveliModal,
        DeleteConfirmationModal,
        setShowAddNiveliModal
    };
}
