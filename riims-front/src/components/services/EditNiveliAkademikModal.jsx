import React, { useState, useEffect } from 'react';
import '../../css/CustomModal.css';

function EditNiveliAkademikModal({ show, onClose, onSave, token, level }) {
    const [initialValue, setInitialValue] = useState('');
    const [niveli, setNiveli] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (level) {
            setInitialValue(level.lvl); 
            setNiveli(level.lvl); 
        }
    }, [level]);

    useEffect(() => {
        if (!show) {
            setNiveli(initialValue); 
            setError('');
        }
    }, [show, initialValue]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (niveli.trim() === '') {
            setError('Academic level cannot be empty.');
            return;
        }
        setIsLoading(true);
        setError('');
        try {
            const response = await fetch(`https://localhost:7254/api/NiveliAkademik/update-niveliAkademik-by-id/${level.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ lvl: niveli })
            });

            if (!response.ok) {
                throw new Error(`Failed to update academic level. Status: ${response.status}`);
            }

            const updatedLevel = await response.json();
            onSave(updatedLevel);
            onClose();
        } catch (error) {
            setError('Error updating the academic level. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`custom-modal ${show ? 'show' : ''}`}>
            <div className="custom-modal-content">
                <div className="custom-modal-header">
                    <h5>Edit Academic Level</h5>
                    <button className="close-button" onClick={() => {
                        onClose();
                        setNiveli(initialValue);
                    }}>&times;</button>
                </div>
                <div className="custom-modal-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="niveli">Academic Level</label>
                            <input
                                id="niveli"
                                type="text"
                                value={niveli}
                                onChange={(e) => setNiveli(e.target.value)}
                                placeholder="Enter academic level"
                                className={`form-control ${error ? 'is-invalid' : ''}`}
                            />
                            {error && <div className="invalid-feedback">{error}</div>}
                        </div>
                        <div className="custom-modal-footer">
                            <button type="button" onClick={() => {
                                onClose();
                                setNiveli(initialValue);
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

export default EditNiveliAkademikModal;
