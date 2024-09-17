import React, { useState, useEffect } from 'react';
import '../../css/CustomModal.css';

function EditNiveliGjuhesorModal({ show, onClose, onSave, token, niveli }) {
    const [initialValue, setInitialValue] = useState('');
    const [niveliValue, setNiveliValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (niveli) {
            setInitialValue(niveli.niveli); 
            setNiveliValue(niveli.niveli); 
        }
    }, [niveli]);

    useEffect(() => {
        if (!show) {
            setNiveliValue(initialValue); 
            setError('');
        }
    }, [show, initialValue]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (niveliValue.trim() === '') {
            setError('Language level cannot be empty.');
            return;
        }
        setIsLoading(true);
        setError('');
        try {
            const response = await fetch(`https://localhost:7254/api/NiveliGjuhesor/update-NivelinGjuhesore-by-id/${niveli.id}`, { 
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ niveli: niveliValue })
            });

            if (!response.ok) {
                throw new Error(`Failed to update language level. Status: ${response.status}`);
            }

            const updatedNiveli = await response.json();
            onSave(updatedNiveli);
            onClose();
        } catch (error) {
            setError('Error updating the language level. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`custom-modal ${show ? 'show' : ''}`}>
            <div className="custom-modal-content">
                <div className="custom-modal-header">
                    <h5>Update Language Level</h5>
                    <button 
                        className="close-button" 
                        onClick={() => {
                            onClose();
                            setNiveliValue(initialValue);
                        }}
                    >
                        &times;
                    </button>
                </div>
                <div className="custom-modal-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="niveli">Language Level</label>
                            <input
                                id="niveli"
                                type="text"
                                value={niveliValue}
                                onChange={(e) => setNiveliValue(e.target.value)}
                                placeholder="Enter language level"
                                className={`form-control ${error ? 'is-invalid' : ''}`}
                            />
                            {error && <div className="invalid-feedback">{error}</div>}
                        </div>
                        <div className="custom-modal-footer">
                            <button 
                                type="button" 
                                onClick={() => {
                                    onClose();
                                    setNiveliValue(initialValue); 
                                }} 
                                disabled={isLoading} 
                                className="btn btn-secondary"
                            >
                                Close
                            </button>
                            <button 
                                type="submit" 
                                disabled={isLoading} 
                                className="btn btn-primary"
                            >
                                {isLoading ? <span className="spinner-border spinner-border-sm" /> : 'Save'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditNiveliGjuhesorModal;
