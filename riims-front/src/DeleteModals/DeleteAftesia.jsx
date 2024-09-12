import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/DeleteModals.css';

// Function to delete Aftesia by ID
async function deleteAftesiaById(id) {
    try {
        const response = await fetch(`https://localhost:7254/api/Aftesite/delete-aftesia-by-id/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            console.log(`Aftesia with ID ${id} deleted successfully.`);
        } else {
            console.error(`Failed to delete Aftesia with ID ${id}. Status: ${response.status}`);
        }
    } catch (error) {
        console.error(`Error deleting Aftesia: ${error}`);
    }
}

// Function to handle delete
export function useDeleteAftesia(setAftesite) {
    const [showModal, setShowModal] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    const handleDeleteClick = async () => {
        if (currentId !== null) {
            try {
                await deleteAftesiaById(currentId);
                setAftesite(prevAftesite => prevAftesite.filter(aftesia => aftesia.id !== currentId));
                setShowModal(false);
            } catch (error) {
                console.error(`Error handling delete: ${error}`);
            }
        }
    };

    const confirmDelete = (id) => {
        setCurrentId(id);
        setShowModal(true);
    };

    const cancelDelete = () => {
        setShowModal(false);
    };

    const DeleteConfirmationModal = () => (
        <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" role="dialog" aria-labelledby="confirmDeleteLabel" aria-hidden={!showModal}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="confirmDeleteLabel">Konfirmoni Fshirjen</h5>
                        <button type="button" className="btn-close" onClick={cancelDelete} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>Dëshironi të fshini këtë aftësi?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn modal-button modal-button-cancel" onClick={cancelDelete}>Cancel</button>
                        <button type="button" className="btn modal-button modal-button-delete" onClick={handleDeleteClick}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );

    return {
        confirmDelete,
        DeleteConfirmationModal
    };
}

