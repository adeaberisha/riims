import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import EditSidebar from '../components/EditSidebar.jsx';

function EditLicensa() {
  const { id } = useParams(); 
  const [formData, setFormData] = useState({
    Emri: '',
    EmriInstitucionit: '',
    DataLeshimit: '',
    DataSkadimit: '',
    CredentialId: '',
    CredentialUrl: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchLicensa = async () => {
      try {
        const response = await axios.get(`https://localhost:7254/api/Licensat/get-licensa-by-id/${id}`);
        const formatDate = (isoDate) => {
          if (!isoDate) return '';
          const date = new Date(isoDate);
          return date.toISOString().split('T')[0]; 
        };
        setFormData({
          Emri: response.data.emri,
          EmriInstitucionit: response.data.emriInstitucionit,
          DataLeshimit: formatDate(response.data.dataLeshimit),
          DataSkadimit: formatDate(response.data.dataSkadimit) || '',
          CredentialId: response.data.credentialId || '',
          CredentialUrl: response.data.credentialUrl || ''
        });
      } catch (error) {
        console.error('Error gjatë marrjes së licensës:', error);
        setErrorMessage('Dështoi marrja e licensës.');
      }
    };

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
      setErrorMessage('Ju lutemi logohuni përsëri.');
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
        setSuccessMessage('Licensa u ndryshua me sukses!');
      } else {
        setErrorMessage('Diçka shkoi keq. Ju lutem provoni përsëri.');
      }
    } catch (error) {
      console.error('Error gjatë ndryshimit të licensës:', error);
      if (error.response) {
        setErrorMessage(`Error: ${error.response.data}`);
      } else if (error.request) {
        setErrorMessage('Ju lutem provoni perseri!');
      } else {
        setErrorMessage('Error: Nuk mund të përfundojë kërkesa.');
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

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(""), 6000);
      return () => clearTimeout(timer);
    }
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 6000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage, successMessage]);

  return (
    <div className="container-fluid h-100 bg-light d-flex flex-column">
      <div className="row flex-grow-1 d-flex justify-content-center align-items-start">
        <div className="col-md-3">
          <EditSidebar />
        </div>
        <div className="col-md-9 d-flex justify-content-center align-items-start py-4">
          <div className="row justify-content-center w-100">
            <div className="col-12 col-md-11 col-lg-9 col-xl-7" style={{ marginTop: '2rem', marginLeft: '1rem' }}>
              <h4 className="text-center text-muted fst-italic mb-4">Përditësoni licensën tuaj</h4>
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
                <div className="row">
                  <div className="col-md-12 mb-3">
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
                  <div className="col-md-12 mb-3">
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
      </div>
    </div>
  );
}

export default EditLicensa;
