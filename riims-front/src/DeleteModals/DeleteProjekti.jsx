import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/DeleteModals.css';

// Function to delete Projekti by ID
async function deleteProjektiById(id) {
    try {
        const response = await fetch(`https://localhost:7254/api/Projekti/delete-projekti-by-id/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            console.log(`Projekti with ID ${id} deleted successfully.`);
        } else {
            console.error(`Failed to delete Projekti with ID ${id}. Status: ${response.status}`);
        }
    } catch (error) {
        console.error(`Error deleting Projekti: ${error}`);
    }
}

// Function to handle delete
export function useDeleteProjekti(setProjektet) {
    const [showProjektiDeleteModal, setShowProjektiDeleteModal] = useState(false);
    const [currentProjektiId, setCurrentProjektiId] = useState(null);

    const handleProjektiDelete = async () => {
        if (currentProjektiId !== null) {
            try {
                await deleteProjektiById(currentProjektiId);
                setProjektet(prevProjektet => prevProjektet.filter(projekti => projekti.id !== currentProjektiId));
                setShowProjektiDeleteModal(false);
            } catch (error) {
                console.error(`Error handling delete: ${error}`);
            }
        }
    };

    const triggerProjektiDelete = (id) => {
        setCurrentProjektiId(id);
        setShowProjektiDeleteModal(true);
    };

    const closeProjektiDeleteModal = () => {
        setShowProjektiDeleteModal(false);
    };

    const ProjektiDeleteModal = () => (
        <div className={`modal fade ${showProjektiDeleteModal ? 'show' : ''}`} style={{ display: showProjektiDeleteModal ? 'block' : 'none' }} tabIndex="-1" role="dialog" aria-labelledby="confirmDeleteProjektiLabel" aria-hidden={!showProjektiDeleteModal}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="confirmDeleteProjektiLabel">Konfirmoni Fshirjen</h5>
                        <button type="button" className="btn-close" onClick={closeProjektiDeleteModal} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>Dëshironi ta fshini këtë projekt?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn modal-button modal-button-cancel" onClick={closeProjektiDeleteModal}>Cancel</button>
                        <button type="button" className="btn modal-button modal-button-delete" onClick={handleProjektiDelete}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );

    return {
        triggerProjektiDelete,
        ProjektiDeleteModal
    };
}
