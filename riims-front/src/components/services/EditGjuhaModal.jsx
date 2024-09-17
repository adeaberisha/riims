import React, { useState, useEffect } from 'react';
import '../../css/CustomModal.css';

function EditGjuhaModal({ show, onClose, onSave, token, gjuhe }) {
    const [initialValue, setInitialValue] = useState('');
    const [gjuha, setGjuha] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (gjuhe) {
            setInitialValue(gjuhe.emriGjuhes); 
            setGjuha(gjuhe.emriGjuhes); 
        }
    }, [gjuhe]);

    useEffect(() => {
        if (!show) {
            setGjuha(initialValue); 
            setError('');
        }
    }, [show, initialValue]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (gjuha.trim() === '') {
            setError('Language cannot be empty.');
            return;
        }
        setIsLoading(true);
        setError('');
        try {
            const response = await fetch(`https://localhost:7254/api/Gjuhet/update-gjuha-by-id/${gjuhe.id}`, { 
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ emriGjuhes: gjuha })
            });

            if (!response.ok) {
                throw new Error(`Failed to update language. Status: ${response.status}`);
            }

            const updatedGjuhe = await response.json();
            onSave(updatedGjuhe);
            onClose();
        } catch (error) {
            setError('Error updating the language. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`custom-modal ${show ? 'show' : ''}`}>
            <div className="custom-modal-content">
                <div className="custom-modal-header">
                    <h5>Përditëso gjuhën</h5>
                    <button 
                        className="close-button" 
                        onClick={() => {
                            onClose();
                            setGjuha(gjuhe ? gjuhe.emriGjuhes : '');
                        }}
                    >
                        &times;
                    </button>
                </div>
                <div className="custom-modal-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="gjuha">Gjuha</label>
                            <input
                                id="gjuha"
                                type="text"
                                value={gjuha}
                                onChange={(e) => setGjuha(e.target.value)}
                                placeholder="Enter language"
                                className={`form-control ${error ? 'is-invalid' : ''}`}
                            />
                            {error && <div className="invalid-feedback">{error}</div>}
                        </div>
                        <div className="custom-modal-footer">
                            <button 
                                type="button" 
                                onClick={() => {
                                    onClose();
                                    setGjuha(gjuha ? gjuha.emriGjuhes : ''); 
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

export default EditGjuhaModal;
