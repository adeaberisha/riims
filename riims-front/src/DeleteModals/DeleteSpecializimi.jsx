import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Function to delete Specializim by ID
async function deleteSpecializimById(id) {
    try {
        const response = await fetch(`https://localhost:7254/api/Specializimet/delete-specializim-by-id/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            console.log(`Specializim with ID ${id} deleted successfully.`);
        } else {
            console.error(`Failed to delete Specializim with ID ${id}. Status: ${response.status}`);
        }
    } catch (error) {
        console.error(`Error deleting Specializim: ${error}`);
    }
}

// Function to handle delete
export function useDeleteSpecializim(setSpecializime) {
    const [showSpecializimDeleteModal, setShowSpecializimDeleteModal] = useState(false);
    const [currentSpecializimId, setCurrentSpecializimId] = useState(null);

    const handleSpecializimDelete = async () => {
        if (currentSpecializimId !== null) {
            try {
                await deleteSpecializimById(currentSpecializimId);
                setSpecializime(prevSpecializime => prevSpecializime.filter(specializim => specializim.id !== currentSpecializimId));
                setShowSpecializimDeleteModal(false);
            } catch (error) {
                console.error(`Error handling delete: ${error}`);
            }
        }
    };

    const triggerSpecializimDelete = (id) => {
        setCurrentSpecializimId(id);
        setShowSpecializimDeleteModal(true);
    };

    const closeSpecializimDeleteModal = () => {
        setShowSpecializimDeleteModal(false);
    };

    const SpecializimDeleteModal = () => (
        <div className={`modal fade ${showSpecializimDeleteModal ? 'show' : ''}`} style={{ display: showSpecializimDeleteModal ? 'block' : 'none' }} tabIndex="-1" role="dialog" aria-labelledby="confirmDeleteSpecializimLabel" aria-hidden={!showSpecializimDeleteModal}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="confirmDeleteSpecializimLabel">Confirm Deletion</h5>
                        <button type="button" className="btn-close" onClick={closeSpecializimDeleteModal} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>Are you sure you want to delete this specialization?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={closeSpecializimDeleteModal}>Cancel</button>
                        <button type="button" className="btn btn-danger" onClick={handleSpecializimDelete}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );

    return {
        triggerSpecializimDelete,
        SpecializimDeleteModal
    };
}
