import React, { useState, useEffect, useCallback } from 'react';
import '../../css/CustomModal.css';

function EditDepartamentModal({ show, onClose, onSave, token, department, institutions }) {
    const [emri, setEmri] = useState('');
    const [emriInstitucionit, setEmriInstitucionit] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (department && show) {
            setEmri(department.emri);
            setEmriInstitucionit(department.emriInstitucionit);
        }
    }, [department, show]);

    useEffect(() => {
        if (!show) {
            setEmri('');
            setEmriInstitucionit('');
            setError('');
        }
    }, [show]);

    const handleSubmit = useCallback(async (event) => {
        event.preventDefault();
        if (emri.trim() === '' || !emriInstitucionit) {
            setError('All fields are required.');
            return;
        }
        setIsLoading(true);
        setError('');
        try {
            const updatedDepartamenti = {
                emri,
                emriInstitucionit
            };

            const response = await fetch(
                `https://localhost:7254/api/Departamenti/update-departamenti/${department.id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(updatedDepartamenti)
                }
            );

            if (!response.ok) {
                throw new Error(`Failed to update department. Status: ${response.status}`);
            }

            const updatedDepartament = await response.json();
            onSave(updatedDepartament);
            onClose();
        } catch (error) {
            setError('Error updating the department. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, [emri, emriInstitucionit, department, token, onSave, onClose]);

    return (
        <div className={`custom-modal ${show ? 'show' : ''}`}>
            <div className="custom-modal-content">
                <div className="custom-modal-header">
                    <h5>Përditëso Departmentin</h5>
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>
                <div className="custom-modal-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="emri">Emri i Departmentit</label>
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
                            <label htmlFor="institucioni">Institucioni</label>
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
                            <button type="button" onClick={onClose} disabled={isLoading} className="btn btn-secondary">
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
