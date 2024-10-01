import React, { useState, useEffect } from "react";
import Select from "react-select";
import EditSidebar from "../components/EditSidebar.jsx";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const workTypes = [
  { value: "Compressed Workweek", label: "Compressed Workweek" },
  { value: "Freelance/Contract Work", label: "Freelance/Contract Work" },
  { value: "Full-time Work", label: "Full-time Work" },
  { value: "Gig Work", label: "Gig Work" },
  { value: "Hybrid Work", label: "Hybrid Work" },
  { value: "Job Sharing", label: "Job Sharing" },
  { value: "On-site Work", label: "On-site Work" },
  { value: "Part-time Work", label: "Part-time Work" },
  { value: "Remote Work", label: "Remote Work" },
  { value: "Shift Work", label: "Shift Work" },
  { value: "Telecommuting", label: "Telecommuting" },
];

function EditEksperienca() {
  const { id } = useParams(); // Extract the ID from URL parameters
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Titulli: "",
    LlojiPunesimit: "",
    Lokacioni: "",
    LlojiLokacionit: "",
    DataFillimit: "",
    DataMbarimit: "",
    Pershkrimi: "",
    EmriInstitucionit: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchEksperienca = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7254/api/Eksperienca/get-eksperienca-by-id/${id}`
        );
        const formatDate = (isoDate) => {
          if (!isoDate) return "";
          const date = new Date(isoDate);
          return date.toISOString().split("T")[0]; // YYYY-MM-DD
        };
        setFormData({
          Titulli: response.data.titulli,
          LlojiPunesimit: response.data.llojiPunesimit,
          Lokacioni: response.data.lokacioni,
          LlojiLokacionit: response.data.llojiLokacionit,
          DataFillimit: formatDate(response.data.dataFillimit),
          DataMbarimit: formatDate(response.data.dataMbarimit) || "",
          Pershkrimi: response.data.pershkrimi || "",
          EmriInstitucionit: response.data.emriInstitucionit,
        });
      } catch (error) {
        console.error("Error gjatë marrjes së eksperiencës:", error);
        setErrorMessage("Dështoi marrja e eksperiencës.");
      }
    };

    fetchEksperienca();
  }, [id]);

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
      setErrorMessage("Ju lutem logohuni përsëri.");
      return;
    }

    try {
      const data = {
        Titulli: formData.Titulli,
        LlojiPunesimit: formData.LlojiPunesimit,
        Lokacioni: formData.Lokacioni,
        LlojiLokacionit: formData.LlojiLokacionit,
        DataFillimit: formData.DataFillimit,
        DataMbarimit: formData.DataMbarimit || null,
        Pershkrimi: formData.Pershkrimi || null,
        EmriInstitucionit: formData.EmriInstitucionit,
      };

      const response = await axios.put(
        `https://localhost:7254/api/Eksperienca/update-eksperienca-by-id/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setSuccessMessage("Eksperienca u ndryshua me sukses!");
      } else {
        setErrorMessage("Diçka shkoi keq. Ju lutem provoni përsëri.");
      }
    } catch (error) {
      console.error("Gabim gjatë ndryshimit të eksperiencës:", error);
      setErrorMessage("Ju lutem provoni përsëri!");
    }
  };

  const handleSelectChange = (selectedOption) => {
    setFormData({
      ...formData,
      LlojiPunesimit: selectedOption ? selectedOption.label : "",
    });
  };

  const handleReset = () => {
    setFormData({
      Titulli: "",
      LlojiPunesimit: "",
      Lokacioni: "",
      LlojiLokacionit: "",
      DataFillimit: "",
      DataMbarimit: "",
      Pershkrimi: "",
      EmriInstitucionit: "",
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
          <EditSidebar />
        </div>

        {/* Main Content */}
        <div className="col-md-10 d-flex justify-content-center py-5">
          <div className="col-12 col-md-10 col-lg-8 col-xl-6">
            <h4 className="text-center text-muted fst-italic mb-4">
              Ndrysho eksperiencën tuaj profesionale
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
              className="p-3 border rounded shadow bg-white"
              style={{ marginTop: "1rem" }}
            >
              <div className="row">
                <div className="col-md-6 mb-2">
                  <div className="form-group">
                    <label htmlFor="titulli" className="form-label fw-bold">
                      Titulli
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="titulli"
                      name="Titulli"
                      value={formData.Titulli}
                      onChange={handleChange}
                      placeholder="Shkruani titullin e punës"
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-2">
                  <div className="form-group">
                    <label id="llojiPunesimit" className="form-label fw-bold">
                      Lloji i punësimit
                    </label>
                    <Select
                      aria-labelledby="llojiPunesimit-label"
                      options={workTypes}
                      value={
                        workTypes.find(
                          (option) => option.label === formData.LlojiPunesimit
                        ) || null
                      }
                      onChange={handleSelectChange}
                      placeholder="Zgjedhni llojin"
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-2">
                  <div className="form-group">
                    <label
                      htmlFor="emriKompanise"
                      className="form-label fw-bold"
                    >
                      Institucioni
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="emriInstitucionit"
                      name="EmriInstitucionit"
                      value={formData.EmriInstitucionit}
                      onChange={handleChange}
                      placeholder="Shkruani emrin e institucionit"
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-2">
                  <div className="form-group">
                    <label htmlFor="lokacioni" className="form-label fw-bold">
                      Lokacioni
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="Lokacioni"
                      name="Lokacioni"
                      value={formData.Lokacioni}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-2">
                  <div className="form-group">
                    <label
                      htmlFor="llojiLokacionit"
                      className="form-label fw-bold"
                    >
                      Lloji i lokacionit
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lokacioni"
                      name="Lokacioni"
                      value={formData.Lokacioni}
                      onChange={handleChange}
                      placeholder="Shkruani lokacionin"
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-2">
                  <div className="form-group">
                    <label
                      htmlFor="dataFillimit"
                      className="form-label fw-bold"
                    >
                      Data e fillimit
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="dataFillimit"
                      name="DataFillimit"
                      value={formData.DataFillimit}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-2">
                  <div className="form-group">
                    <label
                      htmlFor="dataMbarimit"
                      className="form-label fw-bold"
                    >
                      Data e mbarimit
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="dataMbarimit"
                      name="DataMbarimit"
                      value={formData.DataMbarimit}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="form-group">
                    <label htmlFor="pershkrimi" className="form-label fw-bold">
                      Përshkrimi
                    </label>
                    <textarea
                      className="form-control"
                      id="pershkrimi"
                      name="Pershkrimi"
                      value={formData.Pershkrimi}
                      onChange={handleChange}
                      placeholder="Përshkruani përvojën tuaj"
                      rows="1"
                    />
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-between mb-2">
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

export default EditEksperienca;
