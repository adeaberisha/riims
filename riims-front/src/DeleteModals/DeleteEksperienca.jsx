import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Function to delete Eksperienca by ID
async function deleteEksperiencaById(id) {
    try {
        const response = await fetch(`https://localhost:7254/api/Eksperienca/delete-eksperienca-by-id/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            console.log(`Eksperienca with ID ${id} deleted successfully.`);
        } else {
            console.error(`Failed to delete Eksperienca with ID ${id}. Status: ${response.status}`);
        }
    } catch (error) {
        console.error(`Error deleting Eksperienca: ${error}`);
    }
}

// Function to handle delete
export function useDeleteEksperienca(setEksperienca) {
    const [showEksperiencaConfirmModal, setShowEksperiencaConfirmModal] = useState(false);
    const [currentEksperiencaId, setCurrentEksperiencaId] = useState(null);

    const handleEksperiencaDelete = async () => {
        if (currentEksperiencaId !== null) {
            try {
                await deleteEksperiencaById(currentEksperiencaId);
                setEksperienca(prevEksperienca => prevEksperienca.filter(eksperienca => eksperienca.id !== currentEksperiencaId));
                setShowEksperiencaConfirmModal(false);
            } catch (error) {
                console.error(`Error handling delete: ${error}`);
            }
        }
    };

    const triggerEksperiencaDelete = (id) => {
        setCurrentEksperiencaId(id);
        setShowEksperiencaConfirmModal(true);
    };

    const closeEksperiencaConfirmModal = () => {
        setShowEksperiencaConfirmModal(false);
    };

    const EksperiencaConfirmDeleteModal = () => (
        <div className={`modal fade ${showEksperiencaConfirmModal ? 'show' : ''}`} style={{ display: showEksperiencaConfirmModal ? 'block' : 'none' }} tabIndex="-1" role="dialog" aria-labelledby="confirmDeleteEksperiencaLabel" aria-hidden={!showEksperiencaConfirmModal}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="confirmDeleteEksperiencaLabel">Confirm Deletion</h5>
                        <button type="button" className="btn-close" onClick={closeEksperiencaConfirmModal} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>Are you sure you want to delete this Eksperienca?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={closeEksperiencaConfirmModal}>Cancel</button>
                        <button type="button" className="btn btn-danger" onClick={handleEksperiencaDelete}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );

    return {
        triggerEksperiencaDelete,
        EksperiencaConfirmDeleteModal
    };
}
