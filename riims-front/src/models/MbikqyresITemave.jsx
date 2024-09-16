import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import Sidebar from "../components/Sidebar.jsx";

function MbikqyresITemave() {
  const initialFormData = {
    titulliTemes: "",
    studenti: "",
    data: "",
    emriDepartamentit: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [departamentet, setDepartamentet] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchDepartamentet = async () => {
      try {
        const token = localStorage.getItem("jwtToken");

        if (!token) {
          throw new Error("Token not found");
        }

        const response = await axios.get(
          "https://localhost:7254/api/Departamenti/get-all-departamentet",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const options = response.data.map((departamenti) => ({
          value: departamenti.id,
          label: departamenti.emri,
        }));
        setDepartamentet(options);
      } catch (error) {
        console.error(
          "Error gjatë marrjes së departamenteve:",
          error.response ? error.response.data : error.message
        );
        setErrorMessage("Dështoi marrja e departamenteve.");
      }
    };

    fetchDepartamentet();
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
      emriDepartamentit: selectedOption ? selectedOption.label : "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      setErrorMessage("Ju lutem logohuni përsëri.");
      return;
    }

    try {
      const data = {
        titulliTemes: formData.titulliTemes,
        studenti: formData.studenti,
        data: formData.data,
        emriDepartamentit: formData.emriDepartamentit,
      };

      const response = await axios.post(
        "https://localhost:7254/api/MbikqyresITemave/add-mbikqyres",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        setSuccessMessage("Mbikqyrësi u shtua me sukses!");
        setFormData(initialFormData); // Reset form data
      } else {
        setErrorMessage("Diçka shkoi keq. Ju lutem provoni përsëri.");
      }
    } catch (error) {
      console.error("Error gjatë shtimit të mbikqyresit:", error);
      setErrorMessage("Ju lutem provoni përsëri.");
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
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
              Shtoni mbikqyrësin e temave
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
              className="p-4 border rounded shadow bg-white"
              style={{ marginTop: "1rem" }}
            >
              <div className="row">
                <div className="col-md-12 mb-3">
                  <div className="form-group">
                    <label htmlFor="titulliTemes" className="form-label fw-bold">
                      Titulli i temës*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="titulliTemes"
                      name="titulliTemes"
                      value={formData.titulliTemes}
                      onChange={handleChange}
                      required
                      placeholder="Shkruani titullin e temës suaj"
                    />
                  </div>
                </div>
                <div className="col-md-12 mb-3">
                  <div className="form-group">
                    <label htmlFor="studenti" className="form-label fw-bold">
                      Studenti*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="studenti"
                      name="studenti"
                      value={formData.studenti}
                      onChange={handleChange}
                      placeholder="Shkruani studentin"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label htmlFor="data" className="form-label fw-bold">
                      Data*
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="data"
                      name="data"
                      value={formData.data}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label
                      htmlFor="emriDepartamentit"
                      className="form-label fw-bold"
                    >
                      Departamenti*
                    </label>
                    <Select
                      options={departamentet}
                      value={
                        departamentet.find(
                          (option) =>
                            option.label === formData.emriDepartamentit
                        ) || null
                      } // Match by label
                      onChange={handleSelectChange}
                      placeholder="Zgjedhni departamentin"
                      required
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
                    Ruaj
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

export default MbikqyresITemave;
