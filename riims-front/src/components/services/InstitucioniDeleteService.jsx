import React, { useState, useCallback } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

// Function to delete Institucioni by ID with token
async function deleteInstitucioniById(id, token) {
    try {
        const response = await fetch(`https://localhost:7254/api/Institucioni/delete-Institucionin-by-id/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });

        if (response.ok) {
            console.log(`Institucioni with ID ${id} deleted successfully.`);
        } else {
            console.error(`Failed to delete Institucioni with ID ${id}. Status: ${response.status}`);
        }
    } catch (error) {
        console.error(`Error deleting Institucioni: ${error}`);
    }
}

// Function to add Institucioni with token
// Function to add Institucioni with token
async function addInstitucioni(institucioni, token) {
    try {
        const response = await fetch('https://localhost:7254/api/Institucioni/add-Institucionin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(institucioni)
        });

        if (response.ok) {
            console.log('Institucioni added successfully.');
            const newInstitucioni = await response.json();
            return newInstitucioni;
        } else {
            console.error(`Failed to add Institucioni. Status: ${response.status}`);
        }
    } catch (error) {
        console.error(`Error adding Institucioni: ${error}`);
    }
}


// Hook for delete and add Institucioni modals
export function useManageInstitucioni(setInstitucionet, token) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddInstitucioniModal, setShowAddInstitucioniModal] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [newInstitucioni, setNewInstitucioni] = useState('');

    // Delete logic
    const handleDeleteClick = useCallback(async () => {
        if (currentId !== null) {
            try {
                await deleteInstitucioniById(currentId, token);
                setInstitucionet(prevInstitucionet => prevInstitucionet.filter(institucioni => institucioni.id !== currentId));
                setShowDeleteModal(false);
            } catch (error) {
                console.error(`Error handling delete: ${error}`);
            }
        }
    }, [currentId, token, setInstitucionet]);

    const confirmDelete = useCallback((id) => {
        setCurrentId(id);
        setShowDeleteModal(true);
    }, []);

    const cancelDelete = useCallback(() => {
        setShowDeleteModal(false);
    }, []);

    // Add logic
    const handleAddInstitucioni = useCallback(async () => {
        if (newInstitucioni.trim()) {
            try {
                const newInstitucioniAdded = await addInstitucioni({ Emri: newInstitucioni }, token); // Updated property name
                if (newInstitucioniAdded) {
                    setInstitucionet(prevInstitucionet => [newInstitucioniAdded, ...prevInstitucionet]);
                    setNewInstitucioni('');
                    setShowAddInstitucioniModal(false);
                }
            } catch (error) {
                console.error(`Error adding Institucioni: ${error}`);
            }
        }
    }, [newInstitucioni, token, setInstitucionet]);
    
    const AddInstitucioniModal = () => (
        <Modal show={showAddInstitucioniModal} onHide={() => setShowAddInstitucioniModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Shto Institucionin</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Institucioni</Form.Label>
                        <Form.Control
                            type="text"
                            value={newInstitucioni}
                            onChange={(e) => setNewInstitucioni(e.target.value)}
                            placeholder="Shkruani emrin e Institucionit"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowAddInstitucioniModal(false)}>
                    Mbyll
                </Button>
                <Button variant="primary" onClick={handleAddInstitucioni}>
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
                <p>Dëshironi ta fshini këtë institucion?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={cancelDelete}>Mbyll</Button>
                <Button variant="danger" onClick={handleDeleteClick}>Fshij</Button>
            </Modal.Footer>
        </Modal>
    );

    return {
        confirmDelete,
        AddInstitucioniModal,
        DeleteConfirmationModal,
        setShowAddInstitucioniModal
    };
}
