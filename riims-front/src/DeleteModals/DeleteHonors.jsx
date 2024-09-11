import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Function to delete HonorsAndAwards by ID
async function deleteHonorById(id) {
    try {
        const response = await fetch(`https://localhost:7254/api/HonorsAndAwards/delete-honor-by-id/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            console.log(`Honor with ID ${id} deleted successfully.`);
        } else {
            console.error(`Failed to delete honor with ID ${id}. Status: ${response.status}`);
        }
    } catch (error) {
        console.error(`Error deleting honor: ${error}`);
    }
}

// Function to handle delete
export function useDeleteHonor(setHonors) {
    const [showHonorDeleteModal, setShowHonorDeleteModal] = useState(false);
    const [currentHonorId, setCurrentHonorId] = useState(null);

    const handleHonorDelete = async () => {
        if (currentHonorId !== null) {
            try {
                await deleteHonorById(currentHonorId);
                setHonors(prevHonors => prevHonors.filter(honor => honor.id !== currentHonorId));
                setShowHonorDeleteModal(false);
            } catch (error) {
                console.error(`Error handling delete: ${error}`);
            }
        }
    };

    const triggerHonorDelete = (id) => {
        setCurrentHonorId(id);
        setShowHonorDeleteModal(true);
    };

    const closeHonorDeleteModal = () => {
        setShowHonorDeleteModal(false);
    };

    const HonorDeleteConfirmationModal = () => (
        <div className={`modal fade ${showHonorDeleteModal ? 'show' : ''}`} style={{ display: showHonorDeleteModal ? 'block' : 'none' }} tabIndex="-1" role="dialog" aria-labelledby="confirmDeleteHonorLabel" aria-hidden={!showHonorDeleteModal}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="confirmDeleteHonorLabel">Confirm Deletion</h5>
                        <button type="button" className="btn-close" onClick={closeHonorDeleteModal} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>Are you sure you want to delete this honor or award?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={closeHonorDeleteModal}>Cancel</button>
                        <button type="button" className="btn btn-danger" onClick={handleHonorDelete}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );

    return {
        triggerHonorDelete,
        HonorDeleteConfirmationModal
    };
}
