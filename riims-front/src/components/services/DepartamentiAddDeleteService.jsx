import React, { useState, useCallback } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Function to delete Departamenti by ID with token
async function deleteDepartamentiById(id, token) {
    try {
        const response = await fetch(`https://localhost:7254/api/Departamenti/delete-departamenti/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            console.log(`Departamenti me ID ${id} fshihet me sukses.`);
        } else {
            console.error(`Dështoi fshirja e Departamentit me ID ${id}. Status: ${response.status}`);
        }
    } catch (error) {
        console.error(`Gabim gjatë fshirjes së Departamentit: ${error}`);
    }
}

// Function to add Departamenti with token
async function addDepartamenti(departamenti, token) {
    try {
        const response = await fetch('https://localhost:7254/api/Departamenti/add-departamenti', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(departamenti)
        });

        if (response.ok) {
            console.log('Departamenti u shtua me sukses.');
            const newDepartamenti = await response.json(); // Ensure we get the newly added Departamenti
            return newDepartamenti;
        } else {
            console.error(`Dështoi shtimi i Departamentit. Status: ${response.status}`);
        }
    } catch (error) {
        console.error(`Gabim gjatë shtimit të Departamentit: ${error}`);
    }
}

// Hook for delete and add Departamenti modals
export function useManageDepartamenti(setDepartamente, token) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddDepartamentiModal, setShowAddDepartamentiModal] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [newEmri, setNewEmri] = useState('');
    const [newEmriInstitucionit, setNewEmriInstitucionit] = useState('');

    // Delete logic
    const handleDeleteClick = useCallback(async () => {
        if (currentId !== null) {
            try {
                await deleteDepartamentiById(currentId, token);
                setDepartamente(prevDepartamente => prevDepartamente.filter(departamenti => departamenti.id !== currentId));
                setShowDeleteModal(false);
            } catch (error) {
                console.error(`Error handling delete: ${error}`);
            }
        }
    }, [currentId, token, setDepartamente]);

    const confirmDelete = useCallback((id) => {
        setCurrentId(id);
        setShowDeleteModal(true);
    }, []);

    const cancelDelete = useCallback(() => {
        setShowDeleteModal(false);
    }, []);

    // Add logic
    const handleAddDepartamenti = useCallback(async () => {
        if (newEmri.trim() && newEmriInstitucionit.trim()) {
            try {
                const newDepartamentiItem = await addDepartamenti({
                    emri: newEmri,
                    emriInstitucionit: newEmriInstitucionit
                }, token);

                if (newDepartamentiItem) {
                    setDepartamente(prevDepartamente => [newDepartamentiItem, ...prevDepartamente]); // Add new Departamenti to the top
                    setNewEmri(''); // Clear input fields
                    setNewEmriInstitucionit(''); // Clear input fields
                    setShowAddDepartamentiModal(false); // Close modal
                }
            } catch (error) {
                console.error(`Gabim gjatë shtimit të Departamentit: ${error}`);
            }
        }
    }, [newEmri, newEmriInstitucionit, token, setDepartamente]);

    const AddDepartamentiModal = () => (
        <Modal show={showAddDepartamentiModal} onHide={() => setShowAddDepartamentiModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Shto departamentin</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Emri i Departamentit</Form.Label>
                        <Form.Control
                            type="text"
                            value={newEmri}
                            onChange={(e) => setNewEmri(e.target.value)}
                            placeholder="Shkruani emrin e departamentit"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Emri i Institucionit</Form.Label>
                        <Form.Control
                            type="text"
                            value={newEmriInstitucionit}
                            onChange={(e) => setNewEmriInstitucionit(e.target.value)}
                            placeholder="Shkruani emrin e institucionit"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowAddDepartamentiModal(false)}>
                    Mbyll
                </Button>
                <Button variant="primary" onClick={handleAddDepartamenti}>
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
                <p>A jeni i sigurt që dëshironi ta fshini këtë departament?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={cancelDelete}>Mbyll</Button>
                <Button variant="danger" onClick={handleDeleteClick}>Fshij</Button>
            </Modal.Footer>
        </Modal>
    );

    return {
        confirmDelete,
        AddDepartamentiModal,
        DeleteConfirmationModal,
        setShowAddDepartamentiModal
    };
}