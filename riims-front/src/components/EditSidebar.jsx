import React from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../css/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="custom-sidebar px-sm-2 px-0">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
              <li className="nav-item">
              <Link to="/EditAftesia" className="nav-link align-middle px-0" >
                <i className="bi bi-lightning text-white"></i> <span className="ms-1 d-none d-sm-inline text-white fst-italic">Edit Aftësitë</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/EditEdukimi" className="nav-link px-0 align-middle">
                  <i className="bi bi-book-fill text-white"></i> <span className="ms-1 d-none d-sm-inline text-white fst-italic">Edit Edukimi</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/EditEksperienca" className="nav-link px-0 align-middle">
                  <i className="bi bi-briefcase-fill text-white"></i> <span className="ms-1 d-none d-sm-inline text-white fst-italic" onClick={() => console.log('Navigating to /EditEksperienca')}>Edit Eksperiencen</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/EditGjuhet" className="nav-link px-0 align-middle">
                  <i className="bi bi-translate text-white"></i> <span className="ms-1 d-none d-sm-inline text-white fst-italic">Edit Gjuhët</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/EditLicensa" className="nav-link px-0 align-middle">
                  <i className="fa fa-certificate text-white"></i> <span className="ms-1 d-none d-sm-inline text-white fst-italic"onClick={() => console.log('Navigating to /EditLicensa')}>Edit Licensat</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/EditPunavullnetare" className="nav-link px-0 align-middle">
                  <i className="fa fa-hand-holding-heart text-white"></i> <span className="ms-1 d-none d-sm-inline text-white fst-italic">Edit Puna vullnetare</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/EditSpecializim" className="nav-link px-0 align-middle">
                  <i className="bi bi-star-fill text-white"></i> <span className="ms-1 d-none d-sm-inline text-white fst-italic">Edit Specializimet</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/EditMbikqyresitemave" className="nav-link px-0 align-middle">
                  <i className="fas fa-user-tie"></i> <span className="ms-1 d-none d-sm-inline text-white fst-italic">Edit Mbikqyrës i temave</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
