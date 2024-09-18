import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import axios from "axios";
import AddNiveliAkademikModal from "./services/AddNiveliAkademikModal";
import EditNiveliAkademikModal from "./services/EditNiveliAkademikModal";
import "../css/ManageNiveliAkademik.css";

const ManageNiveliAkademik = () => {
  const [academicLevels, setAcademicLevels] = useState([]);
  const [showAddNiveliModal, setShowAddNiveliModal] = useState(false);
  const [showEditNiveliModal, setShowEditNiveliModal] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(null);
  const token = localStorage.getItem("jwtToken");

  const fetchAcademicLevels = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://localhost:7254/api/NiveliAkademik/get-all-NiveletAkademike",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Fetched data:", response.data);
      setAcademicLevels(response.data);
    } catch (error) {
      console.error("Error fetching academic levels:", error);
    }
  }, [token]);

  useEffect(() => {
    fetchAcademicLevels();
  }, [fetchAcademicLevels]);

  const handleAddNiveli = (newNiveli) => {
    setAcademicLevels((prevLevels) => [newNiveli, ...prevLevels]);
  };

  const handleEditNiveli = (updatedNiveli) => {
    setAcademicLevels((prevLevels) =>
      prevLevels.map((level) =>
        level.id === updatedNiveli.id ? updatedNiveli : level
      )
    );
  };

  const handleEditClick = (level) => {
    setCurrentLevel(level);
    setShowEditNiveliModal(true);
  };

  return (
    <Container fluid className="mt-4">
      <Row>
        <Col md={12}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4>Niveli Akademik</h4>
            <Button
              variant="outline-success"
              onClick={() => setShowAddNiveliModal(true)}
            >
              <i className="bi bi-plus-lg"></i> Shto
            </Button>
          </div>
          <Table striped bordered hover className="custom-table">
            <thead>
              <tr>
                <th className="language-column">Niveli</th>
                <th className="table-actions">Edit</th>
              </tr>
            </thead>
            <tbody>
              {academicLevels.length > 0 ? (
                academicLevels.map((level) => (
                  <tr key={level.id}>
                    <td>{level.lvl}</td>
                    <td>
                      <Button
                        variant="primary"
                        className="btn btn-custom btn-sm custom-primary-btn"
                        onClick={() => handleEditClick(level)}
                      >
                        <i className="bi bi-pencil-fill me-2"></i> Edit
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center">
                    No Data Available
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Add Niveli Akademik Modal */}
      <AddNiveliAkademikModal
        show={showAddNiveliModal}
        onClose={() => setShowAddNiveliModal(false)}
        onSave={handleAddNiveli}
        token={token}
      />

      {/* Edit Niveli Akademik Modal */}
      {currentLevel && (
        <EditNiveliAkademikModal
          show={showEditNiveliModal}
          onClose={() => setShowEditNiveliModal(false)}
          onSave={handleEditNiveli}
          token={token}
          level={currentLevel}
        />
      )}
    </Container>
  );
};

export default ManageNiveliAkademik;
