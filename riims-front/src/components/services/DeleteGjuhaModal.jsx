import React, { useState } from 'react';
import '../../css/CustomModal.css';

function DeleteGjuhaModal({ show, onClose, onDelete, token, gjuhe }) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleDelete = async () => {
        if (!gjuhe) {
            return; // Exit if no language data
        }

        setIsLoading(true);
        setError('');
        try {
            const response = await fetch(`https://localhost:7254/api/Gjuhet/delete-gjuha-by-id/${gjuhe.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to delete language. Status: ${response.status}`);
            }

            onDelete(gjuhe.id); 
            onClose();
        } catch (error) {
            setError('Error deleting the language. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`custom-modal ${show ? 'show' : ''}`}>
            <div className="custom-modal-content">
                <div className="custom-modal-header">
                    <h5>Konfirmo Fshirjen</h5>
                    <button 
                        className="close-button" 
                        onClick={() => {
                            onClose();
                            setError(''); 
                        }}
                    >
                        &times;
                    </button>
                </div>
                <div className="custom-modal-body">
                    <p>A je i sigurt qe deshiron ta fshish "{gjuhe?.emriGjuhes}"?</p>
                    {error && <div className="alert alert-danger">{error}</div>}
                </div>
                <div className="custom-modal-footer">
                    <button 
                        type="button" 
                        onClick={() => onClose()} 
                        disabled={isLoading} 
                        className="btn btn-secondary"
                    >
                        Close
                    </button>
                    <button 
                        type="button" 
                        onClick={handleDelete} 
                        disabled={isLoading} 
                        className="btn btn-danger"
                    >
                        {isLoading ? <span className="spinner-border spinner-border-sm" /> : 'Confirm Delete'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteGjuhaModal;
