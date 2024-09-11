import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditLicensa() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Emri: '',
    EmriInstitucionit: '',
    DataLeshimit: '',
    DataSkadimit: '',
    CredentialId: '',
    CredentialUrl: ''
  });
  const [institucionet, setInstitucionet] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchInstitucionet = async () => {
      try {
        const response = await axios.get('https://localhost:7254/api/Institucioni/get-all-Institucionet');
        const options = response.data.map(institucion => ({
          value: institucion.id,
          label: institucion.emri
        }));
        setInstitucionet(options);
      } catch (error) {
        console.error('Error fetching institutions:', error);
        setErrorMessage('Failed to fetch institutions.');
      }
    };

    const fetchLicensa = async () => {
      try {
        const response = await axios.get(`https://localhost:7254/api/Licensat/get-licensa-by-id/${id}`);
        setFormData({
          Emri: response.data.Emri,
          EmriInstitucionit: response.data.EmriInstitucionit,
          DataLeshimit: response.data.DataLeshimit,
          DataSkadimit: response.data.DataSkadimit,
          CredentialId: response.data.CredentialId,
          CredentialUrl: response.data.CredentialUrl
        });
      } catch (error) {
        console.error('Error fetching licensa:', error);
        setErrorMessage('Failed to fetch licensa details.');
      }
    };

    fetchInstitucionet();
    fetchLicensa();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      setErrorMessage('Token not found. Please log in again.');
      return;
    }

    try {
      const data = {
        Emri: formData.Emri,
        EmriInstitucionit: formData.EmriInstitucionit,
        DataLeshimit: formData.DataLeshimit,
        DataSkadimit: formData.DataSkadimit || null,
        CredentialId: formData.CredentialId || null,
        CredentialUrl: formData.CredentialUrl || null
      };

      const response = await axios.put(
        `https://localhost:7254/api/Licensat/update-licensa-by-id/${id}`,
        data,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 200) {
        setSuccessMessage('Licensa updated successfully!');
        navigate('/licensat');
      } else {
        setErrorMessage('Something went wrong. Please try again.');
      }

    } catch (error) {
      console.error('Error updating licensa:', error);
      if (error.response) {
        setErrorMessage(`Error: ${error.response.data}`);
      } else if (error.request) {
        setErrorMessage('No response from the server. Please try again.');
      } else {
        setErrorMessage('Error: Could not complete the request.');
      }
    }
  };

  const handleReset = () => {
    setFormData({
      Emri: '',
      EmriInstitucionit: '',
      DataLeshimit: '',
      DataSkadimit: '',
      CredentialId: '',
      CredentialUrl: ''
    });
  };

  return (
    <div className="container-fluid bg-light mb-4">
      <div className="row justify-content-center py-4">
        <div className="col-md-10 col-lg-8">
          <h4 className="text-center text-muted fst-italic mb-4">Edit Licensën</h4>
          
          {errorMessage && (
            <div className="alert alert-danger text-center mb-3" role="alert">
              {errorMessage}
            </div>
          )}
          
          {successMessage && (
            <div className="alert alert-success text-center mb-3" role="alert">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-4 border rounded shadow bg-white">
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="Emri" className="form-label fw-bold">Emri*</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="Emri" 
                  name="Emri" 
                  value={formData.Emri} 
                  onChange={handleChange} 
                  required 
                  placeholder="Shkruani emrin e licensës"
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="EmriInstitucionit" className="form-label fw-bold">Emri i institucionit*</label>
                <input
                  type="text"
                  className="form-control"
                  id="EmriInstitucionit"
                  name="EmriInstitucionit"
                  value={formData.EmriInstitucionit}
                  onChange={handleChange}
                  required
                  placeholder="Shkruani emrin e institucionit"
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="DataLeshimit" className="form-label fw-bold">Data e lëshimit*</label>
                <input 
                  type="date" 
                  className="form-control" 
                  id="DataLeshimit" 
                  name="DataLeshimit" 
                  value={formData.DataLeshimit} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="DataSkadimit" className="form-label fw-bold">Data e skadimit</label>
                <input 
                  type="date" 
                  className="form-control" 
                  id="DataSkadimit" 
                  name="DataSkadimit" 
                  value={formData.DataSkadimit} 
                  onChange={handleChange} 
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="CredentialId" className="form-label fw-bold">Credential ID</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="CredentialId" 
                  name="CredentialId" 
                  value={formData.CredentialId} 
                  onChange={handleChange} 
                  placeholder="Opsionale"
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="CredentialUrl" className="form-label fw-bold">Credential URL</label>
                <input 
                  type="url" 
                  className="form-control" 
                  id="CredentialUrl" 
                  name="CredentialUrl" 
                  value={formData.CredentialUrl} 
                  onChange={handleChange} 
                  placeholder="Opsionale"
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-12 d-flex justify-content-between">
                <button type="button" className="btn btn-secondary" onClick={handleReset} style={{ width: 'calc(50% - 0.7rem)' }}>Anulo</button>
                <button type="submit" className="btn btn-primary" style={{ width: 'calc(50% - 0.7rem)' }}>Ruaj</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditLicensa;
