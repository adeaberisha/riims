import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Function to delete UserGjuhet by ID
async function deleteUserGjuhetById(id) {
    try {
        const response = await fetch(`https://localhost:7254/api/UserGjuhet/delete-userGjuhet-by-id/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            console.log(`UserGjuhet with ID ${id} deleted successfully.`);
        } else {
            console.error(`Failed to delete UserGjuhet with ID ${id}. Status: ${response.status}`);
        }
    } catch (error) {
        console.error(`Error deleting UserGjuhet: ${error}`);
    }
}

// Function to handle delete
export function useDeleteUserGjuhet(setUserGjuhet) {
    const [showUserGjuhetConfirmModal, setShowUserGjuhetConfirmModal] = useState(false);
    const [currentUserGjuhetId, setCurrentUserGjuhetId] = useState(null);

    const handleUserGjuhetDelete = async () => {
        if (currentUserGjuhetId !== null) {
            try {
                await deleteUserGjuhetById(currentUserGjuhetId);
                setUserGjuhet(prevUserGjuhet => prevUserGjuhet.filter(userGjuha => userGjuha.id !== currentUserGjuhetId));
                setShowUserGjuhetConfirmModal(false);
            } catch (error) {
                console.error(`Error handling delete: ${error}`);
            }
        }
    };

    const triggerUserGjuhetDelete = (id) => {
        setCurrentUserGjuhetId(id);
        setShowUserGjuhetConfirmModal(true);
    };

    const closeUserGjuhetConfirmModal = () => {
        setShowUserGjuhetConfirmModal(false);
    };

    const UserGjuhetConfirmDeleteModal = () => (
        <div className={`modal fade ${showUserGjuhetConfirmModal ? 'show' : ''}`} style={{ display: showUserGjuhetConfirmModal ? 'block' : 'none' }} tabIndex="-1" role="dialog" aria-labelledby="confirmDeleteUserGjuhetLabel" aria-hidden={!showUserGjuhetConfirmModal}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="confirmDeleteUserGjuhetLabel">Confirm Deletion</h5>
                        <button type="button" className="btn-close" onClick={closeUserGjuhetConfirmModal} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>Are you sure you want to delete this language?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={closeUserGjuhetConfirmModal}>Cancel</button>
                        <button type="button" className="btn btn-danger" onClick={handleUserGjuhetDelete}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );

    return {
        triggerUserGjuhetDelete,
        UserGjuhetConfirmDeleteModal
    };
}
