import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function EditInstitucioniModal({ show, onClose, onSave, token, institution }) {
    const [initialValue, setInitialValue] = useState('');
    const [emri, setEmri] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (institution) {
            setInitialValue(institution.emri);
            setEmri(institution.emri);
        }
    }, [institution]);

    useEffect(() => {
        if (!show) {
            setEmri(initialValue);
            setError('');
        }
    }, [show, initialValue]);

    const handleSubmit = useCallback(async (event) => {
        event.preventDefault();
        if (emri.trim() === '') {
            setError('Institution name cannot be empty.');
            return;
        }
        setIsLoading(true);
        setError('');
        try {
            const response = await fetch(
                `https://localhost:7254/api/Institucioni/update-Institucionin-by-id/${institution.id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({ emri }),
                }
            );

            if (!response.ok) {
                throw new Error(`Failed to update institution. Status: ${response.status}`);
            }

            const updatedInstitution = await response.json();
            onSave(updatedInstitution);
            onClose();
        } catch (error) {
            setError('Error updating institution. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, [emri, institution, token, onSave, onClose]);

    return (
        <Modal show={show} onHide={() => {
            onClose();
            setEmri(initialValue);
        }}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Institution</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Institution</Form.Label>
                        <Form.Control
                            type="text"
                            value={emri}
                            onChange={(e) => setEmri(e.target.value)}
                            placeholder="Enter institution name"
                            isInvalid={!!error}
                        />
                        {error && <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>}
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => {
                    onClose();
                    setEmri(initialValue);
                }} disabled={isLoading}>
                    Close
                </Button>
                <Button variant="primary" type="submit" onClick={handleSubmit} disabled={isLoading}>
                    {isLoading ? <span className="spinner-border spinner-border-sm" /> : 'Save'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditInstitucioniModal;
