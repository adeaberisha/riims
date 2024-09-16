import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar.jsx";

function PunaVullnetare() {
  const initialFormData = {
    roli: "",
    dataFillimit: "",
    dataMbarimit: "",
    pershkrimi: "",
    emriInstitucionit: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'danger'

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("jwtToken");

    if (!token) {
      setMessage("Token not found.");
      setMessageType("danger");
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
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (postResponse.status === 201) {
        setMessage("Puna vullnetare u shtua me sukses!");
        setMessageType("success");
        setFormData(initialFormData); // Reset form data
      } else {
        setMessage("Diçka shkoi keq. Ju lutemi provoni përsëri.");
        setMessageType("danger");
      }
    } catch (error) {
      console.error("Error gjatë shtimit të punës vullnetare:", error);
      setMessage("Error gjatë shtimit të punës vullnetare!");
      setMessageType("danger");
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 6000); // Clear message after 6 seconds
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="container-fluid h-100 bg-light">
      <div className="row h-100">
        {/* Sidebar */}
        <div className="col-md-2 p-0">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="col-md-10 d-flex justify-content-center py-5" style={{ marginTop: '-1.5rem' }}>
          <div className="col-12 col-md-10 col-lg-8 col-xl-6">
            <h4 className="text-center text-muted fst-italic mb-3">
              Shtoni punën tuaj vullnetare
            </h4>

            {message && (
              <div
                className={`alert text-center mb-3 ${
                  messageType === "success" ? "alert-success" : "alert-danger"
                }`}
                role="alert"
              >
                {message}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="p-4 border rounded shadow-sm bg-white"
            >
              <div className="form-group mb-3">
                <label htmlFor="roli" className="form-label fw-bold">
                  Roli*
                </label>
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
              <div className="form-group mb-3">
                <label htmlFor="dataFillimit" className="form-label fw-bold">
                  Data e fillimit*
                </label>
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
              <div className="form-group mb-3">
                <label htmlFor="dataMbarimit" className="form-label fw-bold">
                  Data e mbarimit
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="dataMbarimit"
                  name="dataMbarimit"
                  value={formData.dataMbarimit}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="pershkrimi" className="form-label fw-bold">
                  Përshkrimi
                </label>
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
              <div className="form-group mb-3">
                <label
                  htmlFor="emriInstitucionit"
                  className="form-label fw-bold"
                >
                  Emri i institucionit*
                </label>
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
              <div className="d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleReset}
                  style={{ width: "calc(50% - 0.5rem)" }}
                >
                  Anulo
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: "calc(50% - 0.5rem)" }}
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

export default PunaVullnetare;
