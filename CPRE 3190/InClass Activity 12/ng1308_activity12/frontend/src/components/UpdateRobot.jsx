/*
  Author: Nakshatra Gupta
  ISU Netid: ng1308@iastate.edu
  Date: November 17th, 2026
  UpdateRobot.jsx - PUT /updateRobot/:id
  Only the fields that are filled in are sent, so you can change just the price.
*/
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const emptyForm = {
  id: "",
  name: "",
  price: "",
  description: "",
  imageUrl: "",
};

const UpdateRobot = () => {
  const [formData, setFormData] = useState(emptyForm);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = `http://127.0.0.1:8080/updateRobot/${formData.id}`;

    // send only the attributes the user filled in
    const { id, ...fields } = formData;
    const body = Object.fromEntries(
      Object.entries(fields).filter(([, value]) => value !== "")
    );
    if (Object.keys(body).length === 0) {
      alert("Fill in at least one attribute to update (e.g. Price).");
      return;
    }

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update Robot ${id}: ${errorText}`);
      }
      const result = await response.json();
      console.log("Success:", result);
      alert(`Robot ${result.id} updated successfully! New price: $${result.price}`);
      setFormData(emptyForm);
    } catch (error) {
      console.error("Error:", error);
      alert(`Error updating Robot: ${error.message}`);
    }
  };

  return (
    <>
      <h1>Update Robot</h1>
      <p className="text-muted">Enter the robot ID and only the attributes you want to change.</p>
      <Form onSubmit={handleSubmit} style={{ maxWidth: 480 }}>
        <Form.Control className="mb-3" type="number" name="id" value={formData.id}
          onChange={handleChange} placeholder="ID of robot to update" required />
        <Form.Control className="mb-3" type="number" step="0.01" name="price" value={formData.price}
          onChange={handleChange} placeholder="New Price" />
        <Form.Control className="mb-3" type="text" name="name" value={formData.name}
          onChange={handleChange} placeholder="New Name (optional)" />
        <Form.Control className="mb-3" type="text" name="description" value={formData.description}
          onChange={handleChange} placeholder="New Description (optional)" />
        <Form.Control className="mb-3" as="textarea" name="imageUrl" value={formData.imageUrl}
          onChange={handleChange} placeholder="New Image URL (optional)" />
        <Button type="submit" variant="warning">Update Robot</Button>
      </Form>
    </>
  );
};

export default UpdateRobot;
