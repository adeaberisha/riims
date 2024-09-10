import React, { useState } from 'react';
import axios from 'axios';

function PunaVullnetare() {
    const [formData, setFormData] = useState({
        roli: '',
        dataFillimit: '',
        dataMbarimit: '',
        pershkrimi: '',
        emriInstitucionit: ''
    });

    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); 

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const token = localStorage.getItem("jwtToken");
    
        if (!token) {
            setMessage('Token not found.');
            setMessageType('danger');
            return;
        }
        
        try {
            const data = {
                Roli: formData.roli,
                DataFillimit: formData.dataFillimit,
                DataMbarimit: formData.dataMbarimit || null,
                Pershkrimi: formData.pershkrimi || null,
                EmriInstitucionit: formData.emriInstitucionit,
            };

            const postResponse = await axios.post(
                `https://localhost:7254/api/PunaVullnetare/add-puna-vullnetare`,
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
        
            if (postResponse.status === 201) {
                setMessage('Puna vullnetare u shtua me sukses!');
                setMessageType('success'); 
                setFormData({
                    roli: '',
                    dataFillimit: '',
                    dataMbarimit: '',
                    pershkrimi: '',
                    emriInstitucionit: ''
                });
            } else {
                setMessage('Diçka shkoi keq. Ju lutemi provoni përsëri.');
                setMessageType('danger');
            }
        
        } catch (error) {
            console.error('Error gjatë shtimit të punës vullnetare:', error);
            setMessage('Error gjatë shtimit të punës vullnetare!');
            setMessageType('danger');
        }
    };
    
    return (
        <div className="container-fluid h-100 bg-light">
            <div className="row justify-content-center align-items-center h-100">
                <div className="col-10 col-md-8 col-lg-6 col-xl-4">
                    <h4 className="text-center text-muted fst-italic my-3">Shtoni punën vullnetare</h4>
                    
                    {message && (
                        <div className={`alert text-center ${messageType === 'success' ? 'alert-success' : 'alert-danger'}`} role="alert">
                            {message}
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit} className="p-3 border rounded shadow-sm bg-white">
                        <div className="form-group mb-2">
                            <label htmlFor="roli" className="form-label fw-bold">Roli*</label>
                            <input
                                type="text"
                                className="form-control"
                                id="roli"
                                name="roli"
                                value={formData.roli}
                                onChange={handleChange}
                                required
                                placeholder="Shkruani rolin tuaj"
                            />
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="dataFillimit" className="form-label fw-bold">Data e fillimit*</label>
                            <input
                                type="date"
                                className="form-control"
                                id="dataFillimit"
                                name="dataFillimit"
                                value={formData.dataFillimit}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="dataMbarimit" className="form-label fw-bold">Data e mbarimit</label>
                            <input
                                type="date"
                                className="form-control"
                                id="dataMbarimit"
                                name="dataMbarimit"
                                value={formData.dataMbarimit}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="pershkrimi" className="form-label fw-bold">Përshkrimi</label>
                            <input
                                type="text"
                                className="form-control"
                                id="pershkrimi"
                                name="pershkrimi"
                                value={formData.pershkrimi}
                                onChange={handleChange}
                                placeholder="Opsionale"
                            />
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="emriInstitucionit" className="form-label fw-bold">Emri i institucionit*</label>
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
                        <button type="submit" className="btn btn-primary w-100">Ruaj</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PunaVullnetare;