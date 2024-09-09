import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

function Licensat() {
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
    fetchInstitucionet();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (selectedOption) => {
    setFormData({
      ...formData,
      EmriInstitucionit: selectedOption ? selectedOption.value : ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset error message before submission
    setSuccessMessage(''); // Reset success message before submission
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

      const response = await axios.post(
        'https://localhost:7254/api/Licensat/add-licensa',
        data,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 201) {
        setSuccessMessage('Licensa added successfully!');
        setFormData({
          Emri: '',
          EmriInstitucionit: '',
          DataLeshimit: '',
          DataSkadimit: '',
          CredentialId: '',
          CredentialUrl: ''
        });
      } else {
        setErrorMessage('Something went wrong. Please try again.');
      }

    } catch (error) {
      console.error('Error adding licensa:', error);
      if (error.response) {
        setErrorMessage(`Error: ${error.response.data}`);
      } else if (error.request) {
        setErrorMessage('No response from the server. Please try again.');
      } else {
        setErrorMessage('Error: Could not complete the request.');
      }
    }
  };

  return (
    <div className="container-fluid h-100 bg-light">
      <div className="row h-100">
        <div className="col d-flex justify-content-center align-items-center mb-5 mt-4">
          <div className="col-md-6 col-lg-5 col-xl-4">
            <h4 className="text-center text-muted fst-italic m-3">Shtoni licensat tuaja</h4>
            
            {errorMessage && (
              <div className="alert alert-danger text-center" role="alert">
                {errorMessage}
              </div>
            )}
            
            {successMessage && (
              <div className="alert alert-success text-center" role="alert">
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="border p-4 shadow-lg rounded bg-white">
              <div className="form-group mb-3">
                <label htmlFor="Emri" className="form-label fw-bold">Emri*</label>
                <input 
                  type="text" 
                  className="form-control form-control-lg" 
                  id="Emri" 
                  name="Emri" 
                  value={formData.Emri} 
                  onChange={handleChange} 
                  required 
                  placeholder="Shkruani emrin e licensës"
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="EmriInstitucionit" className="form-label fw-bold">Emri i institucionit*</label>
                <Select
                  options={institucionet}
                  value={institucionet.find(option => option.value === formData.EmriInstitucionit)}
                  onChange={handleSelectChange}
                  placeholder="Zgjedhni një institucion"
                  required
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="DataLeshimit" className="form-label fw-bold">Data e lëshimit*</label>
                <input 
                  type="date" 
                  className="form-control form-control-lg" 
                  id="DataLeshimit" 
                  name="DataLeshimit" 
                  value={formData.DataLeshimit} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="DataSkadimit" className="form-label fw-bold">Data e skadimit</label>
                <input 
                  type="date" 
                  className="form-control form-control-lg" 
                  id="DataSkadimit" 
                  name="DataSkadimit" 
                  value={formData.DataSkadimit} 
                  onChange={handleChange} 
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="CredentialId" className="form-label fw-bold">Credential ID</label>
                <input 
                  type="text" 
                  className="form-control form-control-lg" 
                  id="CredentialId" 
                  name="CredentialId" 
                  value={formData.CredentialId} 
                  onChange={handleChange} 
                  placeholder="Opsionale"
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="CredentialUrl" className="form-label fw-bold">Credential URL</label>
                <input 
                  type="url" 
                  className="form-control form-control-lg" 
                  id="CredentialUrl" 
                  name="CredentialUrl" 
                  value={formData.CredentialUrl} 
                  onChange={handleChange} 
                  placeholder="Opsionale"
                />
              </div>

              <button type="submit" className="btn btn-primary w-100 py-2">Ruaj</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Licensat;
