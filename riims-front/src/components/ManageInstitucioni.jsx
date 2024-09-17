import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import axios from "axios";
import AddInstitucioniModal from "./services/InstitucioniAddService"; // Import the AddInstitucioniModal
import EditInstitucioniModal from "./services/InstitucioniEditService"; // Import the EditInstitucioniModal
import "../css/ManageInstitucioni.css"; // Import your custom CSS

const ManageLanguages = () => {
  const [institutions, setInstitutions] = useState([]);
  const [showAddInstitucioniModal, setShowAddInstitucioniModal] = useState(false);
  const [showEditInstitucioniModal, setShowEditInstitucioniModal] = useState(false);
  const [currentInstitution, setCurrentInstitution] = useState(null);
  const token = localStorage.getItem("jwtToken");

  const fetchInstitutions = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://localhost:7254/api/Institucioni/get-all-Institucionet",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Fetched data:", response.data); 
      setInstitutions(response.data);
    } catch (error) {
      console.error("Error fetching institutions:", error);
    }
  }, [token]);

  useEffect(() => {
    fetchInstitutions();
  }, [fetchInstitutions]);

  const handleAddInstitucioni = (newInstitucioni) => {
    setInstitutions((prevInstitutions) => [newInstitucioni, ...prevInstitutions]);
  };

  const handleEditInstitucioni = (updatedInstitucioni) => {
    setInstitutions((prevInstitutions) =>
      prevInstitutions.map((institution) =>
        institution.id === updatedInstitucioni.id ? updatedInstitucioni : institution
      )
    );
  };

  const handleEditClick = (institution) => {
    setCurrentInstitution(institution);
    setShowEditInstitucioniModal(true);
  };


  return (
    <Container fluid className="mt-4">
      <Row>
        <Col md={12}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4>Institucionet</h4>
            <Button
              variant="outline-success"
              onClick={() => setShowAddInstitucioniModal(true)}
            >
              <i className="bi bi-plus-lg"></i> Shto
            </Button>
          </div>
          <Table striped bordered hover className="custom-table">
            <thead>
              <tr>
                <th className="institution-column">Institucioni</th>
                <th className="table-actions">Edit</th>
              </tr>
            </thead>
            <tbody>
              {institutions.length > 0 ? (
                institutions.map((institution) => (
                  <tr key={institution.id}>
                    <td>{institution.emri}</td>
                    <td>
                      <Button
                        variant="primary"
                        className="btn btn-custom btn-sm custom-primary-btn"
                        onClick={() => handleEditClick(institution)}
                      >
                        <i className="bi bi-pencil-fill me-2"></i> Edit
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center">No institutions found</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Modals */}
      <AddInstitucioniModal
        show={showAddInstitucioniModal}
        onClose={() => setShowAddInstitucioniModal(false)}
        onSave={handleAddInstitucioni}
        token={token}
      />

      {currentInstitution && (
        <EditInstitucioniModal
          show={showEditInstitucioniModal}
          onClose={() => setShowEditInstitucioniModal(false)}
          onSave={handleEditInstitucioni}
          token={token}
          institution={currentInstitution}
        />
      )}
    </Container>
  );
};

export default ManageLanguages;
