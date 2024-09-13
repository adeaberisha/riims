import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import EditSidebar from '../components/EditSidebar.jsx';

function EditHonorsAndAwards() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    titulli: '',
    issuer: '',
    EmriInstitucionit: '',
    dataLeshimit: '',
    pershkrimi: ''
  });


  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
  
    const fetchHonorsAndAwards = async () => {
      try {
        const response = await axios.get(`https://localhost:7254/api/HonorsAndAwards/get-honor-by-id/${id}`);
        setFormData({
          titulli: response.data.titulli,
          issuer: response.data.issuer,
          EmriInstitucionit: response.data.emriInstitucionit,
          dataLeshimit: response.data.dataEleshimit ? response.data.dataEleshimit.split('T')[0] : '',
          pershkrimi: response.data.pershkrimi
        });
      } catch (error) {
        console.error('Error fetching honors and awards:', error);
        setErrorMessage('Dështoi marrja e nderimeve dhe çmimeve.');
      }
    };
  
    fetchHonorsAndAwards();
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
    const token = localStorage.getItem('jwtToken');

    if (!token) {
      setErrorMessage('Ju lutem logohuni përsëri.');
      return;
    }

    try {
      const data = {
        titulli: formData.titulli,
        issuer: formData.issuer,
        EmriInstitucionit: formData.EmriInstitucionit,
        dataLeshimit: formData.dataLeshimit,
        pershkrimi: formData.pershkrimi
      };

      const response = await axios.put(
        `https://localhost:7254/api/HonorsAndAwards/update-honor-by-id/${id}`,
        data,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 200) {
        setSuccessMessage('Nderimi/çmimi u ndryshua me sukses!');
        setFormData({
          titulli: '',
          issuer: '',
          EmriInstitucionit: '',
          dataLeshimit: '',
          pershkrimi: ''
        });

        // Redirect after 3 seconds (3000 ms)
        setTimeout(() => {
          // Navigate to the home page
          window.location.href = '/home';
        }, 3000); 
      } else {
      setErrorMessage('Diçka shkoi keq. Ju lutem provoni përsëri.');
      }
    } catch (error) {
      console.error('Error gjatë ndryshimit te çmimit:', error);
      if (error.response) {
        setErrorMessage(`Error: ${error.response.data}`);
      } else if (error.request) {
        setErrorMessage('Nuk ka pasur përgjigje nga serveri. Ju lutem provoni përsëri.');
      } else {
        setErrorMessage('Error: Nuk mund të përfundojë kërkesa.');
      }
    }
  };

  const handleReset = () => {
    setFormData({
      titulli: '',
      issuer: '',
      EmriInstitucionit: '',
      dataLeshimit: '',
      pershkrimi: ''
    });
  };


  return (
    <div className="container-fluid h-100 bg-light">
      <div className="row h-100">
        {/* EditSidebar */}
        <div className="col-md-2 p-0">
          <EditSidebar />
        </div>

        {/* Main Content */}
        <div className="col-md-10 d-flex flex-column align-items-center py-5">
          <div className="col-12 col-md-10 col-lg-8 col-xl-6">
            <h4 className="text-center text-muted fst-italic mb-4">Perditeso Nderimet dhe Çmimet tuaja</h4>

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
                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label htmlFor="titulli" className='form-label fw-bold'>Titulli*</label>
                    <input
                      type="text"
                      className="form-control"
                      id="titulli"
                      name="titulli"
                      value={formData.titulli}
                      onChange={handleChange}
                      required
                      placeholder="Shkruani titullin"
                    />
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label htmlFor="issuer" className='form-label fw-bold'>Lëshuesi*</label>
                    <input
                      type="text"
                      className="form-control"
                      id="issuer"
                      name="issuer"
                      value={formData.issuer}
                      onChange={handleChange}
                      placeholder="Lëshuesi"
                      required
                    />
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label htmlFor="EmriInstitucionit" className='form-label fw-bold'>Institucioni*</label>
                    <input
                      type="text"
                      className="form-control"
                      id="EmriInstitucionit"
                      name="EmriInstitucionit"
                      value={formData.EmriInstitucionit}
                      onChange={handleChange}
                      placeholder="Shkruani emrin"
                      required
                    />
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label htmlFor="dataLeshimit" className='form-label fw-bold'>Data e Lëshimit*</label>
                    <input
                      type="date"
                      className="form-control"
                      id="dataLeshimit"
                      name="dataLeshimit"
                      value={formData.dataLeshimit}
                      onChange={handleChange}
                      placeholder="Data e lëshimit"
                      required
                    />
                  </div>
                </div>

                <div className="col-md-12 mb-3">
                  <div className="form-group">
                    <label htmlFor="pershkrimi" className='form-label fw-bold'>Përshkrimi*</label>
                    <textarea
                      id="pershkrimi"
                      name="pershkrimi"
                      className="form-control"
                      rows="2"
                      value={formData.pershkrimi}
                      onChange={handleChange}
                      placeholder="Shkruani përshkrimin"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <button
                  type="button"
                  className="btn btn-secondary"
                  style={{ width: 'calc(50% - 0.7rem)' }}
                  onClick={handleReset}
                >
                  Anulo
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: 'calc(50% - 0.7rem)' }}
                >
                  Ruaj
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditHonorsAndAwards;