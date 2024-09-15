import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import EditSidebar from '../components/EditSidebar.jsx'; // Ensure you have this component or adjust import

function EditGjuhet() {
  const { id } = useParams(); // Extract the ID from URL parameters
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    EmriGjuhes: '',
    NiveliGjuhesor: ''
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
          value: gjuha.id,
          label: gjuha.emriGjuhes
        }));
        setGjuhet(options);
      } catch (error) {
        console.error('Error gjatë marrjes së gjuhëve:', error);
        setErrorMessage('Deshtoi marrja e gjuhëve!');
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
          value: niveli.id,
          label: niveli.niveli
        }));
        setNiveli(options);
      } catch (error) {
        console.error('Error gjatë marrjës se niveleve gjuhësore:', error);
        setErrorMessage('Dështoi marrja e niveleve gjuhësore!');
      }
    };
    fetchNivelet();
  }, []);

  // Fetch the current language details on mount
  useEffect(() => {
    const fetchUserGjuhet = async () => {
      try {
        const response = await axios.get(`https://localhost:7254/api/UserGjuhet/get-userGjuhet-by-id/${id}`);
        setFormData({
          EmriGjuhes: response.data.emriGjuhes,
          NiveliGjuhesor: response.data.niveliGjuhesor
        });
      } catch (error) {
        console.error('Gabim gjatë marrjes së gjuhëve.', error);
        setErrorMessage('Dështoi marrja e gjuhës.');
      }
    };
    fetchUserGjuhet();
  }, [id]);

  // Handle language selection change
  const handleSelectChange = (selectedOption) => {
    setFormData({
      ...formData,
      EmriGjuhes: selectedOption ? selectedOption.label : ''
    });
  };

  // Handle language level selection change
  const handleSelectChangeNiveli = (selectedOption) => {
    setFormData({
      ...formData,
      NiveliGjuhesor: selectedOption ? selectedOption.label : ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      setErrorMessage('Ju lutem logohuni përsëri.');
      return;
    }

    try {
      const data = {
        EmriGjuhes: formData.EmriGjuhes,
        NiveliGjuhesor: formData.NiveliGjuhesor
      };

      const response = await axios.put(
        `https://localhost:7254/api/UserGjuhet/update-userGjuhet-by-id/${id}`,
        data,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 200) {
        setSuccessMessage('Gjuha u ndryshua me sukses!');
        setFormData({
          EmriGjuhes: '',
          NiveliGjuhesor: ''
        });
      } else {
      setErrorMessage('Diçka shkoi keq. Ju lutem provoni përsëri.');
  }
    } catch (error) {
      console.error('Error gjatë ndryshimit të gjuhës', error);
      if (error.response) {
        setErrorMessage(`Error: ${error.response.data}`);
      } else if (error.request) {
        setErrorMessage('Ju lutem provoni perseri.');
      } else {
        setErrorMessage('Error:  Nuk mund të përfundojë kërkesa.');
      }
    }
  };

  const handleReset = () => {
    setFormData({
      EmriGjuhes: '',
      NiveliGjuhesor: ''
    });
  };

  return (
    <div className="container-fluid h-100 bg-light">
      <div className="row h-100">
        {/* Sidebar */}
        <div className="col-md-2 p-0">
          <EditSidebar />
        </div>

        {/* Main Content */}
        <div className="col-md-10 d-flex justify-content-center py-5">
          <div className="col-12 col-md-10 col-lg-8 col-xl-6">
            <h4 className="text-center text-muted fst-italic mb-4">Perditso gjuhën tuaj</h4>

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
              <div className="row">
                <div className="form-group mb-3">
                  <div className="form-group">
                    <label htmlFor="EmriGjuhes" className='form-label fw-bold'>Emri i gjuhës*</label>
                    <Select
                      options={gjuhet}
                      value={gjuhet.find(option => option.label === formData.EmriGjuhes) || null}  // Select the right option based on ID
                      onChange={handleSelectChange}
                      placeholder="Zgjedhni një gjuhë"
                      required
                    />
                  </div>
                </div>
                <div className="form-group mb-3">
                  <div className="form-group">
                    <label htmlFor="Niveli" className='form-label fw-bold'>Niveli gjuhësor</label>
                    <Select
                      options={niveli}
                      value={niveli.find(option => option.label === formData.NiveliGjuhesor) || null}  // Select the right option based on ID
                      onChange={handleSelectChangeNiveli}
                      placeholder="Zgjedhni një nivel"
                      required
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <button type="button" className="btn btn-secondary" onClick={handleReset} style={{ width: 'calc(50% - 0.7rem)' }}>Anulo</button>
                  <button type="submit" className="btn btn-primary" style={{ width: 'calc(50% - 0.7rem)' }}>Ruaj</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditGjuhet;
