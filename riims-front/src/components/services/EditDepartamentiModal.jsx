import React, { useState, useEffect } from 'react';
import '../../css/CustomModal.css';

function EditDepartamentModal({ show, onClose, onSave, token, departament, institutions }) {
    const [initialEmri, setInitialEmri] = useState('');
    const [initialEmriInstitucionit, setInitialEmriInstitucionit] = useState('');
    const [emri, setEmri] = useState('');
    const [emriInstitucionit, setEmriInstitucionit] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Initialize state with the department's current data
    useEffect(() => {
        if (departament) {
            setInitialEmri(departament.emri);
            setInitialEmriInstitucionit(departament.emriInstitucionit); // Assuming `emriInstitucionit` is the name of the institution
            setEmri(departament.emri);
            setEmriInstitucionit(departament.emriInstitucionit);
        }
    }, [departament]);

    // Reset fields when modal is closed
    useEffect(() => {
        if (!show) {
            setEmri(initialEmri);
            setEmriInstitucionit(initialEmriInstitucionit);
            setError('');
        }
    }, [show, initialEmri, initialEmriInstitucionit]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (emri.trim() === '' || !emriInstitucionit) {
            setError('All fields are required.');
            return;
        }
        setIsLoading(true);
        setError('');
        try {
            // Prepare the updated department data
            const updatedDepartamenti = {
                emri,
                emriInstitucionit // Correctly use `emriInstitucionit` here
            };

            // Update the department in the backend
            const response = await fetch(`https://localhost:7254/api/Departamenti/update-departamenti/${departament.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updatedDepartamenti)
            });

            if (!response.ok) {
                throw new Error(`Failed to update department. Status: ${response.status}`);
            }

            const updatedDepartament = await response.json();
            onSave(updatedDepartament); // Notify parent component of the update
            onClose(); // Close the modal
        } catch (error) {
            setError('Error updating the department. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`custom-modal ${show ? 'show' : ''}`}>
            <div className="custom-modal-content">
                <div className="custom-modal-header">
                    <h5>Edit Department</h5>
                    <button className="close-button" onClick={() => {
                        onClose();
                        setEmri(initialEmri);
                        setEmriInstitucionit(initialEmriInstitucionit);
                    }}>&times;</button>
                </div>
                <div className="custom-modal-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="emri">Department Name</label>
                            <input
                                id="emri"
                                type="text"
                                value={emri}
                                onChange={(e) => setEmri(e.target.value)}
                                placeholder="Enter department name"
                                className={`form-control ${error ? 'is-invalid' : ''}`}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="institucioni">Institution</label>
                            <select
                                id="institucioni"
                                value={emriInstitucionit}
                                onChange={(e) => setEmriInstitucionit(e.target.value)}
                                className={`form-control ${error ? 'is-invalid' : ''}`}
                            >
                                <option value="">Select institution</option>
                                {institutions.map(institution => (
                                    <option key={institution.id} value={institution.emri}>
                                        {institution.emri}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {error && <div className="invalid-feedback">{error}</div>}
                        <div className="custom-modal-footer">
                            <button type="button" onClick={() => {
                                onClose();
                                setEmri(initialEmri);
                                setEmriInstitucionit(initialEmriInstitucionit);
                            }} disabled={isLoading} className="btn btn-secondary">
                                Close
                            </button>
                            <button type="submit" disabled={isLoading} className="btn btn-primary">
                                {isLoading ? <span className="spinner-border spinner-border-sm" /> : 'Save'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditDepartamentModal;
