import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import EditSidebar from '../components/EditSidebar.jsx';

function EditProjekti() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emriProjektit: '',
    startDate: '',
    endDate: '',
    collaborators: '',
    description: '',
    asocohet: '',
    EmriInstitucionit: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchProjekti = async () => {
      try {
        const response = await axios.get(`https://localhost:7254/api/Projekti/get-projekti-by-id/${id}`);
        setFormData({
          emriProjektit: response.data.emriProjektit,
          startDate: response.data.startDate ? response.data.startDate.split('T')[0] : '',
          endDate: response.data.endDate ? response.data.endDate.split('T')[0] : '',
          collaborators: response.data.collaborators || '',
          description: response.data.description || '',
          asocohet: response.data.asocohet,
          EmriInstitucionit: response.data.emriInstitucionit
        });
      } catch (error) {
        console.error('Error gjatë marrjes së projektit:', error);
        setErrorMessage('Dështoi marrja e projektit.');
      }
    };

    fetchProjekti();
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
        emriProjektit: formData.emriProjektit,
        startDate: formData.startDate,
        endDate: formData.endDate || null,
        collaborators: formData.collaborators || null,
        description: formData.description,
        asocohet: formData.asocohet,
        EmriInstitucionit: formData.EmriInstitucionit
      };

      const response = await axios.put(
        `https://localhost:7254/api/Projekti/update-projekti-by-id/${id}`,
        data,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 200) {
        setSuccessMessage('Projekti u ndryshua me sukses!');
          setFormData({
            emriProjektit: '',
            startDate: '',
            endDate: '',
            collaborators: '',
            description: '',
            asocohet: '',
            EmriInstitucionit: ''
          });
      } else {
      setErrorMessage('Diçka shkoi keq. Ju lutem provoni përsëri.');
  }
    } catch (error) {
      console.error('Error gjatë ndryshimit të Projektit:', error);
      if (error.response) {
        setErrorMessage(`Error: ${error.response.data}`);
      } else if (error.request) {
        setErrorMessage('Ju lutem provoni përsëri.');
      } else {
        setErrorMessage('Error: Nuk mund të përfundojë kërkesa.');
      }
    }
  };

  const handleReset = () => {
    setFormData({
      emriProjektit: '',
      startDate: '',
      endDate: '',
      collaborators: '',
      description: '',
      asocohet: '',
      EmriInstitucionit: ''
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
        <div className="col-md-10 d-flex flex-column align-items-center py-5">
          <div className="col-12 col-md-10 col-lg-8 col-xl-6">
            <h4 className="text-center text-muted fst-italic mb-4">Perditso Projektin tuaj</h4>

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

            <form onSubmit={handleSubmit} className="p-3 border rounded shadow bg-white">
              <div className="row">
                <div className="col-md-12 mb-3">
                  <div className="form-group">
                    <label htmlFor="emriProjektit" className='form-label fw-bold'>Emri i Projektit*</label>
                    <input
                      type="text"
                      className="form-control"
                      id="emriProjektit"
                      name="emriProjektit"
                      value={formData.emriProjektit}
                      onChange={handleChange}
                      required
                      placeholder="Shkruani emrin e projektit"
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label htmlFor="startDate" className='form-label fw-bold'>Data e Fillimit*</label>
                    <input
                      type="date"
                      className="form-control"
                      id="startDate"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label htmlFor="endDate" className='form-label fw-bold'>Data e Mbarimit</label>
                    <input
                      type="date"
                      className="form-control"
                      id="endDate"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label htmlFor="collaborators" className='form-label fw-bold'>Bashkëpunëtorët</label>
                    <input
                      type="text"
                      className="form-control"
                      id="collaborators"
                      name="collaborators"
                      value={formData.collaborators}
                      onChange={handleChange}
                      placeholder="Shkruani bashkëpunëtorët"
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label htmlFor="description" className='form-label fw-bold'>Përshkrimi*</label>
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      placeholder="Shkruani përshkrimin"
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label htmlFor="asocohet" className='form-label fw-bold'>Asocohet*</label>
                    <input
                      type="text"
                      className="form-control"
                      id="asocohet"
                      name="asocohet"
                      value={formData.asocohet}
                      onChange={handleChange}
                      required
                      placeholder="Shkruani asocimin"
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label htmlFor="EmriInstitucionit" className='form-label fw-bold'>Emri i Institucionit*</label>
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
              </div>
              <div className="d-flex justify-content-between mb-2">
                <button type="button" className="btn btn-secondary" style={{ width: 'calc(50% - 0.7rem)' }} onClick={handleReset}>Anulo</button>
                <button type="submit" className="btn btn-primary" style={{ width: 'calc(50% - 0.7rem)' }}>Ruaj</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProjekti;
