import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/DeleteModals.css';

async function deleteEdukimiById(id) {
    const token = localStorage.getItem("jwtToken"); 

    if (!token) {
        console.error('No authentication token found.');
        return;
    }

    try {
        const response = await fetch(`https://localhost:7254/api/Edukimi/delete-edukimi-by-id/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            console.log(`Edukimi me ID ${id} u fshi me sukses.`);
        } else {
            console.error(`Failed to delete Edukimi with ID ${id}. Status: ${response.status}`);
        }
    } catch (error) {
        console.error(`Error deleting Edukimi: ${error}`);
    }
}



export function useDeleteEdukimi(setEdukime) {
    const [showEdukimiDeleteModal, setShowEdukimiDeleteModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const edukimiDelete = async () => {
        if (selectedId !== null) {
            try {
                await deleteEdukimiById(selectedId);
                setEdukime(prevEdukime => prevEdukime.filter(edukimi => edukimi.id !== selectedId));
                setShowEdukimiDeleteModal(false);
            } catch (error) {
                console.error(`Error handling delete: ${error}`);
            }
        }
    };

    const requestDelete = (id) => {
        setSelectedId(id);
        setShowEdukimiDeleteModal(true);
    };

    const closeEdukimiDeleteModal = () => {
        setShowEdukimiDeleteModal(false);
    };

    const EdukimiDeleteModal = () => (
        <div className={`modal fade ${showEdukimiDeleteModal ? 'show' : ''}`} style={{ display: showEdukimiDeleteModal ? 'block' : 'none' }} tabIndex="-1" role="dialog" aria-labelledby="confirmDeleteLabel" aria-hidden={!showEdukimiDeleteModal}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="confirmDeleteLabel">Konfirmoni Fshirjen</h5>
                        <button type="button" className="btn-close" onClick={closeEdukimiDeleteModal} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>Dëshironi të fshini këtë edukim?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn modal-button modal-button-cancel" onClick={closeEdukimiDeleteModal}>Cancel</button>
                        <button type="button" className="btn modal-button modal-button-delete" onClick={edukimiDelete}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );

    return {
        requestDelete,
        EdukimiDeleteModal
    };
}
