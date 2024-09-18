import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Home.css";
import { Link } from "react-router-dom";
import ubtCampus from "../photos/ubtCampus.jpeg";
import defaultImage from "../photos/person.png";
import briefcase from "../photos/briefcase.png";
import book from "../photos/book.png";
import translate from "../photos/translate.png";
import honorsandawards from "../photos/honorsandawards.png";
import licenses from "../photos/licenses.png";
import project from "../photos/project.png";
import journal from "../photos/journal.png";
import list from "../photos/list.png";
import lightning from "../photos/lightning.png";
import usertie from "../photos/usertie.png";
import heart from "../photos/heart.png";
import star from "../photos/star.png";

function Home() {
  const [formData, setFormData] = useState({
    emri: "",
    mbiemri: "",
    gjinia: "",
    adresa: "",
    dataELindjes: "",
    NiveliAkademik: "",
    numriTelefonit: "",
    foto: defaultImage,
  });

  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    if (token) {
      fetchData();
    } else {
      alert("Token not found. Please log in again.");
    }
  }, [token]);

  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    return date.toISOString().split("T")[0];
  };

  const fetchData = async () => {
    try {
      const profileResponse = await axios.get(
        "https://localhost:7254/api/UserProfile/get-profile-by-id",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const personData = profileResponse.data;
      setFormData((prevFormData) => ({
        ...prevFormData,
        ...personData,
        dataELindjes: personData.dataELindjes
          ? formatDate(personData.dataELindjes)
          : "",
      }));

      try {
        const photoResponse = await axios.get(
          "https://localhost:7254/api/Images/GetImageByUserId",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const photoUrl = photoResponse.data.url || defaultImage;

        setFormData((prevFormData) => ({
          ...prevFormData,
          foto: photoUrl,
        }));
      } catch (photoError) {
        if (photoError.response && photoError.response.status === 404) {
          console.log("No image found for the user. Using default image.");
          setFormData((prevFormData) => ({
            ...prevFormData,
            foto: defaultImage,
          }));
        } else {
          console.error("Error fetching photo data:", photoError);
          alert("Error fetching photo data. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
      alert("Error fetching profile data. Please try again.");
    }
  };

  return (
    <main>
      <div className="background-image-container">
        <img
          src={ubtCampus}
          alt="Background Image"
          className="background-image"
        />
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-lg-7 pt-2">
            <div className="user-details-container ml-4 pl-4">
              <div className="row align-items-start">
                <div className="col-lg-4 text-center mb-4">
                  <img
                    src={formData.foto}
                    alt="User Image"
                    className="user-photo"
                  />
                </div>
                <div className="col-lg-8 px-0">
                  <div className="d-flex flex-column">
                    <h1 className="fw-bold fst-italic mb-2 ms-5">{`${formData.emri} ${formData.mbiemri}`}</h1>
                    <p className="fw-bold fst-italic mb-2 ms-5">
                      {new Date(formData.dataELindjes).toLocaleDateString()}
                    </p>
                    <p className="fw-bold fst-italic mb-2 ms-5">{`${formData.numriTelefonit}`}</p>
                    <p className="fw-bold fst-italic mb-2 ms-5">{`${formData.adresa}`}</p>
                    <div className="mt-2 ms-5">
                      <Link to="/edit-profile" className="btn btn-primary">
                        Edit Profile
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-4 mb-4">
        <div className="row mt-2">
          {/* Row 1 */}
          <div className="col-md-4 mb-4">
            <div className="box text-center bg-white shadow p-3 d-flex flex-column justify-content-center align-items-center">
              <Link
                to="/personDetails"
                className="d-block text-decoration-none"
              >
                <img
                  src={list}
                  alt="list"
                  style={{ width: "85px", height: "auto" }}
                />
                <div className="box-content mt-3">
                  <h4 className="fst-italic mb-3" style={{ color: "#244082" }}>
                    Detajet e CV
                  </h4>
                </div>
              </Link>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="box text-center bg-white shadow p-3 d-flex flex-column justify-content-center align-items-center">
              <Link to="/aftesite" className="d-block text-decoration-none">
                <img
                  src={lightning}
                  alt="usertie"
                  style={{ width: "85px", height: "auto" }}
                />
                <div className="box-content mt-3">
                  <h4 className="fst-italic mb-3" style={{ color: "#244082" }}>
                    Shto aftësi
                  </h4>
                </div>
              </Link>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="box text-center bg-white shadow p-3 d-flex flex-column justify-content-center align-items-center">
              <Link to="/edukimi" className="d-block text-decoration-none">
                <img
                  src={book}
                  alt="journal"
                  style={{ width: "85px", height: "auto" }}
                />
                <div className="box-content mt-3">
                  <h4 className="fst-italic mb-3" style={{ color: "#244082" }}>
                    Shto edukim
                  </h4>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="row">
          {/* Row 2 */}
          <div className="col-md-4 mb-4">
            <div className="box text-center bg-white shadow p-3 d-flex flex-column justify-content-center align-items-center">
              <Link to="/eksperienca" className="d-block text-decoration-none">
                <img
                  src={briefcase}
                  alt="briefcase"
                  style={{ width: "85px", height: "auto" }}
                />
                <div className="box-content mt-3">
                  <h4 className="fst-italic mb-3" style={{ color: "#244082" }}>
                    Shto eksperiencë
                  </h4>
                </div>
              </Link>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="box text-center bg-white shadow p-3 d-flex flex-column justify-content-center align-items-center">
              <Link to="/gjuhet" className="d-block text-decoration-none">
                <img
                  src={translate}
                  alt="translate"
                  style={{ width: "85px", height: "auto" }}
                />
                <div className="box-content mt-3">
                  <h4 className="fst-italic mb-3" style={{ color: "#244082" }}>
                    Shto gjuhë
                  </h4>
                </div>
              </Link>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="box text-center bg-white shadow p-3 d-flex flex-column justify-content-center align-items-center">
              <Link to="/licensat" className="d-block text-decoration-none">
                <img
                  src={licenses}
                  alt="licenses"
                  style={{ width: "85px", height: "auto" }}
                />
                <div className="box-content mt-3">
                  <h4 className="fst-italic mb-3" style={{ color: "#244082" }}>
                    Shto licensë
                  </h4>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="row">
          {/* Row 3 */}
          <div className="col-md-4 mb-4">
            <div className="box text-center bg-white shadow p-3 d-flex flex-column justify-content-center align-items-center">
              <Link
                to="/mbikqyresitemave"
                className="d-block text-decoration-none"
              >
                <img
                  src={usertie}
                  alt="project"
                  style={{ width: "85px", height: "auto" }}
                />
                <div className="box-content mt-3">
                  <h4 className="fst-italic mb-3" style={{ color: "#244082" }}>
                    Shto mbikqyrës temash
                  </h4>
                </div>
              </Link>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="box text-center bg-white shadow p-3 d-flex flex-column justify-content-center align-items-center">
              <Link
                to="/honorsandawards"
                className="d-block text-decoration-none"
              >
                <img
                  src={honorsandawards}
                  alt="lightning"
                  style={{ width: "85px", height: "auto" }}
                />
                <div className="box-content mt-3">
                  <h4 className="fst-italic mb-3" style={{ color: "#244082" }}>
                    Shto nderim/çmim
                  </h4>
                </div>
              </Link>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="box text-center bg-white shadow p-3 d-flex flex-column justify-content-center align-items-center">
              <Link to="/projekti" className="d-block text-decoration-none">
                <img
                  src={project}
                  alt="honorsandawards"
                  style={{ width: "85px", height: "auto" }}
                />
                <div className="box-content mt-3">
                  <h4 className="fst-italic mb-3" style={{ color: "#244082" }}>
                    Shto projekt
                  </h4>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="row">
          {/* Row 4 - Additional 3 Sections */}
          <div className="col-md-4 mb-4">
            <div className="box text-center bg-white shadow p-3 d-flex flex-column justify-content-center align-items-center">
              <Link to="/publikimi" className="d-block text-decoration-none">
                <img
                  src={journal}
                  alt="network"
                  style={{ width: "85px", height: "auto" }}
                />
                <div className="box-content mt-3">
                  <h4 className="fst-italic mb-3" style={{ color: "#244082" }}>
                    Shto publikim
                  </h4>
                </div>
              </Link>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="box text-center bg-white shadow p-3 d-flex flex-column justify-content-center align-items-center">
              <Link
                to="/punavullnetare"
                className="d-block text-decoration-none"
              >
                <img
                  src={heart}
                  alt="volunteer"
                  style={{ width: "85px", height: "auto" }}
                />
                <div className="box-content mt-3">
                  <h4 className="fst-italic mb-3" style={{ color: "#244082" }}>
                    Shto punë vullnetare
                  </h4>
                </div>
              </Link>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="box text-center bg-white shadow p-3 d-flex flex-column justify-content-center align-items-center">
              <Link
                to="/specializimet"
                className="d-block text-decoration-none"
              >
                <img
                  src={star}
                  alt="settings"
                  style={{ width: "85px", height: "auto" }}
                />
                <div className="box-content mt-3">
                  <h4 className="fst-italic mb-3" style={{ color: "#244082" }}>
                    Shto specializim
                  </h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
