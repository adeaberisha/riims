import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar.jsx";

function Specializimet() {
  const [formData, setFormData] = useState({
    EmriInstitucionit: "",
    llojiIspecializimit: "",
    lokacionit: "",
    dataEFillimit: "",
    dataEMbarimit: "",
    aftesiteEfituara: "",
    pershkrimi: "",
    nrKredive: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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
        EmriInstitucionit: formData.EmriInstitucionit,
        llojiIspecializimit: formData.llojiIspecializimit,
        lokacionit: formData.lokacionit || null,
        dataEFillimit: formData.dataEFillimit,
        dataEMbarimit: formData.dataEMbarimit || null,
        aftesiteEfituara: formData.aftesiteEfituara || null,
        pershkrimi: formData.pershkrimi || null,
        nrKredive: formData.nrKredive || null,
      };

      console.log("Submitting data:", data);

      const response = await axios.post(
        "https://localhost:7254/api/Specializimet/add-specializim",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response:", response.data);

      if (response.status === 201 || response.status === 200) {
        setSuccessMessage("Specializimi u shtua me sukses!");
        setFormData({
          EmriInstitucionit: "",
          llojiIspecializimit: "",
          lokacionit: "",
          dataEFillimit: "",
          dataEMbarimit: "",
          aftesiteEfituara: "",
          pershkrimi: "",
          nrKredive: "",
        });
      } else {
        setErrorMessage("Diçka shkoi keq. Ju lutem provoni përsëri.");
      }
    } catch (error) {
      console.error("Error adding specializim:", error);
      if (error.response) {
        setErrorMessage("Gabim gjatë shtimit të specializimit.");
      } else if (error.request) {
        setErrorMessage(
          "Nuk u mor përgjigje nga serveri. Ju lutem provoni përsëri."
        );
      } else {
        setErrorMessage("Gabim: Nuk mund të përfundohet kërkesa.");
      }
    }
  };

  const handleReset = () => {
    setFormData({
      EmriInstitucionit: "",
      llojiIspecializimit: "",
      lokacionit: "",
      dataEFillimit: "",
      dataEMbarimit: "",
      aftesiteEfituara: "",
      pershkrimi: "",
      nrKredive: "",
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
              Shtoni specializimin tuaj
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
                {/* First Half of the Form */}
                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label
                      htmlFor="EmriInstitucionit"
                      className="form-label fw-bold"
                    >
                      Emri i institucionit*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="EmriInstitucionit"
                      name="EmriInstitucionit"
                      value={formData.EmriInstitucionit}
                      onChange={handleChange}
                      required
                      placeholder="Shkruani institucionin"
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label
                      htmlFor="llojiIspecializimit"
                      className="form-label fw-bold"
                    >
                      Lloji i specializimit*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="llojiIspecializimit"
                      name="llojiIspecializimit"
                      value={formData.llojiIspecializimit}
                      onChange={handleChange}
                      required
                      placeholder="Shkruani llojin"
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label htmlFor="lokacionit" className="form-label fw-bold">
                      Lokacioni
                    </label>
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
                    <label
                      htmlFor="aftesiteEfituara"
                      className="form-label fw-bold"
                    >
                      Aftësitë e fituara
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="aftesiteEfituara"
                      name="aftesiteEfituara"
                      value={formData.aftesiteEfituara}
                      onChange={handleChange}
                      placeholder="Shkruani aftësitë tuaja"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                {/* Second Half of the Form */}
                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label
                      htmlFor="dataEFillimit"
                      className="form-label fw-bold"
                    >
                      Data e fillimit*
                    </label>
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
                    <label
                      htmlFor="dataEMbarimit"
                      className="form-label fw-bold"
                    >
                      Data e mbarimit
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="dataEMbarimit"
                      name="dataEMbarimit"
                      value={formData.dataEMbarimit}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label htmlFor="nrKredive" className="form-label fw-bold">
                      Numri i kredive
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="nrKredive"
                      name="nrKredive"
                      value={formData.nrKredive}
                      onChange={handleChange}
                      placeholder="Shkruani numrin"
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label htmlFor="pershkrimi" className="form-label fw-bold">
                      Përshkrimi
                    </label>
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
              <div className="d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-secondary"
                  style={{ width: "calc(50% - 0.7rem)" }}
                  onClick={handleReset}
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

export default Specializimet;
