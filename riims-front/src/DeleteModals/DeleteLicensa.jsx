import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/DeleteModals.css';

// Function to delete Licensa by ID
async function deleteLicensaById(id) {
    try {
        const response = await fetch(`https://localhost:7254/api/Licensat/delete-licensa-by-id/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            console.log(`Licensa with ID ${id} deleted successfully.`);
        } else {
            console.error(`Failed to delete Licensa with ID ${id}. Status: ${response.status}`);
        }
    } catch (error) {
        console.error(`Error deleting Licensa: ${error}`);
    }
}

// Function to handle delete
export function useDeleteLicensa(setLicensat) {
    const [showLicensaDeleteModal, setShowLicensaDeleteModal] = useState(false);
    const [currentLicensaId, setCurrentLicensaId] = useState(null);

    const handleLicensaDelete = async () => {
        if (currentLicensaId !== null) {
            try {
                await deleteLicensaById(currentLicensaId);
                setLicensat(prevLicensat => prevLicensat.filter(licensa => licensa.id !== currentLicensaId));
                setShowLicensaDeleteModal(false);
            } catch (error) {
                console.error(`Error handling delete: ${error}`);
            }
        }
    };

    const triggerLicensaDelete = (id) => {
        setCurrentLicensaId(id);
        setShowLicensaDeleteModal(true);
    };

    const closeLicensaDeleteModal = () => {
        setShowLicensaDeleteModal(false);
    };

    const LicensaDeleteModal = () => (
        <div className={`modal fade ${showLicensaDeleteModal ? 'show' : ''}`} style={{ display: showLicensaDeleteModal ? 'block' : 'none' }} tabIndex="-1" role="dialog" aria-labelledby="confirmDeleteLicensaLabel" aria-hidden={!showLicensaDeleteModal}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="confirmDeleteLicensaLabel">Konfirmoni Fshirjen</h5>
                        <button type="button" className="btn-close" onClick={closeLicensaDeleteModal} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>Dëshironi ta fshini këtë licensë?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn modal-button modal-button-cancel" onClick={closeLicensaDeleteModal}>Cancel</button>
                        <button type="button" className="btn modal-button modal-button-delete" onClick={handleLicensaDelete}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );

    return {
        triggerLicensaDelete,
        LicensaDeleteModal
    };
}
