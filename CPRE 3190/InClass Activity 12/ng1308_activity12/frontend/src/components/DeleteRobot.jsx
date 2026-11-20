/*
  Author: Nakshatra Gupta
  ISU Netid: ng1308@iastate.edu
  Date: November 17th, 2026
  DeleteRobot.jsx - DELETE /deleteRobot/:id
*/
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

function DeleteRobot() {
  const [robotId, setRobotId] = useState("");

  const handleChange = (event) => {
    setRobotId(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = `http://127.0.0.1:8080/deleteRobot/${robotId}`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete Robot: ${errorText}`);
      }
      const result = await response.json();
      console.log("Success:", result);
      alert(`Robot deleted successfully! (${result.name})`);
      setRobotId("");
    } catch (error) {
      console.error("Error:", error);
      alert(`Error deleting Robot: ${error.message}`);
    }
  };

  return (
    <>
      <h1>Delete Robot</h1>
      <Form onSubmit={handleSubmit} style={{ maxWidth: 480 }}>
        <Form.Control className="mb-3" type="number" value={robotId}
          onChange={handleChange} placeholder="Enter Robot ID" required />
        <Button type="submit" variant="danger">Delete Robot</Button>
      </Form>
    </>
  );
}

export default DeleteRobot;
