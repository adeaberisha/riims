import React, { useState } from 'react';
import '../../css/CustomModal.css'; 

function AddInstitucioniModal({ show, onClose, onSave, token }) {
    const [institucioni, setInstitucioni] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (institucioni.trim() === '') {
            setError('Institucioni name cannot be empty.');
            return;
        }
        setIsLoading(true);
        setError('');
        try {
            const response = await fetch('https://localhost:7254/api/Institucioni/add-Institucionin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ Emri: institucioni }) 
            });

            if (!response.ok) {
                throw new Error(`Failed to add Institucioni. Status: ${response.status}`);
            }

            const newInstitucioni = await response.json();
            onSave(newInstitucioni);
            onClose();
        } catch (error) {
            setError('Error adding the Institucioni. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`custom-modal ${show ? 'show' : ''}`}>
            <div className="custom-modal-content">
                <div className="custom-modal-header">
                    <h5>Shto institucion</h5>
                    <button className="close-button" onClick={() => {
                        onClose();
                        setInstitucioni('');
                        setError('');
                    }}>&times;</button>
                </div>
                <div className="custom-modal-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="institucioni">Institucioni</label>
                            <input
                                id="institucioni"
                                type="text"
                                value={institucioni}
                                onChange={(e) => setInstitucioni(e.target.value)}
                                placeholder="Enter Institucioni name"
                                className={`form-control ${error ? 'is-invalid' : ''}`}
                            />
                            {error && <div className="invalid-feedback">{error}</div>}
                        </div>
                        <div className="custom-modal-footer">
                            <button type="button" onClick={() => {
                                onClose();
                                setInstitucioni('');
                                setError('');
                            }} disabled={isLoading} className="btn btn-secondary">
                                Close
                            </button>
                            <button type="submit" disabled={isLoading} className="btn btn-primary">
                                {isLoading ? <span className="spinner-border spinner-border-sm" /> : 'Save'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddInstitucioniModal;
