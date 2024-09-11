import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import EditSidebar from '../components/EditSidebar.jsx';

function EditEksperienca() {
  const { id } = useParams(); // Extract the ID from URL parameters
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Titulli: '',
    LlojiPunesimit: '',
    Lokacioni: '',
    LlojiLokacionit: '',
    DataFillimit: '',
    DataMbarimit: '',
    Pershkrimi: '',
    EmriInstitucionit: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchEksperienca = async () => {
      try {
        const response = await axios.get(`https://localhost:7254/api/Eksperienca/get-eksperienca-by-id/${id}`);
        const formatDate = (isoDate) => {
          if (!isoDate) return '';
          const date = new Date(isoDate);
          return date.toISOString().split('T')[0]; // YYYY-MM-DD
        };
        setFormData({
          Titulli: response.data.titulli,
          LlojiPunesimit: response.data.llojiPunesimit,
          Lokacioni: response.data.lokacioni,
          LlojiLokacionit: response.data.llojiLokacionit,
          DataFillimit: formatDate(response.data.dataFillimit),
          DataMbarimit: formatDate(response.data.dataMbarimit) || '',
          Pershkrimi: response.data.pershkrimi || '',
          EmriInstitucionit: response.data.emriInstitucionit
        });
      } catch (error) {
        console.error('Error fetching eksperienca:', error);
        setErrorMessage('Failed to fetch eksperienca details.');
      }
    };

    fetchEksperienca();
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
      setErrorMessage('Ju lutem logohuni përsëri.');
      return;
    }

    try {
      const data = {
        Titulli: formData.Titulli,
        LlojiPunesimit: formData.LlojiPunesimit,
        Lokacioni: formData.Lokacioni,
        LlojiLokacionit: formData.LlojiLokacionit,
        DataFillimit: formData.DataFillimit,
        DataMbarimit: formData.DataMbarimit || null,
        Pershkrimi: formData.Pershkrimi || null,
        EmriInstitucionit: formData.EmriInstitucionit
      };

      const response = await axios.put(
        `https://localhost:7254/api/Eksperienca/update-eksperienca-by-id/${id}`,
        data,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 200) {
        setSuccessMessage('Eksperienca u ndryshua me sukses!');
        navigate('/home');
      } else {
        setErrorMessage('Diçka shkoi keq. Ju lutem provoni përsëri.');
      }
    } catch (error) {
      console.error('Gabim gjate ndryshimit te eksperiences:', error);
      if (error.response) {
        setErrorMessage(`Error: ${error.response.data}`);
      } else if (error.request) {
        setErrorMessage('Ju lutem provoni perseri!');
      } else {
        setErrorMessage('Gabim!');
      }
    }
  };

  const handleReset = () => {
    setFormData({
      Titulli: '',
      LlojiPunesimit: '',
      Lokacioni: '',
      LlojiLokacionit: '',
      DataFillimit: '',
      DataMbarimit: '',
      Pershkrimi: '',
      EmriInstitucionit: ''
    });
  };

  return (
    <div className="container-fluid bg-light mb-4">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 p-0">
          <EditSidebar />
        </div>

        {/* Form */}
        <div className="col-md-9">
          <div className="row justify-content-center py-4">
            <div className="col-md-8 col-lg-6">
              <h4 className="text-center text-muted fst-italic mb-4">Edit Eksperiencën</h4>

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
                    <label htmlFor="Titulli" className="form-label fw-bold">Titulli*</label>
                    <input
                      type="text"
                      className="form-control"
                      id="Titulli"
                      name="Titulli"
                      value={formData.Titulli}
                      onChange={handleChange}
                      required
                      placeholder="Shkruani titullin e eksperiencës"
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="LlojiPunesimit" className="form-label fw-bold">Lloji i punësimit*</label>
                    <input
                      type="text"
                      className="form-control"
                      id="LlojiPunesimit"
                      name="LlojiPunesimit"
                      value={formData.LlojiPunesimit}
                      onChange={handleChange}
                      required
                      placeholder="Shkruani llojin e punësimit"
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="Lokacioni" className="form-label fw-bold">Lokacioni*</label>
                    <input
                      type="text"
                      className="form-control"
                      id="Lokacioni"
                      name="Lokacioni"
                      value={formData.Lokacioni}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="LlojiLokacionit" className="form-label fw-bold">Lloji i lokacionit*</label>
                    <input
                      type="text"
                      className="form-control"
                      id="LlojiLokacionit"
                      name="LlojiLokacionit"
                      value={formData.LlojiLokacionit}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="DataFillimit" className="form-label fw-bold">Data e fillimit*</label>
                    <input
                      type="date"
                      className="form-control"
                      id="DataFillimit"
                      name="DataFillimit"
                      value={formData.DataFillimit}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="DataMbarimit" className="form-label fw-bold">Data e mbarimit</label>
                    <input
                      type="date"
                      className="form-control"
                      id="DataMbarimit"
                      name="DataMbarimit"
                      value={formData.DataMbarimit}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-12">
                    <label htmlFor="Pershkrimi" className="form-label fw-bold">Përshkrimi</label>
                    <textarea
                      className="form-control"
                      id="Pershkrimi"
                      name="Pershkrimi"
                      value={formData.Pershkrimi}
                      onChange={handleChange}
                      rows="3"
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-12">
                    <label htmlFor="EmriInstitucionit" className="form-label fw-bold">Emri i institucionit*</label>
                    <input
                      type="text"
                      className="form-control"
                      id="EmriInstitucionit"
                      name="EmriInstitucionit"
                      value={formData.EmriInstitucionit}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-between">
                <button type="button" className="btn btn-secondary" onClick={handleReset} style={{ width: 'calc(50% - 0.7rem)' }}>Anulo</button>
                <button type="submit" className="btn btn-primary" style={{ width: 'calc(50% - 0.7rem)' }}>Ruaj Ndryshimet</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditEksperienca;
