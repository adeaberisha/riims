import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

function Edukimi() {
  const [formData, setFormData] = useState({
    FushaStudimit: '',
    Lokacioni: '',
    DataFillimit: '',
    DataMbarimit: '',
    Pershkrimi: '',
    Institucioni: '',
    NiveliAkademik: ''
  });
  const [institucionet, setInstitucionet] = useState([]);
  const [niveletAkademike, setNiveletAkademike] = useState([]);
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
        console.error('Error gjatë marrjes së institucioneve:', error);
        setErrorMessage('Dështoi marrja e institucioneve.');
      }
    };
    fetchInstitucionet();
  }, []);

  useEffect(() => {
    const fetchNiveletAkademike = async () => {
      try {
        const response = await axios.get('https://localhost:7254/api/NiveliAkademik/get-all-NiveletAkademike');
        const options = response.data.map(niveliAkademik => ({
          value: niveliAkademik.id,
          label: niveliAkademik.lvl
        }));
        setNiveletAkademike(options);
      } catch (error) {
        console.error('Error gjatë marrjes së niveleve akademike:', error);
        setErrorMessage('Dështoi marrja e niveleve akademike.');
      }
    };
    fetchNiveletAkademike();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChangeN = (selectedOption) => {
    setFormData({
      ...formData,
      NiveliAkademik: selectedOption ? selectedOption.value : ''
    });
  };

  const handleSelectChangeI = (selectedOption) => {
    setFormData({
      ...formData,
      Institucioni: selectedOption ? selectedOption.value : ''
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
        FushaStudimit: formData.FushaStudimit,
        Lokacioni: formData.Lokacioni,
        DataFillimit: formData.DataFillimit,
        DataMbarimit: formData.DataMbarimit || null,
        Pershkrimi: formData.Pershkrimi || null,
        Institucioni: formData.Institucioni,
        NiveliAkademik: formData.NiveliAkademik
      };

      const response = await axios.post(
        'https://localhost:7254/api/Edukimi/add-edukimi',
        data,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 201) {
        setSuccessMessage('Edukimi u shtua me sukses!');
        setFormData({
          FushaStudimit: '',
          Lokacioni: '',
          DataFillimit: '',
          DataMbarimit: '',
          Pershkrimi: '',
          EmriInstitucionit: '',
          NiveliAkademik: ''
        });
      } else {
        setErrorMessage('Diçka shkoi keq. Ju lutem provoni përsëri.');
      }

    } catch (error) {
      console.error('Error gjatë shtimit të edukimit:', error);
      setErrorMessage('Ju lutem provoni përsëri.');
    }
  };

  return (
    <div className="container-fluid h-100 bg-light">
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-10 col-md-8 col-lg-6 col-xl-4">
          <h4 className="text-center text-muted fst-italic my-3">Shtoni edukimin tuaj</h4>
          
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

          <form onSubmit={handleSubmit} className="p-3 border rounded shadow-sm bg-white">
            <div className="form-group mb-2">
              <label htmlFor="FushaStudimit" className="form-label fw-bold">Fusha e studimit*</label>
              <input 
                type="text" 
                className="form-control" 
                id="FushaStudimit" 
                name="FushaStudimit" 
                value={formData.FushaStudimit} 
                onChange={handleChange} 
                required 
                placeholder="Shkruani fushën e studimit"
              />
            </div>
            <div className="form-group mb-2">
              <label htmlFor="EmriInstitucionit" className="form-label fw-bold">Institucioni*</label>
              <Select
                options={institucionet}
                value={institucionet.find(option => option.value === formData.Institucioni)}
                onChange={handleSelectChangeI}
                placeholder="Zgjedhni institucionin"
                required
              />
            </div>
            <div className="form-group mb-2">
              <label htmlFor="Lokacioni" className="form-label fw-bold">Lokacioni</label>
              <input 
                type="text" 
                className="form-control" 
                id="Lokacioni" 
                name="Lokacioni" 
                value={formData.Lokacioni} 
                onChange={handleChange} 
                placeholder="Shkruani lokacionin"
              />
            </div>
            <div className="form-group mb-2">
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
            <div className="form-group mb-2">
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
            <div className="form-group mb-2">
              <label htmlFor="EmriNivelit" className="form-label fw-bold">Niveli akademik*</label>
              <Select
                options={niveletAkademike}
                value={niveletAkademike.find(option => option.value === formData.NiveliAkademik)}
                onChange={handleSelectChangeN}
                placeholder="Zgjedhni nivelin akademik"
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="Pershkrimi" className="form-label fw-bold">Përshkrimi</label>
              <input 
                type="text" 
                className="form-control" 
                id="Pershkrimi" 
                name="Pershkrimi" 
                value={formData.Pershkrimi} 
                onChange={handleChange} 
                placeholder="Opsionale"
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Ruaj</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Edukimi;