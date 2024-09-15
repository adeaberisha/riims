import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import axios from "axios";
import { useManageInstitucioni } from "./services/InstitucioniDeleteService.jsx"; // Import the hook
import { useEditInstitucioniModal } from "./services/InstitucioniEditService.jsx"; // Import the useEditInstitucioniModal hook
import "../css/ManageInstitucioni.css"; // Import your custom CSS

const ManageLanguages = () => {
  const [institutions, setInstitutions] = useState([]);
  const token = localStorage.getItem("jwtToken");

  // Institucioni hooks
  const {
    confirmDelete: confirmDeleteInstitution,
    AddInstitucioniModal,
    DeleteConfirmationModal: DeleteInstitutionConfirmationModal,
    setShowAddInstitucioniModal,
  } = useManageInstitucioni(setInstitutions, token);

  const { openEditModal: openEditInstitutionModal, EditInstitucioniModal } =
    useEditInstitucioniModal(setInstitutions, token);

  const fetchInstitutions = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://localhost:7254/api/Institucioni/get-all-Institucionet",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Fetched data:", response.data); // Log the fetched data
      setInstitutions(response.data);
    } catch (error) {
      console.error("Error fetching institutions:", error);
    }
  }, [token]);

  useEffect(() => {
    console.log("Fetching institutions");
    fetchInstitutions();
  }, [fetchInstitutions]);

  // After setting institutions
  useEffect(() => {
    console.log("Institutions updated:", institutions);
  }, [institutions]);

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
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className="institution-column">Institucioni</th>
                <th className="table-actions">Edit</th>
                <th className="table-actions">Delete</th>
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
                        onClick={() => openEditInstitutionModal(institution.id)}
                      >
                        <i className="bi bi-pencil-fill me-2"></i> Edit
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        className="btn btn-custom btn-sm custom-danger-btn"
                        onClick={() => confirmDeleteInstitution(institution.id)}
                      >
                        <i className="bi bi-trash-fill me-2"></i> Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No institutions found</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Modals */}
      <AddInstitucioniModal />
      <DeleteInstitutionConfirmationModal />
      <EditInstitucioniModal />
    </Container>
  );
};

export default ManageLanguages;
