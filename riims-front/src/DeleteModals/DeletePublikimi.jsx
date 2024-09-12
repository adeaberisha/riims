import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/DeleteModals.css';

// Function to delete Publikimi by ID
async function deletePublikimiById(id) {
    try {
        const response = await fetch(`https://localhost:7254/api/Publikimi/delete-publikimi-by-id/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            console.log(`Publikimi with ID ${id} deleted successfully.`);
        } else {
            console.error(`Failed to delete Publikimi with ID ${id}. Status: ${response.status}`);
        }
    } catch (error) {
        console.error(`Error deleting Publikimi: ${error}`);
    }
}

// Function to handle delete
export function useDeletePublikimi(setPublikimet) {
    const [showPublikimiDeleteModal, setShowPublikimiDeleteModal] = useState(false);
    const [currentPublikimiId, setCurrentPublikimiId] = useState(null);

    const handlePublikimiDelete = async () => {
        if (currentPublikimiId !== null) {
            try {
                await deletePublikimiById(currentPublikimiId);
                setPublikimet(prevPublikimet => prevPublikimet.filter(publikimi => publikimi.id !== currentPublikimiId));
                setShowPublikimiDeleteModal(false);
            } catch (error) {
                console.error(`Error handling delete: ${error}`);
            }
        }
    };

    const triggerPublikimiDelete = (id) => {
        setCurrentPublikimiId(id);
        setShowPublikimiDeleteModal(true);
    };

    const closePublikimiDeleteModal = () => {
        setShowPublikimiDeleteModal(false);
    };

    const PublikimiDeleteModal = () => (
        <div className={`modal fade ${showPublikimiDeleteModal ? 'show' : ''}`} style={{ display: showPublikimiDeleteModal ? 'block' : 'none' }} tabIndex="-1" role="dialog" aria-labelledby="confirmDeletePublikimiLabel" aria-hidden={!showPublikimiDeleteModal}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="confirmDeletePublikimiLabel">Konfirmoni Fshirjen</h5>
                        <button type="button" className="btn-close" onClick={closePublikimiDeleteModal} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>Dëshironi ta fshini këtë publikim?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn modal-button modal-button-cancel" onClick={closePublikimiDeleteModal}>Cancel</button>
                        <button type="button" className="btn modal-button modal-button-delete" onClick={handlePublikimiDelete}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );

    return {
        triggerPublikimiDelete,
        PublikimiDeleteModal
    };
}
