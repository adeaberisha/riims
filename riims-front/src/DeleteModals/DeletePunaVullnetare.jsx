import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Function to delete PunaVullnetare by ID
async function deletePunaVullnetareById(id) {
    try {
        const response = await fetch(`https://localhost:7254/api/PunaVullnetare/delete-puna-vullnetare-by-id/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            console.log(`PunaVullnetare with ID ${id} deleted successfully.`);
        } else {
            console.error(`Failed to delete PunaVullnetare with ID ${id}. Status: ${response.status}`);
        }
    } catch (error) {
        console.error(`Error deleting PunaVullnetare: ${error}`);
    }
}

// Function to handle delete
export function useDeletePunaVullnetare(setPunaVullnetare) {
    const [showPunaVullnetareDeleteModal, setShowPunaVullnetareDeleteModal] = useState(false);
    const [currentPunaVullnetareId, setCurrentPunaVullnetareId] = useState(null);

    const handlePunaVullnetareDelete = async () => {
        if (currentPunaVullnetareId !== null) {
            try {
                await deletePunaVullnetareById(currentPunaVullnetareId);
                setPunaVullnetare(prevPunaVullnetare => prevPunaVullnetare.filter(punaVullnetare => punaVullnetare.id !== currentPunaVullnetareId));
                setShowPunaVullnetareDeleteModal(false);
            } catch (error) {
                console.error(`Error handling delete: ${error}`);
            }
        }
    };

    const triggerPunaVullnetareDelete = (id) => {
        setCurrentPunaVullnetareId(id);
        setShowPunaVullnetareDeleteModal(true);
    };

    const closePunaVullnetareDeleteModal = () => {
        setShowPunaVullnetareDeleteModal(false);
    };

    const PunaVullnetareDeleteModal = () => (
        <div className={`modal fade ${showPunaVullnetareDeleteModal ? 'show' : ''}`} style={{ display: showPunaVullnetareDeleteModal ? 'block' : 'none' }} tabIndex="-1" role="dialog" aria-labelledby="confirmDeletePunaVullnetareLabel" aria-hidden={!showPunaVullnetareDeleteModal}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="confirmDeletePunaVullnetareLabel">Confirm Deletion</h5>
                        <button type="button" className="btn-close" onClick={closePunaVullnetareDeleteModal} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>Are you sure you want to delete this Puna Vullnetare?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={closePunaVullnetareDeleteModal}>Cancel</button>
                        <button type="button" className="btn btn-danger" onClick={handlePunaVullnetareDelete}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );

    return {
        triggerPunaVullnetareDelete,
        PunaVullnetareDeleteModal
    };
}
