import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar.jsx";

function Licensat() {
  const [formData, setFormData] = useState({
    Emri: "",
    EmriInstitucionit: "",
    DataLeshimit: "",
    DataSkadimit: "",
    CredentialId: "",
    CredentialUrl: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
        Emri: formData.Emri,
        EmriInstitucionit: formData.EmriInstitucionit,
        DataLeshimit: formData.DataLeshimit,
        DataSkadimit: formData.DataSkadimit || null,
        CredentialId: formData.CredentialId || null,
        CredentialUrl: formData.CredentialUrl || null,
      };

      const response = await axios.post(
        "https://localhost:7254/api/Licensat/add-licensa",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        setSuccessMessage("Licensa u shtua me sukses!");
        setFormData({
          Emri: "",
          EmriInstitucionit: "",
          DataLeshimit: "",
          DataSkadimit: "",
          CredentialId: "",
          CredentialUrl: "",
        });
      } else {
        setErrorMessage("Diçka shkoi keq. Ju lutem provoni përsëri.");
      }
    } catch (error) {
      console.error("Error gjatë shtimit të licensës:", error);
      if (error.response) {
        setErrorMessage(`Error: ${error.response.data}`);
      } else if (error.request) {
        setErrorMessage("Ju lutem provoni përsëri.");
      } else {
        setErrorMessage("Ju lutem provoni përsëri.");
      }
    }
  };

  const handleReset = () => {
    setFormData({
      Emri: "",
      EmriInstitucionit: "",
      DataLeshimit: "",
      DataSkadimit: "",
      CredentialId: "",
      CredentialUrl: "",
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
        <div className="col-md-10 d-flex justify-content-center py-5">
          <div className="col-12 col-md-10 col-lg-8 col-xl-6">
            <h4 className="text-center text-muted fst-italic mb-4">
              Shtoni licensën tuaj
            </h4>

            {errorMessage && (
              <div className="alert alert-danger text-center mb-3" role="alert">
                {errorMessage}
              </div>
            )}

            {successMessage && (
              <div
                className="alert alert-success text-center mb-3"
                role="alert"
              >
                {successMessage}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="p-4 border rounded shadow bg-white"
            >
              <div className="row">
                <div className="col-md-12 mb-3">
                  <div className="form-group">
                    <label htmlFor="Emri" className="form-label fw-bold">
                      Emri*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="Emri"
                      name="Emri"
                      value={formData.Emri}
                      onChange={handleChange}
                      placeholder="Shkruani emrin"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-12 mb-3">
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
                      placeholder="Shkruani emrin e institucionit"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label
                      htmlFor="DataLeshimit"
                      className="form-label fw-bold"
                    >
                      Data e Lëshimit*
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="DataLeshimit"
                      name="DataLeshimit"
                      value={formData.DataLeshimit}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label
                      htmlFor="DataSkadimit"
                      className="form-label fw-bold"
                    >
                      Data e Skadimit
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="DataSkadimit"
                      name="DataSkadimit"
                      value={formData.DataSkadimit}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label
                      htmlFor="CredentialId"
                      className="form-label fw-bold"
                    >
                      Credential ID
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="CredentialId"
                      name="CredentialId"
                      value={formData.CredentialId}
                      onChange={handleChange}
                      placeholder="Shkruani Credential ID"
                    />
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label
                      htmlFor="CredentialUrl"
                      className="form-label fw-bold"
                    >
                      Credential URL
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="CredentialUrl"
                      name="CredentialUrl"
                      value={formData.CredentialUrl}
                      onChange={handleChange}
                      placeholder="Shkruani Credential URL"
                    />
                  </div>
                </div>

                <div className="col-md-12 d-flex justify-content-between">
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
                    Shto
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Licensat;
