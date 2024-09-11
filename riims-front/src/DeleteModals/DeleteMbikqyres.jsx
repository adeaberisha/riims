import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Function to delete MbikqyresITemave by ID
async function deleteMbikqyresById(id) {
    const token = localStorage.getItem("jwtToken"); // Retrieve the JWT token from local storage

    if (!token) {
        console.error('No authentication token found.');
        return;
    }

    try {
        const response = await fetch(`https://localhost:7254/api/MbikqyresITemave/delete-mbikqyres-by-id/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`, // Include the token in the request headers
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            console.log(`MbikqyresITemave with ID ${id} deleted successfully.`);
        } else {
            console.error(`Failed to delete MbikqyresITemave with ID ${id}. Status: ${response.status}`);
        }
    } catch (error) {
        console.error(`Error deleting MbikqyresITemave: ${error}`);
    }
}


// Function to handle delete
export function useDeleteMbikqyres(setMbikqyresITemave) {
    const [showMbikqyresDeleteModal, setShowMbikqyresDeleteModal] = useState(false);
    const [currentMbikqyresId, setCurrentMbikqyresId] = useState(null);

    const handleMbikqyresDelete = async () => {
        if (currentMbikqyresId !== null) {
            try {
                await deleteMbikqyresById(currentMbikqyresId);
                setMbikqyresITemave(prevMbikqyresITemave => prevMbikqyresITemave.filter(mbikqyres => mbikqyres.id !== currentMbikqyresId));
                setShowMbikqyresDeleteModal(false);
            } catch (error) {
                console.error(`Error handling delete: ${error}`);
            }
        }
    };

    const triggerMbikqyresDelete = (id) => {
        setCurrentMbikqyresId(id);
        setShowMbikqyresDeleteModal(true);
    };

    const closeMbikqyresDeleteModal = () => {
        setShowMbikqyresDeleteModal(false);
    };

    const MbikqyresDeleteModal = () => (
        <div className={`modal fade ${showMbikqyresDeleteModal ? 'show' : ''}`} style={{ display: showMbikqyresDeleteModal ? 'block' : 'none' }} tabIndex="-1" role="dialog" aria-labelledby="confirmDeleteMbikqyresLabel" aria-hidden={!showMbikqyresDeleteModal}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="confirmDeleteMbikqyresLabel">Confirm Deletion</h5>
                        <button type="button" className="btn-close" onClick={closeMbikqyresDeleteModal} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>Are you sure you want to delete this supervisor?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={closeMbikqyresDeleteModal}>Cancel</button>
                        <button type="button" className="btn btn-danger" onClick={handleMbikqyresDelete}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );

    return {
        triggerMbikqyresDelete,
        MbikqyresDeleteModal
    };
}
