import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import EditSidebar from '../components/EditSidebar.jsx'; 


function EditSpecializim() {
  const { id } = useParams(); // Extract the ID from URL parameters
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emriInstitucionit: '',
    llojiIspecializimit: '',
    lokacionit: '',
    aftesiteEfituara: '',
    dataEFillimit: '',
    dataEMbarimit: '',
    nrKredive: '',
    pershkrimi: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchSpecializim = async () => {
      try {
        const response = await axios.get(`https://localhost:7254/api/Specializimet/get-specializim-by-id/${id}`);
        setFormData({
          emriInstitucionit: response.data.emriInstitucionit || '',
          llojiIspecializimit: response.data.llojiIspecializimit || '',
          lokacionit: response.data.lokacionit || '',
          aftesiteEfituara: response.data.aftesiteEfituara || '',
          dataEFillimit: response.data.dataEFillimit ? response.data.dataEFillimit.split('T')[0] : '', // Extracting the date part
          dataEMbarimit: response.data.dataEMbarimit ? response.data.dataEMbarimit.split('T')[0] : '', // Extracting the date part
          nrKredive: response.data.nrKredive || '',
          pershkrimi: response.data.pershkrimi || ''
        });
      } catch (error) {
        console.error('Error gjatë marrjes së specializimit:', error);
        setErrorMessage('Dështoi marrja e specializimit:');
      }
    };

    fetchSpecializim();
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
        emriInstitucionit: formData.emriInstitucionit,
        llojiIspecializimit: formData.llojiIspecializimit,
        lokacionit: formData.lokacionit || null,
        aftesiteEfituara: formData.aftesiteEfituara || null,
        dataEFillimit: formData.dataEFillimit,
        dataEMbarimit: formData.dataEMbarimit || null,
        nrKredive: formData.nrKredive || null,
        pershkrimi: formData.pershkrimi || null
      };

      const response = await axios.put(
        `https://localhost:7254/api/Specializimet/update-specializim-by-id/${id}`,
        data,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 200) {
        setSuccessMessage('Specializimi u ndryshua me sukses!');
        setFormData({
          EmriInstitucionit: '',
          llojiIspecializimit: '',
          lokacionit: '',
          dataEFillimit: '',
          dataEMbarimit: '',
          aftesiteEfituara: '',
          pershkrimi: '',
          nrKredive: ''
      });
    } else {
    setErrorMessage('Diçka shkoi keq. Ju lutem provoni përsëri.');
       }
    } catch (error) {
      console.error('Gabim gjatë ndryshimit te Specializimit:', error);
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
      emriInstitucionit: '',
      llojiIspecializimit: '',
      lokacionit: '',
      aftesiteEfituara: '',
      dataEFillimit: '',
      dataEMbarimit: '',
      nrKredive: '',
      pershkrimi: ''
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
            <h4 className="text-center text-muted fst-italic mb-4">Perditso specializimin tuaj</h4>

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
                {/* First Half of the Form */}
                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label htmlFor="emriInstitucionit" className='form-label fw-bold'>Emri i institucionit*</label>
                    <input
                      type="text"
                      className="form-control"
                      id="emriInstitucionit"
                      name="emriInstitucionit"
                      value={formData.emriInstitucionit}
                      onChange={handleChange}
                      required
                      placeholder="Shkruani emrin e institucionit"
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label htmlFor="llojiIspecializimit" className='form-label fw-bold'>Lloji i specializimit*</label>
                    <input
                      type="text"
                      className="form-control"
                      id="llojiIspecializimit"
                      name="llojiIspecializimit"
                      value={formData.llojiIspecializimit}
                      onChange={handleChange}
                      required
                      placeholder="Shkruani llojin e specializimit"
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label htmlFor="lokacionit" className='form-label fw-bold'>Lokacioni</label>
                    <input
                      type="text"
                      className="form-control"
                      id="lokacionit"
                      name="lokacionit"
                      value={formData.lokacionit}
                      onChange={handleChange}
                      placeholder="Shkruani lokacionin"
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label htmlFor="aftesiteEfituara" className='form-label fw-bold'>Aftësitë e fituara</label>
                    <input
                      type="text"
                      className="form-control"
                      id="aftesiteEfituara"
                      name="aftesiteEfituara"
                      value={formData.aftesiteEfituara}
                      onChange={handleChange}
                      placeholder="Shkruani aftësitë e fituara"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                {/* Second Half of the Form */}
                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label htmlFor="dataEFillimit" className='form-label fw-bold'>Data e fillimit*</label>
                    <input
                      type="date"
                      className="form-control"
                      id="dataEFillimit"
                      name="dataEFillimit"
                      value={formData.dataEFillimit}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label htmlFor="dataEMbarimit" className='form-label fw-bold'>Data e mbarimit</label>
                    <input
                      type="date"
                      className="form-control"
                      id="dataEMbarimit"
                      name="dataEMbarimit"
                      value={formData.dataEMbarimit}
                      onChange={handleChange}
                    />
                  </div>
                </div> <div className="col-md-6 mb-3">
                                    <div className="form-group">
                                        <label htmlFor="nrKredive" className='form-label fw-bold'>Numri i kredive</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="nrKredive"
                                            name="nrKredive"
                                            value={formData.nrKredive}
                                            onChange={handleChange}
                                            placeholder="Shkruani numrin e kredive"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="form-group">
                                        <label htmlFor="pershkrimi" className='form-label fw-bold'>Përshkrimi</label>
                                        <textarea
                                            className="form-control"
                                            id="pershkrimi"
                                            name="pershkrimi"
                                            value={formData.pershkrimi}
                                            onChange={handleChange}
                                            placeholder="Shkruani përshkrimin"
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

export default EditSpecializim;

