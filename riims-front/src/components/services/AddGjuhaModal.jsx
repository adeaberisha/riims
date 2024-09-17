import React, { useState, useEffect } from 'react';
import '../../css/CustomModal.css';

function AddGjuhetModal({ show, onClose, onSave, token }) {
    const [gjuhe, setGjuhe] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!show) {
            setGjuhe('');
            setError('');
        }
    }, [show]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (gjuhe.trim() === '') {
            setError('Language cannot be empty.');
            return;
        }
        setIsLoading(true);
        setError('');
        try {
            const response = await fetch('https://localhost:7254/api/Gjuhet/add-gjuha', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ emriGjuhes: gjuhe })
            });
            if (!response.ok) {
                throw new Error(`Failed to add language. Status: ${response.status}`);
            }
            const newGjuhe = await response.json();
            onSave(newGjuhe);
            onClose();
        } catch (error) {
            setError('Error adding the language. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`custom-modal ${show ? 'show' : ''}`}>
            <div className="custom-modal-content">
                <div className="custom-modal-header">
                    <h5>Shto gjuhë</h5>
                    <button className="close-button" onClick={() => {
                        onClose();
                        setGjuhe('');
                        setError('');
                    }}>&times;</button>
                </div>
                <div className="custom-modal-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="gjuhe">Gjuha</label>
                            <input
                                id="gjuhe"
                                type="text"
                                value={gjuhe}
                                onChange={(e) => setGjuhe(e.target.value)}
                                placeholder="Enter language"
                                className={`form-control ${error ? 'is-invalid' : ''}`}
                            />
                            {error && <div className="invalid-feedback">{error}</div>} 
                        </div>
                        <div className="custom-modal-footer">
                            <button type="button" onClick={() => {
                                onClose(); 
                                setGjuhe('');
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

export default AddGjuhetModal;
