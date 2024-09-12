import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar.jsx"; // Import Sidebar component

function HonorsAndAwards() {
  const [formData, setFormData] = useState({
    titulli: "",
    issuer: "",
    EmriInstitucionit: "",
    dataLeshimit: "",
    pershkrimi: "",
  });

  const [institucionet, setInstitucionet] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchInstitucionet = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7254/api/Institucioni/get-all-Institucionet"
        );
        const options = response.data.map((institucion) => ({
          value: institucion.id,
          label: institucion.emri,
        }));
        setInstitucionet(options);
      } catch (error) {
        console.error("Error fetching institutions:", error);
        setErrorMessage("Failed to fetch institutions.");
      }
    };
    fetchInstitucionet();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (selectedOption) => {
    setFormData({
      ...formData,
      EmriInstitucionit: selectedOption ? selectedOption.label : "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      setErrorMessage("Token not found. Please log in again.");
      return;
    }

    try {
      const data = {
        titulli: formData.titulli,
        issuer: formData.issuer,
        EmriInstitucionit: formData.EmriInstitucionit,
        dataLeshimit: formData.dataLeshimit,
        pershkrimi: formData.pershkrimi,
      };

      const response = await axios.post(
        "https://localhost:7254/api/HonorsAndAwards/add-honor",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        setSuccessMessage("Nderimi/çmimi u shtua me sukses!");
        setFormData({
          titulli: "",
          issuer: "",
          EmriInstitucionit: "",
          dataLeshimit: "",
          pershkrimi: "",
        });
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error adding honor:", error);
      if (error.response) {
        setErrorMessage(`Error: ${error.response.data}`);
      } else if (error.request) {
        setErrorMessage("No response from the server. Please try again.");
      } else {
        setErrorMessage("Error: Could not complete the request.");
      }
    }
  };

  const handleReset = () => {
    setFormData({
      titulli: "",
      issuer: "",
      EmriInstitucionit: "",
      dataLeshimit: "",
      pershkrimi: "",
    });
  };

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(""), 6000);
      return () => clearTimeout(timer);
    }
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 6000);
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
        <div className="col-md-10 d-flex justify-content-center align-items-center py-5">
          <div className="col-12 col-md-10 col-lg-8 col-xl-6">
            <h4 className="text-center text-muted fst-italic mb-4">
              Shtoni Nderimet dhe Çmimet tuaja
            </h4>

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

            <form
              onSubmit={handleSubmit}
              className="p-4 border rounded shadow-lg bg-white"
            >
              <div className="row">
                {/* First Row: Titulli and Lëshuesi */}
                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label htmlFor="titulli" className="form-label fw-bold">
                      Titulli*
                    </label>
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
                    <label htmlFor="issuer" className="form-label fw-bold">
                      Lëshuesi*
                    </label>
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
              </div>

              <div className="row">
                {/* Second Row: Institucioni and Data e Lëshimit */}
                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label
                      htmlFor="EmriInstitucionit"
                      className="form-label fw-bold"
                    >
                      Institucioni*
                    </label>
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
                    <label
                      htmlFor="dataLeshimit"
                      className="form-label fw-bold"
                    >
                      Data e lëshimit*
                    </label>
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
              </div>

              <div className="row">
                {/* Third Row: Përshkrimi */}
                <div className="col-md-12 mb-3">
                  <div className="form-group">
                    <label htmlFor="pershkrimi" className="form-label fw-bold">
                      Përshkrimi*
                    </label>
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

              <div className="d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleReset}
                  style={{ width: "calc(50% - 0.7rem)" }}
                >
                  Anulo
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: "calc(50% - 0.7rem)" }}
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

export default HonorsAndAwards;
