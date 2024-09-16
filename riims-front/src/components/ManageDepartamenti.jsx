import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import axios from "axios";
import { useManageDepartamenti } from "./services/DepartamentiAddDeleteService.jsx";
import { useEditDepartamentiModal } from "./services/DepartamentiEditService.jsx";
import "../css/ManageDepartamenti.css";

const ManageDepartamenti = () => {
  const [departments, setDepartments] = useState([]);
  const [institutions, setInstitutions] = useState({}); // Map për të ruajtur të dhënat e institucioneve me ID-në si kyç
  const token = localStorage.getItem("jwtToken");

  // Departamenti hooks
  const {
    confirmDelete: confirmDeleteDepartment,
    AddDepartamentiModal,
    DeleteConfirmationModal: DeleteDepartmentConfirmationModal,
    setShowAddDepartamentiModal,
  } = useManageDepartamenti(setDepartments, token);

  const { openEditModal: openEditDepartmentModal, EditDepartamentiModal } =
    useEditDepartamentiModal(setDepartments, token);

  // Fetch Departamenti dhe Institucioni
  const fetchDepartmentsAndInstitutions = useCallback(async () => {
    try {
        // Fetch departments
        const departmentResponse = await axios.get(
            "https://localhost:7254/api/Departamenti/get-all-departamentet",
            { headers: { Authorization: `Bearer ${token}` } }
        );
        const departmentData = departmentResponse.data;
        console.log("Fetched departments:", departmentData);
        setDepartments(departmentData);

        // Fetch all institutions
        const institutionResponse = await axios.get(
            "https://localhost:7254/api/Institucioni/get-all-Institucionet",
            { headers: { Authorization: `Bearer ${token}` } }
        );
        const institutionData = institutionResponse.data;
        console.log("Fetched institution data:", institutionData);

        // Map institution data by ID
        const institutionMap = institutionData.reduce((acc, institution) => {
            acc[institution.id] = institution;
            return acc;
        }, {});

        setInstitutions(institutionMap);
    } catch (error) {
        console.error("Error fetching departments or institutions:", error);
    }
}, [token]);



  useEffect(() => {
    console.log("Fetching departments and institutions");
    fetchDepartmentsAndInstitutions();
  }, [fetchDepartmentsAndInstitutions]);

  useEffect(() => {
    console.log('Institutions data:', institutions);
  }, [institutions]);

  return (
    <Container fluid className="mt-4">
      <Row>
        <Col md={12}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4>Departamentet</h4>
            <Button
              variant="outline-success"
              onClick={() => setShowAddDepartamentiModal(true)}
            >
              <i className="bi bi-plus-lg"></i> Shto
            </Button>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className="department-column">Departamenti</th>
                <th className="institution-column">Institucioni</th>
                <th className="table-actions">Edit</th>
                <th className="table-actions">Delete</th>
              </tr>
            </thead>
            <tbody>
                {departments.length > 0 ? (
                    departments.map((department) => (
                      <tr key={department.id}>
                        <td>{department.emri}</td>
                        <td>
                        {department.emriInstitucionit}
                        </td>
                        <td>
                          <Button
                            variant="primary"
                            className="btn btn-custom btn-sm custom-primary-btn"
                            onClick={() => openEditDepartmentModal(department.id)}
                          >
                            <i className="bi bi-pencil-fill me-2"></i> Edit
                          </Button>
                        </td>
                        <td>
                          <Button
                            variant="danger"
                            className="btn btn-custom btn-sm custom-danger-btn"
                            onClick={() => confirmDeleteDepartment(department.id)}
                          >
                            <i className="bi bi-trash-fill me-2"></i> Delete
                          </Button>
                        </td>
                      </tr>
                    ))
                ) : (
                    <tr>
                      <td colSpan="4">No departments found</td>
                    </tr>
                )}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Modalet */}
      <AddDepartamentiModal />
      <DeleteDepartmentConfirmationModal />
      <EditDepartamentiModal />
    </Container>
  );
};

export default ManageDepartamenti;