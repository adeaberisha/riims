import React, { useState, useCallback } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


async function fetchInstitucioniById(id, token) {
  try {
    const response = await fetch(
      `https://localhost:7254/api/Institucioni/get-Institucionet-by-id/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      const institucioni = await response.json();
      console.log("Fetched Institucioni:", institucioni);
      return institucioni;
    } else {
      const errorMessage = await response.text();
      console.error(
        `Failed to fetch Institucioni with ID ${id}. Status: ${response.status}, Message: ${errorMessage}`
      );
    }
  } catch (error) {
    console.error(`Error fetching Institucioni: ${error}`);
  }
}

async function updateInstitucioniById(id, updatedInstitucioni, token) {
  try {
    const response = await fetch(
      `https://localhost:7254/api/Institucioni/update-Institucionin-by-id/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedInstitucioni),
      }
    );

    if (response.ok) {
      console.log(`Institucioni with ID ${id} updated successfully.`);
      return true; 
    } else {
      const errorMessage = await response.text();
      console.error(
        `Failed to update Institucioni with ID ${id}. Status: ${response.status}, Message: ${errorMessage}`
      );
      return false; 
    }
  } catch (error) {
    console.error(`Error updating Institucioni: ${error}`);
    return false; 
  }
}

export function useEditInstitucioniModal(setInstitucioni, token) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [currentInstitucioni, setCurrentInstitucioni] = useState("");


  const fetchInstitucioni = useCallback(
    async (id) => {
      try {
        const institucioni = await fetchInstitucioniById(id, token);
        if (institucioni) {
          setCurrentInstitucioni(institucioni.emri); 
        }
      } catch (error) {
        console.error("Error fetching Institucioni details:", error);
      }
    },
    [token]
  );

  const openEditModal = useCallback(
    async (id) => {
      setCurrentId(id);
      await fetchInstitucioni(id); 
      setShowEditModal(true); 
    },
    [fetchInstitucioni]
  );

  const handleUpdateInstitucioni = useCallback(async () => {
    if (currentInstitucioni.trim()) {
      try {
        const success = await updateInstitucioniById(
          currentId,
          { emri: currentInstitucioni },
          token
        );
        if (success) {
          setInstitucioni((prevInstitucioni) =>
            prevInstitucioni.map((institucioni) =>
              institucioni.id === currentId
                ? { ...institucioni, emri: currentInstitucioni }
                : institucioni
            )
          );
          setShowEditModal(false); 
        } else {
          console.error("Failed to update Institucioni.");
        }
      } catch (error) {
        console.error("Error updating Institucioni:", error);
      }
    }
  }, [currentInstitucioni, currentId, token, setInstitucioni]);

  const EditInstitucioniModal = () => (
    <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Edito Institucionin</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Institucioni</Form.Label>
            <Form.Control
              type="text"
              value={currentInstitucioni}
              onChange={(e) => setCurrentInstitucioni(e.target.value)}
              placeholder="Shkruani emrin e Institucionit"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowEditModal(false)}>
          Mbyll
        </Button>
        <Button variant="primary" onClick={handleUpdateInstitucioni}>
          Ruaj
        </Button>
      </Modal.Footer>
    </Modal>
  );

  return {
    openEditModal,
    EditInstitucioniModal,
  };
}
