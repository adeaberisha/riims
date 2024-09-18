import React, { useState, useEffect } from 'react';
import '../../css/CustomModal.css';

function AddNiveliGjuhesorModal({ show, onClose, onSave, token }) {
    const [niveli, setNiveli] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!show) {
            setNiveli('');
            setError('');
        }
    }, [show]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (niveli.trim() === '') {
            setError('Language level cannot be empty.');
            return;
        }
        setIsLoading(true);
        setError('');
        try {
            const response = await fetch('https://localhost:7254/api/NiveliGjuhesor/add-NivelinGjuhesore', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ niveli }) 
            });
            if (!response.ok) {
                throw new Error(`Failed to add language level. Status: ${response.status}`);
            }
            const newNiveli = await response.json();
            onSave(newNiveli);
            onClose();
        } catch (error) {
            setError('Error adding the language level. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`custom-modal ${show ? 'show' : ''}`}>
            <div className="custom-modal-content">
                <div className="custom-modal-header">
                    <h5>Shto nivel gjuhesor</h5>
                    <button 
                        className="close-button" 
                        onClick={() => {
                            onClose();
                            setNiveli(''); 
                            setError('');
                        }}
                    >
                        &times;
                    </button>
                </div>
                <div className="custom-modal-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="niveli">Niveli Gjuhesor</label>
                            <input
                                id="niveli"
                                type="text"
                                value={niveli}
                                onChange={(e) => setNiveli(e.target.value)}
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
                                    setNiveli('');
                                    setError('');
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

export default AddNiveliGjuhesorModal;
