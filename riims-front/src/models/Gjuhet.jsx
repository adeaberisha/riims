import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import Sidebar from '../components/Sidebar.jsx'; // Ensure Sidebar is imported

function Gjuhet() {
  const [formData, setFormData] = useState({
    EmriGjuhes: '',
    Niveli: ''
  });
  const [gjuhet, setGjuhet] = useState([]);
  const [niveli, setNiveli] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch languages on mount
  useEffect(() => {
    const fetchGjuhet = async () => {
      try {
        const response = await axios.get('https://localhost:7254/api/Gjuhet');
        const options = response.data.map(gjuha => ({
          value: gjuha.id,  // Sending ID
          label: gjuha.emriGjuhes
        }));
        setGjuhet(options);
      } catch (error) {
        console.error('Error fetching languages:', error);
        setErrorMessage('Failed to fetch languages.');
      }
    };
    fetchGjuhet();
  }, []);

  // Fetch language levels on mount
  useEffect(() => {
    const fetchNivelet = async () => {
      try {
        const response = await axios.get('https://localhost:7254/api/NiveliGjuhesor/get-all-NiveletGjuhesore');
        const options = response.data.map(niveli => ({
          value: niveli.id,  // Sending ID
          label: niveli.niveli
        }));
        setNiveli(options);
      } catch (error) {
        console.error('Error fetching levels:', error);
        setErrorMessage('Failed to fetch language levels.');
      }
    };
    fetchNivelet();
  }, []);

  // Handle language selection change
  const handleSelectChange = (selectedOption) => {
    setFormData({
      ...formData,
      EmriGjuhes: selectedOption ? selectedOption.label : ''  // Setting ID of language
    });
  };

  // Handle language level selection change
  const handleSelectChangeNiveli = (selectedOption) => {
    setFormData({
      ...formData,
      NiveliGjuhesor: selectedOption ? selectedOption.label : ''  // Setting ID of level
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');  // Reset error message
    setSuccessMessage('');  // Reset success message
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      setErrorMessage('Token not found. Please log in again.');
      return;
    }

    try {
      const data = {
        EmriGjuhes: formData.EmriGjuhes,  // Sending language ID
        NiveliGjuhesor: formData.NiveliGjuhesor  // Sending level ID
      };

      console.log('Submitting data:', data);  // Debug: Log the data being sent

      const response = await axios.post(
        'https://localhost:7254/api/UserGjuhet/add-userGjuhet',
        data,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Response:', response.data);  // Debug: Log the response

      // Check for success (201 or 200)
      if (response.status === 201 || response.status === 200) {
        setSuccessMessage('Language added successfully!');
        setFormData({
          EmriGjuhes: '',
          NiveliGjuhesor: ''
        });
      } else {
        setErrorMessage('Something went wrong. Please try again.');
      }

    } catch (error) {
      console.error('Error adding language:', error);
      if (error.response) {
        setErrorMessage('Error adding language.');
      } else if (error.request) {
        setErrorMessage('No response from the server. Please try again.');
      } else {
        setErrorMessage('Error: Could not complete the request.');
      }
    }
  };

  useEffect(() => {
    if (errorMessage) {
        const timer = setTimeout(() => setErrorMessage(''), 6000);
        return () => clearTimeout(timer);
    }
    if (successMessage) {
        const timer = setTimeout(() => setSuccessMessage(''), 6000);
        return () => clearTimeout(timer);
    }
}, [errorMessage, successMessage]);

  return (
    <div className="container-fluid h-100 bg-light">
      <div className="row h-100">
        {/* Sidebar */}
        <div className="col-md-2 p-0">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="col-md-10 d-flex justify-content-center py-5">
          <div className="col-12 col-md-10 col-lg-8 col-xl-6">
            <h4 className="text-center text-muted fst-italic mb-4">Shtoni gjuhën në të cilën jeni i aftë</h4>

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

            <form onSubmit={handleSubmit} className="p-3 border rounded shadow bg-white" style={{ marginTop: '1rem' }}>
              <div className="form-group mb-3">
                <label htmlFor="EmriGjuhes" className='form-label fw-bold'>Emri i gjuhës*</label>
                <Select
                  options={gjuhet}
                  value={gjuhet.find(option => option.value === formData.EmriGjuhes)}  // Select the right option based on ID
                  onChange={handleSelectChange}
                  placeholder="Zgjedhni një gjuhë"
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="Niveli" className='form-label fw-bold'>Niveli gjuhësor</label>
                <Select
                  options={niveli}
                  value={niveli.find(option => option.value === formData.NiveliGjuhesor)}  // Select the right option based on ID
                  onChange={handleSelectChangeNiveli}
                  placeholder="Zgjedhni një nivel"
                  required
                />
              </div>
              <div className="d-flex justify-content-between mb-2">
                <button type="button" className="btn btn-secondary" style={{ width: 'calc(50% - 0.7rem)' }}>Anulo</button>
                <button type="submit" className="btn btn-primary" style={{ width: 'calc(50% - 0.7rem)' }}>Ruaj</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gjuhet;
