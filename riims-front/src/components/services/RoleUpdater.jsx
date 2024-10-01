import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

const RoleUpdater = ({ userId, token, onRoleUpdated }) => {
  const [newRole, setNewRole] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const updateRole = async () => {
    if (!newRole) {
      setStatusMessage("Ju lutem zgjidhni një rol.");
      return;
    }
  
    try {
      const response = await axios.post(
        "https://localhost:7254/api/Auth/UpdateUserRole",
        { userId, newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      if (response.status === 200) {
        setStatusMessage(`Roli u përditësua me sukses në ${newRole}`);
        if (onRoleUpdated) {
          onRoleUpdated();
        }
      } else {
        setStatusMessage("Dështoi të përditësohet roli");
      }
    } catch (error) {
      console.error("Gabim gjatë përditësimit të rolit:", error);
      setStatusMessage("Dështoi të përditësohet roli");
    }
  };
  

  return (
    <Form>
      <Form.Group controlId="formRoleSelect">
        <Form.Control
          as="select"
          className="mb-2 mr-2"
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
        >
          <option value="">Select Role</option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
        </Form.Control>
      </Form.Group>
      <Button variant="primary" onClick={updateRole} size="sm">
        Update Role
      </Button>
      {statusMessage && (
        <div className={`mt-2 text-${statusMessage.includes("sukses") ? "success" : "danger"}`}>
          {statusMessage}
        </div>
      )}
    </Form>
  );
};

export default RoleUpdater;
